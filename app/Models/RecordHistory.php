<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class RecordHistory extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'user_id',
        'record_id',
        'name',
        'record_type',
        'record_details',
        'record_file',
        'priority',
        'status',
        'visibility',
        'value',
        'unit',
        'date_of_record',
        'tags',
        'source',
    ];

    protected $casts = [
        'tags' => 'array',
        'date_of_record' => 'date',
        'value' => 'decimal:2',
    ];

    public function record()
    {
        return $this->belongsTo(HealthRecord::class, 'record_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
