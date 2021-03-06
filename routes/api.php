<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::get('/user', function() {
    return Auth::user();
})->name('user');

Route::post('/register', 'Auth\RegisterController@register')->name('register');
Route::post('/login', 'Auth\LoginController@login')->name('login');
Route::post('/logout', 'Auth\LoginController@logout')->name('logout');
Route::get('/todo', 'TodoController@index');
Route::post('/todo', 'TodoController@store');
Route::post('/todo/complete', 'TodoController@complete');
Route::post('/todo/incomplete', 'TodoController@incomplete');
Route::post('/todo/delete', 'TodoController@delete');
