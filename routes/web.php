<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HealthReportController;
use App\Http\Controllers\ViewPdfController;
use App\Models\HealthRecord;
use Carbon\Carbon;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

Route::middleware(['auth', 'verified','throttle:60,1'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    // web.php or routes file
Route::get('/health-record/file/{any}',[HealthReportController::class,'showImg'])->where('any','.*')->name('showImg');


    Route::get('/viewPdf/{any}',[ViewPdfController::class,'viewPdf'])->where('any',  '.*');
    Route::get('/test',function(){
        return Inertia::render('a');
    });
    Route::get('/image/{healthRecord}',[HealthReportController::class,'showImage']);
// Route::get('/predict-diabetes', function () {
//     return Inertia::render('PredictDiabetes');
// });

Route::get('/predict', function () {
    $user = Auth::user();

    // Get gender and age from user model
    $gender = $user->gender ?? '';
    $age = $user->age ?? '';

    // Fetch any existing prediction data (optional)
    $record = HealthRecord::where('user_id', $user->id)
        ->where('name', 'diabetes_prediction')
        ->first();


    return Inertia::render('PredictDiabetes', [
        'record' => [
            'gender' => $gender,
            'age' => $user->date_of_birth ? floor(Carbon::parse($user->date_of_birth)->diffInYears()) : '',
            'hypertension' => '',
            'heart_disease' => '',
            'smoking_history' => '',
            'bmi' => $record->value['bmi'] ?? '',
            'hba1c' => $record->value['hba1c'] ?? '',
            'glucose' => $record->value['glucose'] ?? '',
        ]
    ]);
})->middleware('auth');

});
require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
require __DIR__.'/healthRecord.php';
require __DIR__.'/reminder.php';
require __DIR__.'/medicine.php';
require __DIR__.'/search.php';
// require __DIR__.'/relation.php';
// require __DIR__.'/friend.php';