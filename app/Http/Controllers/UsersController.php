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
use Illuminate\Support\Str;
use Illuminate\Support\Facades\File;


/**
 * Class UsersController
 * @package telecare\Http\Controllers
 */
class UsersController extends Controller
{
    public function __construct()
    {
        $this->middleware('jwt-auth',[
            //'except'=>'updateProfile'
        ]);
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

    public function updateProfile(Request $request)
    {
        $input = $request->only(['email', 'password', 'first_name', 'last_name', 'password_confirmation']);

        $validator = \Validator::make($input, array(
            'first_name'            => 'required',
            'last_name'             => 'required',
            'email'                 => 'required|email|unique:users,email,'.$request->user()->id,
            'password'              => 'min:3|max:25',
            'password_confirmation' => 'required_with:password|same:password',
            //'avatar' => 'image|max:2000',
            //'terms' => 'accepted'
        ));

        if ($validator->fails()) {
            return response()->json([
                'result' => false,
                'errors' => array_values($validator->messages()->toArray())
            ], 400);
        }

        if($input['password'])
            $input['password'] = \Hash::make($input['password']);

        //$request->user()->fill($input);
        $request->user()->update(empty($request->get('password')) ? $request->except('password') : $input);

        return response()->json([
            'token' => JWTAuth::fromUser($request->user()),
            'user'  => $request->user()->toArray()
        ]);
    }

    public function updateAvatar(Request $request){
        $user = $request->user();

        $validator = \Validator::make($request->only('file'), array(
            'file' => 'required|image',
        ));

        if($validator->fails()){
            return response()->json([
                'result' => false,
                'errors' => $validator->messages()->toArray()
            ], 400);
        }


        if($user->avatar){
            File::delete(public_path('avatars/' . $user->avatar));
        }

        $file = $request->file('file');
        $filename = Str::random(20) .'.'. $file->getClientOriginalExtension();

        $file->move(public_path('avatars'), $filename);

        $user->update([
            'avatar' => $filename
        ]);

        return response()->json($user->toArray());

    }
}
