<?php

use Tests\TestCase;

uses(Tests\TestCase::class);

test('example', function () {
    $user = \App\Models\User::factory()->create();
    $response = $this->actingAs($user)->get('/health-record');

    $response->assertStatus(200);
});
