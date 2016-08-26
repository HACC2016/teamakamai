<?php

namespace telecare\Http\Controllers;

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
        $this->middleware('auth', ['except' => 'index']);
    }

    public function index()
    {
        return view('welcome', [
            'user'  => \Auth::check() ? \Auth::user() : false
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

    public function avatar(){
        $files = glob(public_path('assets/img/avatar').'/*.*');
        $file = $files[array_rand($files)];
        return response()->file($file);
    }
}
