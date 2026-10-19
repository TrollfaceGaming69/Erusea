FROM php:8.3-cli

COPY --from=ghcr.io/mlocati/php-extension-installer /usr/bin/install-php-extensions /usr/local/bin/
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

RUN apt-get update \
    && apt-get install -y --no-install-recommends git unzip curl \
    && rm -rf /var/lib/apt/lists/* \
    && install-php-extensions pdo_mysql mbstring zip bcmath gd exif pcntl intl opcache

ARG HOST_UID=1000
ARG HOST_GID=1000
RUN groupadd -g ${HOST_GID} app && useradd -u ${HOST_UID} -g ${HOST_GID} -m app

COPY php.ini /usr/local/etc/php/conf.d/zz-app.ini

COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN sed -i 's/\r$//' /usr/local/bin/entrypoint.sh && chmod +x /usr/local/bin/entrypoint.sh

WORKDIR /var/www/html
USER app

EXPOSE 8000
ENTRYPOINT ["entrypoint.sh"]
# --no-reload is required for PHP_CLI_SERVER_WORKERS to take effect; without it
# Laravel falls back to a single-threaded server. The entrypoint finalises .env
# before the server starts, so the .env file watcher is not needed here.
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000", "--no-reload"]