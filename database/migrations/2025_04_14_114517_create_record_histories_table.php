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

            $table->foreignId('record_id')
                ->constrained('health_records')
                ->onDelete('cascade');

            $table->foreignId('user_id')
                ->constrained('users')
                ->onDelete('cascade');

            $table->string('name');
            $table->enum('record_type', ['file', 'text', 'image', 'json']);
            $table->text('record_details')->nullable();
            $table->string('record_file', 255)->nullable();
            $table->enum('priority', ['low', 'normal', 'high'])->default('normal');
            $table->enum('status', ['active', 'archived', 'pending'])->default('active');
            $table->decimal('value', 10, 2)->nullable();
            $table->string('unit')->nullable();
            $table->date('date_of_record');
            $table->json('tags')->nullable(); 
            $table->string('source')->nullable();

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
