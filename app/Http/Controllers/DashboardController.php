<?php

namespace App\Http\Controllers;

use App\Models\HealthRecord;
use App\Models\HealthReminder;
use App\Models\MedicineReport;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $userProfile = [
            'name' => $user->name,
            'email' => $user->email,
            'date_of_birth' => $user->date_of_birth,
            'age' => $user->date_of_birth ? floor(Carbon::parse($user->date_of_birth)->diffInYears()) : null,
            'gender' => $user->gender,
            'phone_number' => $user->phone_number,
            'address' => $user->address,
            'avatar' => $user->avatar
        ];
        
        $latestHealthRecords = HealthRecord::where('user_id', $user->id)
            ->latest()
            ->take(5)
            ->get();
            
        $upcomingReminders = HealthReminder::where('user_id', $user->id)
            ->orderBy('reminder_time')
            ->take(5)
            ->get();
           
        $recentMedicines = MedicineReport::where('user_id', $user->id)
            ->latest()
            ->take(5)
            ->get();
            
        return Inertia::render('dashboard', [
            'latestHealthRecords' => $latestHealthRecords,
            'upcomingReminders' => $upcomingReminders,
            'recentMedicines' => $recentMedicines,
            'user' => $user,
            'userProfile' => $userProfile
        ]);
    }

  
}