<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class cantante extends Model
{
    use HasFactory;

    protected $table = 'cantantes';

    // Relación

    public function user(){
        return $this->belongsTo('App\User', 'user_id');
    }
}
