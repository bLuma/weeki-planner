<?php
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Seeder;
use App\User;
use App\Calendar;

class CalendarsTableSeeder extends Seeder {

  public function run() {
    $adminId = User::where('name', 'admin')->first()->id;
    $user1 = User::where('name', 'user1')->first()->id;

    $states = ['f', 'm', 'o'];

    for($day = 0; $day < 5; $day++) {
      for ($hour = 8; $hour < 16; $hour++) {
        for ($week = 0; $week < rand() % 2 + 1; $week++) {
          Calendar::create([
            'user' => $adminId,
            'day' => $day,
            'hour' => $hour,
            'week' => ($week == 0 ? 'o' : 'e'),
            'state' => $states[rand() % count($states)],
            'comment' => ''
          ]);
        }
      }
    }
  }
}