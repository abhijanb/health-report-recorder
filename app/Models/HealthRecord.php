<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HealthRecord extends Model
{
    //
    protected $fillable = [
        'user_id',
        'name',
        'record_type',
        'record_details',   
        'record_file',
        'visiblility',
        'value'
    ];
    public $timestamps = true;

    public function histories(){
        return $this->hasMany(RecordHistory::class, 'record_id');
    }
}
