<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\HealthRecord>
 */
class HealthRecordFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            //
            'user_id'=>3,
            'name'=>fake()->name(),
            'record_type'=>fake()->randomElement(['file', 'text', 'image']),
            'record_details'=>fake()->slug(),   
            'record_file'=>fake()->imageUrl(),
            'visibility'=>fake()->randomElement(['public_all', 'friends', 'private']),
            'value'=>fake()->numberBetween(40,9430)
        ];
    }

}