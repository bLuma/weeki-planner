<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Calendar;
use DateTime;
use DateInterval;

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

    private function fixDayOfWeek($dayOfWeek) {
      $newDayOfWeek = $dayOfWeek - 1;
      if ($newDayOfWeek < 0) {
          $newDayOfWeek = 7;
      }

      return $newDayOfWeek;
    }

    private function getWeekdayName($dayOfWeek) {
      switch ($dayOfWeek) {
        case 0: return "monday";
        case 1: return "tuesday";
        case 2: return "wednesday";
        case 3: return "thursday";
        case 4: return "friday";
        case 5: return "saturday";
        case 6: return "sunday";
      }
    }

    public function req(Request $request)
    {
        $timestamp = time();

        // date: 0 sunday, 1 monday, ...
        // after fixing: 0 monday, 1 tuesday, ...
        $dayOfWeek = $this->fixDayOfWeek(date("w", $timestamp));

        // week number - starts with monday
        $weekOfYear = date("W", $timestamp);
        $oddOrEvenWeek = $weekOfYear % 2 == 0 ? 'e' : 'o';

        $dateTime = new DateTime();
        $dateTime->setTimestamp($timestamp);
        $dateTime->setTime(0, 0);

        $mondayDateTime = clone $dateTime;
        $mondayDateTime->sub(new DateInterval('P'.$dayOfWeek.'D'));

        $nextMondayDateTime = clone $mondayDateTime;
        $nextMondayDateTime->add(new DateInterval('P7D'));

        $check = date(DATE_ATOM, $timestamp);
        echo "<pre>";
        var_dump([
            "dayOfWeek" => $dayOfWeek,
            "weekOfYear" => $weekOfYear,
            "oddOrEvenWeek" => $oddOrEvenWeek,
            "check" => $check,
            "dateTime" => $dateTime,
            "mondayDateTime" => $mondayDateTime,
            "nextMondayDateTime" => $nextMondayDateTime
        ]);

        $result = [];
        for ($weekDay = 0; $weekDay < 7; $weekDay++) {
          $result[$this->getWeekdayName($weekDay)] = [];
        }

        $userCalendar = $request->user()->calendar();

        $baseCalendar = $userCalendar->where('week', $oddOrEvenWeek)->get();
        foreach ($baseCalendar as $record) {
          $result[$this->getWeekdayName($record->day)][$record->hour] = ["state" => $record->state, "comment" => $record->comment, "type" => "base"];
        }

        print_r($result);

        return response()->json($result);
    }

    //
}