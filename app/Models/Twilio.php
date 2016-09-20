<?php

namespace telecare;

use Illuminate\Database\Eloquent\Model;

class Twilio extends Model
{
    const STATUS_NEW = 1, STATUS_ONGOING = 2, STATUS_COMPLETED = 3, STATUS_EXPIRED = 4;
    protected $fillable = ['from', 'to', 'status'];
}
