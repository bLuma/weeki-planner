<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Calendar extends Model {

    protected $fillable = ["week", "day", "state", "comment"];

    protected $dates = [];

    public static $rules = [
        // Validation rules
    ];

    public function user()
    {
        return $this->belongsTo("App\User");
    }


}
