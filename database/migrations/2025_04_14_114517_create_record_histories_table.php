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
        Schema::create('record_histories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('record_id')->constrained('health_records')->onDelete('cascade');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->decimal('value');
            $table->enum('record_type', ['file', 'text', 'image']);
            $table->string('record_details');
            $table->string('record_file')->nullable();
            $table->enum('visibility', ['public_all', 'friends', 'private']);
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('record_histories');
    }
};
