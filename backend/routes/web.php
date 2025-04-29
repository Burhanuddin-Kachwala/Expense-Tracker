<?php

use App\Models\Expense;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    //Expense::all();
    return Expense::all();;
});
