<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\HealthReminder>
 */
class HealthReminderFactory extends Factory
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
            'user_id' => 1, // ensures a user is created and associated
            'reminder_type' => $this->faker->randomElement(['medication', 'appointment', 'exercise', 'others']),
            'reminder_message' => $this->faker->sentence,
            'reminder_time' => $this->faker->date(),
            'is_active' => $this->faker->boolean(90), 
        ];
    }
}
