<?php

namespace App\Providers;
use Flat3\Lodata\Facades\Lodata;
use Flat3\Lodata\Model;
use Illuminate\Support\ServiceProvider;
use App\Models\User;
class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
       Lodata::discover(User::class);
    }
}
