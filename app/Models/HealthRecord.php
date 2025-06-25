<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class HealthRecord extends Model
{
    use SoftDeletes, HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'record_type',
        'record_details',
        'record_file',
        'priority',
        'status',
        // 'visibility',
        'value',
        'unit',
        'tags',
        'source',
    ];

    protected $casts = [
        'tags' => 'array',
        'value' => 'decimal:2',
    ];

    public $timestamps = true;

    public function histories()
    {
        return $this->hasMany(RecordHistory::class, 'record_id');
    }
}
