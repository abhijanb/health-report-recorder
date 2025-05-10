<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\MedicineReport>
 */
class MedicineReportFactory extends Factory
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
            'user_id' => 1, // creates related user
            'medicine_name' => $this->faker->word,
            'dosage' => $this->faker->randomElement(['5mg', '10mg', '1 tablet', null]),
            'frequency' => $this->faker->randomElement(['once', 'twice', 'thrice', 'daily']),
            'start_date' => $this->faker->date(),
            'end_date' => $this->faker->date(),
            'price' => $this->faker->optional()->randomFloat(2, 5, 500),
            'store_name' => $this->faker->company,
            'prescription' => $this->faker->optional()->imageUrl(),
        ];
    }
}
