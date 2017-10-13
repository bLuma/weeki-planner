<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Calendar;
use App\User;
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
    public function calendar(Request $request)
    {
        $timestamp = $request->input('timestamp', time());
        $hoursToGet = $request->input('hours', 9);
        $onlyBaseCalendar = $request->input('onlybase', true);

        if ($request->has('user')) {
            $users = [User::where('name', $request->input('user'))->first()];
        } else {
            $users = User::whereExists(function ($query) {
                $query->select(DB::raw(1))
                    ->from('calendars')
                    ->whereRaw('calendars.user = users.id');
            })->get();
        }

        if (empty($users) || $users[0] == null) {
            return response()->json([]);
        }

        $result = [];
        foreach($users as $user) {
            $result[] = [
                "user" => $user->name,
                "data" => $this->getUserCalendar($user, $timestamp, $hoursToGet, $onlyBaseCalendar)
            ];
        }

        return response()->json($result);
    }

    private function getUserCalendar($user, $timestamp, $hoursToGet, $onlyBaseCalendar) {
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

        /*$check = date(DATE_ATOM, $timestamp);
        echo "<pre>";
        var_dump([
            "dayOfWeek" => $dayOfWeek,
            "weekOfYear" => $weekOfYear,
            "oddOrEvenWeek" => $oddOrEvenWeek,
            "check" => $check,
            "dateTime" => $dateTime,
            "mondayDateTime" => $mondayDateTime,
            "nextMondayDateTime" => $nextMondayDateTime
        ]);*/

        $result = [];
        for ($weekDay = 0; $weekDay < 7; $weekDay++) {
            $hourArray = [];
            for ($hour = 0; $hour < $hoursToGet; $hour++) {
                $hourArray[$hour] = ["state" => $this->fixState("u")];
            }

            $result[$this->getWeekdayName($weekDay)] = $hourArray;
        }

        $baseCalendar = $user->calendar()->where('week', $oddOrEvenWeek)->get();
        foreach ($baseCalendar as $record) {
            $result[$this->getWeekdayName($record->day)][$record->hour] = ["state" => $this->fixState($record->state), "comment" => $record->comment, "type" => "base"];
        }

        if (!$onlyBaseCalendar) {
            $customCalendar = $user->calendar()->where('week', 'c')->whereBetween('day', [$mondayDateTime->getTimestamp(), $nextMondayDateTime->getTimestamp() - 1])->get();
            foreach ($customCalendar as $record) {
                $result[$this->getWeekdayName($record->day)][$record->hour] = ["state" => $this->fixState($record->state), "comment" => $record->comment, "type" => "custom"];
            }
        }

        return $result;
    }

    private function fixState($dbState) {
        switch ($dbState) {
            case "o": return "occupied";
            case "m": return "maybe";
            case "f": return "free";
        }

        return "unset";
    }

    private function fixDayOfWeek($dayOfWeek) {
        $newDayOfWeek = $dayOfWeek - 1;
        if ($newDayOfWeek < 0) {
            $newDayOfWeek = 6;
        }

        return $newDayOfWeek;
    }

    private function getWeekdayName($dayOfWeek) {
        if ($dayOfWeek > 6) {
            $dayOfWeek = $this->fixDayOfWeek(date("w", $dayOfWeek));
        }

        switch ($dayOfWeek) {
            case 0: return "monday";
            case 1: return "tuesday";
            case 2: return "wednesday";
            case 3: return "thursday";
            case 4: return "friday";
            case 5: return "saturday";
            case 6: return "sunday";
        }

        throw new \Exception('Unknown dayOfWeek ' . $dayOfWeek);
  }

  private function getWeekdayIndex($dayOfWeek) {
      switch ($dayOfWeek) {
        case "monday": return 0;
        case "tuesday": return 1;
        case "wednesday": return 2;
        case "thursday": return 3;
        case "friday": return 4;
        case "saturday": return 5;
        case "sunday": return 6;
      }

      throw new \Exception('Unknown dayOfWeek ' . $dayOfWeek);
  }

  public function calendarUpdate(Request $request) {
      $week = $request->input('week');
      $day = $request->input('day');
      $day = $this->getWeekdayIndex($day);
      $hour = $request->input('hour');
      $state = $request->input('state');
      if (strlen($state) > 1) {
          $state = $state[0];
      }
      $comment = $request->input('comment', '');
      $user = $request->user();

      $entry = [
        'week' => $week,
        'day' => $day,
        'hour' => $hour,
        'state' => $state,
        'comment' => $comment
      ];

      if ($week == 'eo' || $week == 'oe') {
          $entry['week'] = 'e';
          $this->deleteAndCreateCalendarEntry($entry, $user);
          $entry['week'] = 'o';
          $this->deleteAndCreateCalendarEntry($entry, $user);
      } else {
          $this->deleteAndCreateCalendarEntry($entry, $user);
      }

      return response()->json([]);
  }

  private function deleteAndCreateCalendarEntry($entry, $user) {
      $calendar = Calendar::where([
        'week' => $entry['week'],
        'day' => $entry['day'],
        'hour' => $entry['hour'],
        'user' => $user->id
      ])->delete();

      Calendar::create([
        'week' => $entry['week'],
        'day' => $entry['day'],
        'hour' => $entry['hour'],
        'user' => $user->id,
        'state' => $entry['state'],
        'comment' => $entry['comment']
      ]);
  }
}
