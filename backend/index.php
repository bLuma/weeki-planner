<?php

require_once 'vendor/autoload.php';

dibi::connect([
    'driver'   => 'mysql',
    'host'     => 'localhost',
    'username' => 'weeki',
    'password' => 'planner',
    'database' => 'weeki-planner',
    'charset'  => 'utf8',
]);

dibi::query('TRUNCATE `table`');
