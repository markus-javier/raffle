<?php
// database/migrations/xxxx_xx_xx_create_raffle_entries_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('raffle_entries', function (Blueprint $table) {
            $table->id();
            $table->foreignId('raffle_id')->constrained()->onDelete('cascade');
            $table->foreignId('participant_id')->nullable()->constrained()->nullOnDelete();
            $table->string('entrant_name'); // Add this for storing just names
            $table->string('ticket_number')->unique();
            $table->boolean('is_valid')->default(true);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('raffle_entries');
    }
};
