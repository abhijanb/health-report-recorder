<?php

use App\Http\Controllers\HealthRemindersController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth','verified'])->group(function () {

    Route::get('/reminder', [HealthRemindersController::class, 'index'])->name('reminder.index');
    Route::get('/reminder/create', [HealthRemindersController::class, 'create'])->name('reminder.create');
    Route::get('/reminder/{reminder}/edit', [HealthRemindersController::class, 'create'])->name('reminder.edit');
    Route::post('/reminder', [HealthRemindersController::class, 'store'])->name('reminder.store');
    Route::get('/reminder/{reminder}', [HealthRemindersController::class, 'show'])->name('reminder.show');
    Route::delete('/reminder/{reminder}', [HealthRemindersController::class,'destroy'])->name('reminder.destroy');
});