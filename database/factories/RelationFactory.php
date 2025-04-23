<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Relation>
 */
class RelationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
{
    return [
        // 'user_id' => fake()->numberBetween(1, 10), // assuming you have 50 users
        'user_id' => 1, // assuming you have 50 users
        'relation_user_id' => fake()->numberBetween(1, 10), // same assumption
        'relationship_name' => fake()->randomElement(['friend', 'sibling', 'parent', 'spouse', 'colleague']),
    ];
}

}
