<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ViewPdfController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'verified','throttle:60,1'])->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/viewPdf/{any}',[ViewPdfController::class,'viewPdf'])->where('any',  '.*');
    Route::get('/test',function(){
        return Inertia::render("test");
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
require __DIR__.'/healthRecord.php';
require __DIR__.'/reminder.php';
require __DIR__.'/medicine.php';
require __DIR__.'/relation.php';
require __DIR__.'/friend.php';