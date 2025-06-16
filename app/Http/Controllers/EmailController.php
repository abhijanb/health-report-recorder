<?php

namespace App\Http\Controllers;

use App\Jobs\WelcomeEmailJob;
use App\Mail\welcomeemail;
use App\Models\Token;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Illuminate\Support\Str;
class EmailController extends Controller
{
    //
    // public function sendEmail(){
    //    $a =  Mail::to("abhijan097@gmail.com")->send(new welcomeemail('hello','sub'));
    //     dd($a);
    // }
    public function sendEmail(Request $request){

// if email already has token then update it else create

        // get email from the user 
        $TOKEN = Str::random(32); // Generates a 32-character unique string
        $expires_at = Carbon::now()->addHour(1);
        $a =Validator::make($request->all(),[
'email'=>'unique:tokens,email'. $request->user()->id

        ]);
        if($a->fails()){
return response()->json(['error'=>$a->errors()]);
        }
        Token::create([
            'email'=>$request->email,
            'token'=>$TOKEN,
            'expires_at'=>$expires_at
        ]);
        Mail::to($request->email)->send(new welcomeemail($TOKEN));
        return Inertia::render('EmailCheck');

// WelcomeEmailJob::dispatch();
    }
    public function viewMail(){
        return Inertia::render('email');
    }
    public function login($token){
        // check token to db 
        $user = Token::where('token',$token)->first();
        if($user){
            Auth::login($user);
            return response()->json([
                'mes'=>"connected",
                
            ]);
        }
        return response()->json([
            "failed"=>"failed"
        ]);
        // if present in db login
        // else return failed login
    }
}
