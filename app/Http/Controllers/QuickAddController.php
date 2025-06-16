<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class QuickAddController extends Controller
{
    //
    // public function __invoke(Request $request)
    // {
    //     // 
    // }
    public function create(){
        return Inertia::render('quick-access/create');
    }

    public function store(Request $request){
        $validation = Validator::make($request->all(),[

        ]);
    }
}
