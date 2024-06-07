<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mapa extends Model
{
    use HasFactory;

    protected $table = 'mapas';

    protected $fillable = [
        'nombreArea',
        'descripcion',
        'horarioAbierto',
        'horaCierre',
        'recomendaciones',
        'altitud',
        'latitud',
        'user_id',
    ];

    // Relación con el modelo User
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Relación con el modelo Image (suponiendo que un mapa puede tener muchas imágenes)
    public function images()
    {
        return $this->hasMany(Imagene::class);
    }
}
