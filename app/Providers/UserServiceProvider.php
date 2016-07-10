<?php

namespace telecare\Providers;

use Illuminate\Support\ServiceProvider;

class UserServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(
            "telecare\\Interfaces\\UserRepositoryInterface",
            "telecare\\Repositories\\UserRepository"
        );
    }
}
