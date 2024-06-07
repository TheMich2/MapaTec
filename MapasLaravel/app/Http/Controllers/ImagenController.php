<?php

namespace App\Http\Controllers;

use App\Models\Imagene;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ImagenController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $imagene=Imagene::all();
        return response()->json($imagene);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'mapa_id' => 'required|exists:mapas,id',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $path = $request->file('image')->store('images', 'public');

        $imagene = Imagene::create([
            'mapa_id' => $request->input('mapa_id'),
            'path' => $path,
        ]);

        return response()->json($imagene);
    }

    /**
     * Display the specified resource.
     */
    public function show(Imagene $imagene)
    {
        return response()->json($imagene);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Imagene $imagene)
    {
        $request->validate([
            'mapa_id' => 'required|exists:mapas,id',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($request->hasFile('image')) {
            // Delete the old image
            Storage::disk('public')->delete($imagene->path);

            // Store the new image
            $path = $request->file('image')->store('images', 'public');

            // Update the path in the database
            $imagene->update([
                'mapa_id' => $request->input('mapa_id'),
                'path' => $path,
            ]);
        } else {
            $imagene->update([
                'mapa_id' => $request->input('mapa_id'),
            ]);
        }

        return response()->json($imagene);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Imagene $imagene)
    {
        Storage::disk('public')->delete($imagene->path);

        // Delete the image record from the database
        $imagene->delete();

        return response()->json("Imagen eliminada", 204);

    }
}
