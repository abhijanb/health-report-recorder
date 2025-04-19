<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use softDeletes;
class HealthReminder extends Model
{
    //

    protected $fillable = [
        'user_id',
        'reminder_type',
        'reminder_message',
        'reminder_time',
        'is_active'
       
    ];
    public $timestamps = true;
    

}
