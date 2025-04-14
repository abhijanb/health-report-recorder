<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RecordHistory extends Model
{
    //
    protected $fillable = [
        'user_id',
        'record_id',
        'record_type',
        'record_details',
        'record_file',
        'visibility',
        'value',
    ];

    public function report(){
        return $this->belongsTo(HealthRecord::class);
    }
}
