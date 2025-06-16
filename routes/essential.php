<?php

use App\Http\Controllers\QuickAddController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth','throttle:60,1')->group(function(){
    Route::get('/make-quick-add-form',[QuickAddController::class,'create'])->name('make-quick-add-form');
Route::post('/quick-add',[QuickAddController::class,'store'])->name('quick-add');
});