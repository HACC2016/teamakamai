<?php

namespace telecare\Http\Controllers;

use Auth;
use \telecare\Interfaces\UserRepositoryInterface;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('jwt-auth', ['except' => 'index']);
    }

    public function index()
    {
        return view('welcome', [
            'user' => Auth::check() ? Auth::user() : false
        ]);
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function home(UserRepositoryInterface $users)
    {
        return view('home', [
            'users' => $users->doSelectUsers()
        ]);
    }
}
