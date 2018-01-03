<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use App\User;

class UserController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    public function validateUser(Request $request) 
    {
        $this->validate($request, [
            'api_key' => 'required'
        ]);

        $user = User::where('api_key', $request->input('api_key'))->first();

        if ($user != null) {
            return response()->json(['status' => 'success', 'username' => $user->name]);
        } else {
            return response()->json(['status' => 'fail'], 401);
        }
    }

    public function authenticate(Request $request)
    {
        $this->validate($request, [
            'name' => 'required',
            'password' => 'required'
        ]);

        $user = User::where('name', $request->input('name'))->first();

        if ($user != null && Hash::check($request->input('password'), $user->password)) {
            $apikey = base64_encode(str_random(40));
            User::where('name', $request->input('name'))->update(['api_key' => $apikey]);;

            return response()->json(['status' => 'success', 'api_key' => $apikey]);
        } else {
            return response()->json(['status' => 'fail'], 401);
        }
    }
}
