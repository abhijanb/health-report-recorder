
<?php
use App\Http\Controllers\SearchController;
use Illuminate\Support\Facades\Route;
Route::middleware(['auth', 'throttle:60,1'])->group(function () {
    Route::get('/search/{search}', [SearchController::class, 'searchHealth'])->name('search.health-record');
    Route::get('/search/health/{search}', [SearchController::class, 'searchHealth'])->name('search.health-record');
    Route::get('/search/medicine/{search}', [SearchController::class, 'searchMedicine'])->name('search.medicine');
});

