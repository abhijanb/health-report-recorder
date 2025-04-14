<?php

use App\Http\Controllers\MedicineController;
use App\Http\Controllers\ViewPdfController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth','verified'])->prefix('/medicine')->group(function () {
    Route::get('/', [MedicineController::class, 'index'])->name('medicine.index');
    Route::get('/create', [MedicineController::class, 'create'])->name('medicine.create');
    Route::post('/', [MedicineController::class,'store'])->name('medicine.store');
    Route::get('/{id}/show', [MedicineController::class, 'show'])->name('medicine.show');
    Route::get('/{id}/edit', [MedicineController::class, 'edit'])->name('medicine.edit');
    Route::post('/{id}', [MedicineController::class, 'update'])->name('medicine.update');
    Route::delete('/{id}', [MedicineController::class, 'destroy'])->name('medicine.destroy');

});