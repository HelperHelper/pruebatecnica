<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class tarea extends Model
{
    use HasFactory;

    protected $table = 'tareas';

    // Relación

    public function user(){
        return $this->belongsTo('App\User', 'user_id');
    }
}
