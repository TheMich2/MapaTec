<?php

namespace App\Http\Controllers;

use App\Models\Mapa;
use Illuminate\Http\Request;

class MapaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $mapas = Mapa::all();
        return response()->json($mapas);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nombreArea' => 'required|string|max:50',
            'descripcion' => 'nullable|string|max:65535',
            'horarioAbierto' => 'nullable|date_format:H:i', // Formato 24 horas, solo horas y minutos
            'horaCierre' => 'nullable|date_format:H:i', // Formato 24 horas, solo horas y minutos
            'recomendaciones' => 'nullable|string|max:255',
            'altitud' => 'nullable|numeric|between:-180,180',
            'latitud' => 'nullable|numeric|between:-180,180',
        ]);
        $mapa = Mapa::create($request->all());
        return response()->json($mapa);

    }

    /**
     * Display the specified resource.
     */
    public function show(Mapa $mapa)
    {
        return response()->json($mapa);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Mapa $mapa)
    {
        $request->validate([
            'nombreArea' => 'required|string|max:50',
            'descripcion' => 'nullable|string|max:65535',
            'horarioAbierto' => 'nullable|date_format:H:i', // Formato 24 horas, solo horas y minutos
            'horaCierre' => 'nullable|date_format:H:i', // Formato 24 horas, solo horas y minutos
            'recomendaciones' => 'nullable|string|max:255',
            'altitud' => 'nullable|numeric|between:-180,180',
            'latitud' => 'nullable|numeric|between:-180,180',
        ]);
    
        $mapa->update($request->all());
        return response()->json($mapa);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Mapa $mapa)
    {
        $mapa->delete();
        return response()->json("Mapa eliminado");
    }
}
