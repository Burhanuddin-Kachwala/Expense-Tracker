<?php

use App\Http\Controllers\API\CategoryController;
use App\Http\Controllers\API\ExpenseController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
Route::apiResource('categories', CategoryController::class);
Route::apiResource('expenses', ExpenseController::class);