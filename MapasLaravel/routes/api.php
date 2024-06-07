<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ImagenController;
use App\Http\Controllers\MapaController;



/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
/*
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
*/
Route::get('/mapas', [MapaController::class,'index'] );
Route::apiResource('/mapas', MapaController::class);

Route::post('/register',[AuthController::class,'register']);
Route::post('/login',[AuthController::class,'login']); 
Route::apiResource('/images', ImagenController::class);

Route::middleware(['auth:sanctum'])->group(function(){

    Route::get('/logout',[AuthController::class,'logout']);
   // Route::apiResource('/images', ImagenController::class);

});