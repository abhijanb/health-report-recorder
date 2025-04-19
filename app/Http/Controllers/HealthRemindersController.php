<?php

namespace App\Http\Controllers;

use App\Models\HealthReminder;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class HealthRemindersController extends Controller
{
    //
    public  function index(){
        $reminders = HealthReminder::where('user_id',Auth::id())->get();
        return Inertia::render('reminder/index',[
            'reminders' =>$reminders
        ]);
    }

    public function create(){
        return Inertia::render('reminder/create');
    }
    public function store(Request $request){
        $request->validate([
            'reminder_type' =>'required|string|in:medication,appointment,exercise,others',
            'reminder_message' =>'required|string',
            'reminder_time' => 'required|date_format:Y-m-d|after:today',
            'is_active' => 'required|boolean',
        ]);
        HealthReminder::create([
            'user_id' =>Auth::id(),
            'reminder_type' =>$request->reminder_type,
            'reminder_message' =>$request->reminder_message,
            'reminder_time' =>$request->reminder_time,
            'is_active' =>$request->is_active,
        ]);
        return back()->with('message','Reminder set successfully');
    }

    public function show(HealthReminder $reminder) {
        if ($reminder->user_id !== Auth::id()) {
            abort(403);
        }
        return Inertia::render('reminder/show', [
            'reminder' => $reminder
        ]);
    }
    public function destroy(HealthReminder $reminder){
        if ($reminder->user_id!== Auth::id()) {
            abort(403);
        }
        $reminder->delete();
        return to_route('reminder.index');
    }
    
}
