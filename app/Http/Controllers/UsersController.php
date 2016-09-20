<?php

namespace telecare\Http\Controllers;

use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Auth\Passwords\PasswordResetServiceProvider;
use Illuminate\Foundation\Auth\ResetsPasswords;
use telecare\Http\Middleware\AuthJWT;
use telecare\Models\User;
use Illuminate\Http\Request;
use telecare\Interfaces\UserRepositoryInterface;
use Tymon\JWTAuth\Facades\JWTAuth;

/**
 * Class UsersController
 * @package telecare\Http\Controllers
 */
class UsersController extends Controller
{
    public function __construct()
    {
        $this->middleware('jwt-auth');
    }

    /**
     * @param \telecare\Interfaces\UserRepositoryInterface $users
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(UserRepositoryInterface $users)
    {
        return response()->json($users->doSelectUsers(), 200);
    }

    public function token($identity)
    {
        return response()->json(['token' => JWTAuth::user()->getTwilioCode($identity)]);
    }
}
