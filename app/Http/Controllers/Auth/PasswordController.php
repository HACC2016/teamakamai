<?php

namespace telecare\Http\Controllers\Auth;

use telecare\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Mail\Message;
use Illuminate\Support\Facades\Validator;
use JWTAuth;

/**
 * Class PasswordController
 * @package telecare\Http\Controllers\Auth
 */
class PasswordController extends Controller
{
    public $user;

    public function __construct()
    {

        $this->middleware('jwt-auth', ['except' => ['recovery', 'reset']]);
    }

    public function recovery(Request $request)
    {
        $validator = Validator::make($request->only('email'), [
            'email' => 'required|email'
        ]);
        if ($validator->fails()) {
            return response()->json(['result' => $validator->errors()->all()], 400);
        }
        $response = Password::sendResetLink($request->only('email'), function (Message $message) {
            $message->subject(trans('passwords.sent'));
        });
        switch ($response) {
            case Password::RESET_LINK_SENT:
                return response()->json(['result' => true]);
            case Password::INVALID_USER:
                return response()->json(['result' => 'user_not_found']);
        }
    }

    public function reset(Request $request, $token)
    {
        $credentials          = $request->only(
            'email', 'password', 'password_confirmation'
        );
        $credentials['token'] = $token;

        $validator = Validator::make($credentials, [
            'token'    => 'required',
            'email'    => 'required|email',
            'password' => 'required|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json(['result' => $validator->errors()->all()], 400);
        }

        $response = Password::reset($credentials, function ($user, $password) {
            $user->password = \Hash::make($password);
            $user->save();
        });

        $user = Password::getUser($credentials);

        switch ($response) {
            case Password::PASSWORD_RESET:
                return response()->json(['token' => JWTAuth::fromUser($user), 'user' => $user->toArray()]);
            default:
                return response()->json(['result' => $response], 400);
        }
    }
}
