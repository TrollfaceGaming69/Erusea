<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| This backend acts as a JSON API for the React SPA in ../frontend, which is
| served by its own Vite dev server. The stock `welcome` view is not used
| because it renders @vite(...) directives that require a compiled Vite
| manifest inside this container -- and the backend image has no Node
| toolchain. Returning JSON keeps the service self-contained and gives the
| Docker healthcheck something cheap and meaningful to poll.
|
*/

$status = function () {
    try {
        $connection = DB::connection();
        $connection->getPdo();

        $database = [
            'connected' => true,
            'driver' => $connection->getDriverName(),
            'name' => $connection->getDatabaseName(),
        ];
    } catch (\Throwable $e) {
        $database = [
            'connected' => false,
            'error' => $e->getMessage(),
        ];
    }

    return response()->json([
        'status' => $database['connected'] ? 'ok' : 'degraded',
        'app' => config('app.name'),
        'environment' => app()->environment(),
        'laravel' => app()->version(),
        'php' => PHP_VERSION,
        'database' => $database,
    ], $database['connected'] ? 200 : 503);
};

Route::get('/', $status);
Route::get('/api/health', $status);
