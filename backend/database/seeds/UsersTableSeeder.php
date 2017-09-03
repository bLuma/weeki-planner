<?php
use App\Users;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder {

  public function run() {
    Users::create([
      'name' => 'admin',
      'password' => Hash::make('admin')
    ]);
  }
}