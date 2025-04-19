<?php

use App\Http\Controllers\HealthReportController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/health-record', [HealthReportController::class, 'index'])->name('health-record.index');
    Route::get('/health-record/create', [HealthReportController::class, 'create'])->name('health-record.create');
    Route::post('/health-record', [HealthReportController::class, 'store'])->name('health-record.store');
    Route::get('/health-record/{id}/show',[HealthReportController::class,'show'])->name('health-record.show');
    Route::get('/health-record/{id}/edit', [HealthReportController::class, 'edit'])->name('health-record.edit');
    Route::post('/health-record/{id}', [HealthReportController::class, 'update'])->name('health-record.update');
    Route::delete('/health-record/{id}/delete', [HealthReportController::class, 'destroy'])->name('health-record.destroy');
    Route::get("/health-record-history/{healthRecord}", [HealthReportController::class, "history"])->name("health-record.history");
    Route::get("/health-record/trash",[HealthReportController::class,"trashAll"])->name("health-trash");
    Route::get("/health-record/{healthRecord}/restore",[HealthReportController::class,"restore"])->name("restore");
    Route::get("/health-record/{healthRecord}/permanent",[HealthReportController::class,'permanent'])->name("permanent");
    
});
