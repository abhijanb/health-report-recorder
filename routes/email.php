<?php

use App\Http\Controllers\EmailController;
use Illuminate\Support\Facades\Route;
use Symfony\Component\Mailer\Test\Constraint\EmailCount;

Route::get('/mail',[EmailController::class,'viewMail'])->name('email');
Route::post('/sendMail',[EmailController::class,'sendEmail'])->name('email.send');
// on url visit login that user
Route::get('/login/{TOKEN}',[EmailController::class,'login'])->name('loginEmail');