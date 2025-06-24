<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HealthReportController;
use App\Http\Controllers\ViewPdfController;
use App\Models\HealthRecord;
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
Route::get('/predict-diabetes', function () {
    return Inertia::render('PredictDiabetes');
});
Route::get('/predict',function(){
    // search for the followind colm in table health_records and return that to frontend and if now found then return that ley with emty value
    //  gender: record.gender,
        // age: record.age,
        // hypertension: record.hypertension,
        // heart_disease: record.heart_disease,
        // smoking_history: record.smoking_history,
        // bmi: record.bmi,
        // hba1c: record.hba1c,
        // glucose: record.glucose
        $age = auth()->user()->age;
        $gender = auth()->user()->gender;
        $hypertension = HealthRecord::where('user_id', auth()->id())
            ->where('name', 'hypertension')
            ->value('value');
        $heart_disease = HealthRecord::where('user_id', auth()->id())
            ->where('name', 'heart_disease')
            ->value('value');
        $record = HealthRecord::select('value')->where('user_id', auth()->id())
            ->where('name', '')
            ->where('name', 'diabetes_prediction')
            ->first();
});
});
require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
require __DIR__.'/healthRecord.php';
require __DIR__.'/reminder.php';
require __DIR__.'/medicine.php';
// require __DIR__.'/relation.php';
// require __DIR__.'/friend.php';
require __DIR__.'/search.php';