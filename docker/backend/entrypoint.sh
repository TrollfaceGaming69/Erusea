#!/bin/sh
set -e
cd /var/www/html

log() { echo "[entrypoint] $*"; }

if [ ! -f artisan ]; then
  log "ERROR: no Laravel application found in ./backend (artisan is missing)."
  log "Scaffold it first:"
  log "  docker compose run --rm --no-deps --entrypoint sh backend \\"
  log "    -c 'composer create-project laravel/laravel /tmp/l --no-interaction && cp -R /tmp/l/. /var/www/html/'"
  exit 1
fi

# ---------------------------------------------------------------------------
# 1. Composer dependencies
#    Check for vendor/autoload.php rather than the vendor/ directory: the
#    directory can exist but be empty (e.g. when it is a fresh named volume).
# ---------------------------------------------------------------------------
if [ ! -f vendor/autoload.php ]; then
  log "Installing composer dependencies..."
  composer install --no-interaction --prefer-dist
fi

# ---------------------------------------------------------------------------
# 2. .env bootstrap
# ---------------------------------------------------------------------------
if [ ! -f .env ]; then
  log "Creating .env from .env.example"
  cp .env.example .env
fi

# ---------------------------------------------------------------------------
# 3. Push container environment into .env
#
#    `php artisan serve` only forwards an allow-list of environment variables
#    to the PHP dev-server child process (see Laravel's ServeCommand
#    $passthroughVariables). DB_*, SESSION_*, CACHE_* and friends are NOT on
#    that list, so values supplied only via docker-compose `environment:` are
#    invisible to HTTP requests even though `php artisan migrate` sees them.
#    That mismatch makes migrations run on MySQL while web requests fall back
#    to the .env default (sqlite) and blow up. Writing the values into .env
#    keeps the CLI and the HTTP worker in agreement.
# ---------------------------------------------------------------------------
set_env() {
  key="$1"
  val="$2"
  # Escape characters that are special in a sed replacement.
  esc=$(printf '%s' "$val" | sed -e 's/[\\&|]/\\&/g')
  if grep -qE "^[#[:space:]]*${key}=" .env; then
    sed -i "s|^[#[:space:]]*${key}=.*|${key}=${esc}|" .env
  else
    printf '%s=%s\n' "$key" "$val" >> .env
  fi
}

log "Syncing container environment into .env"
for key in APP_ENV APP_DEBUG APP_URL \
           DB_CONNECTION DB_HOST DB_PORT DB_DATABASE DB_USERNAME DB_PASSWORD \
           SESSION_DRIVER CACHE_STORE QUEUE_CONNECTION; do
  eval "val=\${$key-}"
  [ -n "$val" ] && set_env "$key" "$val"
done

# ---------------------------------------------------------------------------
# 4. Application key
# ---------------------------------------------------------------------------
if ! grep -qE '^APP_KEY=base64:.+' .env; then
  log "Generating application key"
  php artisan key:generate --force
fi

# Drop any stale cached config/views so the synced .env actually takes effect.
php artisan config:clear >/dev/null 2>&1 || true
php artisan view:clear   >/dev/null 2>&1 || true

# ---------------------------------------------------------------------------
# 5. Wait for the database
# ---------------------------------------------------------------------------
if [ "${DB_CONNECTION:-}" = "mysql" ] || [ "${DB_CONNECTION:-}" = "mariadb" ]; then
  log "Waiting for database at ${DB_HOST:-db}:${DB_PORT:-3306}..."
  i=0
  until php -r 'exit(@fsockopen(getenv("DB_HOST") ?: "db", (int) (getenv("DB_PORT") ?: 3306), $e, $s, 3) ? 0 : 1);' 2>/dev/null; do
    i=$((i + 1))
    if [ "$i" -ge 60 ]; then
      log "ERROR: database never became reachable."
      exit 1
    fi
    sleep 2
  done
  log "Database is reachable."
fi

# ---------------------------------------------------------------------------
# 6. Migrations + storage symlink
# ---------------------------------------------------------------------------
php artisan migrate --force

# storage:link reports an error (on stdout) when the link is already there,
# which is the normal case on a persistent bind mount.
if [ ! -e public/storage ] && [ ! -L public/storage ]; then
  php artisan storage:link || true
fi

log "Starting: $*"
exec "$@"
