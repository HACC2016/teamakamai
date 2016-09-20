<?php
Route::get('/', function(){
    return view('home');
});

Route::group(['prefix' => 'api'], function () {

    Route::post('auth/signup', 'Auth\AuthController@register');
    Route::post('auth/signin', 'Auth\AuthController@authenticate');
    Route::post('auth/signout', 'Auth\AuthController@logout');

    Route::post('auth/recover-password', 'Auth\PasswordController@recovery');
    Route::post('auth/reset-password/{token}', 'Auth\PasswordController@reset');

    Route::get('users', 'UsersController@index');

    Route::get('users/token/{identity}','UsersController@token');
});