<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Calendar;

class CalendarController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function req(Request $request)
    {
        $out = $request->user()->calendar()->get();
        return response($out);
//      return response()->json(["woho" => "wooo"]);
    }

    //
}