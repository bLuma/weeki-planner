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


  public function authenticate(Request $request)
  {
    $this->validate($request, [
      'name' => 'required',
      'password' => 'required'
     ]);

     $user = User::where('name', $request->input('name'))->first();
     //return response()->json(["a" => Hash::make($request->input('password'))]);

     if($user != null && Hash::check($request->input('password'), $user->password)){
         $apikey = base64_encode(str_random(40));
         User::where('name', $request->input('name'))->update(['api_key' => "$apikey"]);;

         return response()->json(['status' => 'success', 'api_key' => $apikey]);
     }else{
         return response()->json(['status' => 'fail'], 401);
     }
   }
    //
}
