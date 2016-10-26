<?php
Route::get('/', function(){
    return view('home');
});

Route::group(['prefix' => 'api'], function () {

    Route::post('auth/signup', 'Auth\AuthController@register');
    Route::post('auth/signin', 'Auth\AuthController@authenticate');
    Route::post('auth/signout', 'Auth\AuthController@logout');
    Route::get('auth/refresh-token','Auth\AuthController@refreshToken');

    Route::post('auth/recover-password', 'Auth\PasswordController@recovery');
    Route::post('auth/reset-password/{token}', 'Auth\PasswordController@reset');

    Route::get('users', 'UsersController@index');
    Route::post('profile', 'UsersController@updateProfile');
    Route::post('profile/avatar', 'UsersController@updateAvatar');

    Route::get('users/token/{identity}','UsersController@token');
});