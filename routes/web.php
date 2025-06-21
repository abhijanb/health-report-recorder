<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HealthReportController;
use App\Http\Controllers\ViewPdfController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

Route::middleware(['auth', 'verified','throttle:60,1'])->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
    // web.php or routes file
Route::get('/health-record/file/{any}',[HealthReportController::class,'showImg'])->where('any','.*')->name('showImg');


    Route::get('/viewPdf/{any}',[ViewPdfController::class,'viewPdf'])->where('any',  '.*');
    Route::get('/test',function(){
        return Inertia::render('a');
    });
    Route::get('/image/{filename}',[HealthReportController::class,'showImage']);

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
require __DIR__.'/healthRecord.php';
require __DIR__.'/reminder.php';
require __DIR__.'/medicine.php';
require __DIR__.'/relation.php';
require __DIR__.'/friend.php';
require __DIR__.'/search.php';