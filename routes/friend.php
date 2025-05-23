<?php

use App\Http\Controllers\FriendController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified','throttle:60,1'])->group(function () {
    // display all friends
    Route::get('/friend', [FriendController::class,'index'])->name('friend.index');

    Route::get('/friend/{any}', function () {
        return Inertia\Inertia::render('Friend/Index');
    })->where('any', '.*')->name('friend.any');
});