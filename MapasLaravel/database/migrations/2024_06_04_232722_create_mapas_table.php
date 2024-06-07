<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('mapas', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('nombreArea',50)->nullable();
            $table->longText('descripcion',50)->nullable();
            $table->time('horarioAbierto')->nullable();
            $table->time('horaCierre')->nullable();
            $table->string('recomendaciones')->nullable();
            $table->string('altitud',240)->nullable();
            $table->string('latitud',240)->nullable();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mapas');
    }
};
