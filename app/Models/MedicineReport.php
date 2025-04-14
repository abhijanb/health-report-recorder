<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MedicineReport extends Model
{
    //
    protected $fillable = [
    'user_id',
    'medicine_name',
    'dosage',
    'frequency',
    'start_date',
    'end_date',
    'price',
    'store_name',
    'prescription'
    ];
    public $timestamps = True;
}
