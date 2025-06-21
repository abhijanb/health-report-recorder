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
        //
        Schema::create('health_records', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->enum('record_type', ['file', 'text', 'image', 'json']);
            $table->text('record_details');
            $table->string('record_file', 255)->nullable();
            $table->enum('priority', ['low', 'normal', 'high'])->default('normal');
            $table->enum('status', ['active', 'archived', 'pending'])->default('active');
            $table->enum('visibility', ['public_all', 'friends', 'private'])->default('private');
            $table->decimal('value', 10, 2)->nullable();
            $table->string('unit')->nullable();
            // $table->date('date_of_record')->nullable();
            $table->json('tags')->nullable(); // requires MySQL 5.7+ or Postgres
            // $table->string('source')->nullable();
            $table->softDeletes();
            $table->timestamps();

            $table->index(['user_id', 'record_type', 'visibility', 'date_of_record']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
