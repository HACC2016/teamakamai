<?php

namespace telecare\Http\Controllers;

use \Illuminate\Http\Request;
use \telecare\Http\Requests;

class TwilioController extends Controller
{
    public function __construct(){
        $this->middleware('auth');
    }

    public function create(Request $request, $id){
        return view('call', [
            'token'=> $request->user()->getTwilioCode()
        ]);
    }
}
