<?php

use App\Http\Controllers\RelationController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified','throttle:60,1'])->prefix("/relation")->group(function () {
    Route::get('/index',[RelationController::class,'getUserRelations'])->name('relations');
    Route::get('/{user}',[RelationController::class,'showRelationData'])->name('relationsData');
    Route::get("/create",[RelationController::class,'create'])->name('addRelation');
    Route::post('/code',[RelationController::class,'code'])->name('code');

});
