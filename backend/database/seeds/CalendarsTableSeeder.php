<?php
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Seeder;
use App\User;
use App\Calendar;

class CalendarsTableSeeder extends Seeder {

  public function run() {
    $adminId = User::where('name', 'admin')->first()->id;
    $this->seedUser($adminId);

    $user1 = User::where('name', 'user1')->first()->id;
    $this->seedUser($user1);
  }

  private function seedUser($uid) {
    $states = ['f', 'm', 'o'];
    $hoursToGenerate = 9;

    for($day = 0; $day < 5; $day++) {
      for ($hour = 0; $hour < $hoursToGenerate; $hour++) {
        for ($week = 0; $week < rand() % 2 + 1; $week++) {
          Calendar::create([
            'user' => $uid,
            'day' => $day,
            'hour' => $hour,
            'week' => ($week == 0 ? 'o' : 'e'),
            'state' => $states[rand() % count($states)],
            'comment' => ''
          ]);
        }
      }
    }

    $dt = new DateTime();
    $dt->setDate($dt->format('Y'), 1, 1);
    $dt->setTime(0, 0);

    for($day = 0; $day < 365; $day++) {
      for ($hour = 0; $hour < $hoursToGenerate; $hour++) {
        if (rand() % 100 < 30) {
          Calendar::create([
            'user' => $uid,
            'day' => $dt->getTimestamp(),
            'hour' => $hour,
            'week' => 'c',
            'state' => $states[rand() % count($states)],
            'comment' => ''
          ]);
        }
      }
      $dt->add(new DateInterval('P1D'));
    }
  }

}