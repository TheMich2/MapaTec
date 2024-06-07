<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Imagene extends Model
{
    use HasFactory;

    protected $fillable = [
        'mapa_id',
        'path',
    ];

    public function mapa()
    {
        return $this->belongsTo(Mapa::class);
    }
}
