<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('calendars')->delete();
        DB::table('users')->delete();

        $this->call('UsersTableSeeder');
        $this->call('CalendarsTableSeeder');
    }
}
