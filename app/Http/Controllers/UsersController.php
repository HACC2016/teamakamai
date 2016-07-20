<?php

namespace telecare\Http\Controllers;

use Illuminate\Http\Request;

use telecare\Http\Requests;
use telecare\Interfaces\UserRepositoryInterface;

class UsersController extends Controller
{
    public function index(UserRepositoryInterface $users){
        return response()->json($users->doSelectUsers(), 200);
    }
}
