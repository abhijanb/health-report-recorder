
<?php
use App\Http\Controllers\SearchController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'throttle:60,1'])->group(function () {
    
    // General search with required {search} param
    Route::get('/search/{search}', [SearchController::class, 'searchAll'])->name('search.all');
    // Specific prefix-based routes if you want to handle them separately:
    Route::get('/search/user/{search}', [SearchController::class, 'searchUser'])->name('search.user');
    Route::get('/search/doctor/{search}', [SearchController::class, 'searchDoctor'])->name('search.doctor');
    Route::get('/search/urgent/{search}', [SearchController::class, 'searchUrgent'])->name('search.urgent');
    Route::get('/search/public/{search}', [SearchController::class, 'searchPublic'])->name('search.public');
    Route::get('/search/tag/{search}', [SearchController::class, 'searchTag'])->name('search.tag');
    Route::get('/search/billing/{search}', [SearchController::class, 'searchBilling'])->name('search.billing');
    Route::get('/search/date/{search}', [SearchController::class, 'searchDate'])->name('search.date');
    Route::get('/search/field/{search}', [SearchController::class, 'searchField'])->name('search.field');
    Route::get('/search/future/{search}', [SearchController::class, 'searchFuture'])->name('search.future');

});
