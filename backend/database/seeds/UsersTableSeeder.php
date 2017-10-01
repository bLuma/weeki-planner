<?php
use App\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder {

  public function run() {
    User::create([
      'name' => 'admin',
      'password' => Hash::make('admin'),
      'api_key' => Hash::make('1')
    ]);

    User::create([
      'name' => 'user1',
      'password' => Hash::make('user1'),
      'api_key' => Hash::make('2')
    ]);

    User::create([
      'name' => 'user2',
      'password' => Hash::make('user2'),
      'api_key' => Hash::make('3')
    ]);

    User::create([
      'name' => 'user3',
      'password' => Hash::make('user3'),
      'api_key' => Hash::make('4')
    ]);
  }
}