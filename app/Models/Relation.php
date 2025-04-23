<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Relation extends Model
{
    /** @use HasFactory<\Database\Factories\RelationFactory> */
    use HasFactory;
    protected $fillable = [
        'user_id',
        'relation_user_id',
        'relationship_name'
    ];
    public $timestamps = true;

    protected $casts = [
        'relationship_name' => 'encrypted'
    ];

    public function user(){
        return $this->belongsTo(User::class,'user_id','id');
    }
    public function relatedUser()
    {
        return $this->belongsTo(User::class, 'relation_user_id');
    }
}
