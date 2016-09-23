<?php

namespace telecare\Http\Controllers\Auth;

use JWTAuth, Tymon\JWTAuth\Exceptions\JWTException;
use \telecare\Http\Controllers\Controller;
use Illuminate\Http\Request;
use telecare\Models\User;
use Illuminate\Support\Facades\Hash;
use Auth;

/**
 * Class AuthController
 * @package telecare\Http\Controllers\Auth
 */
class AuthController extends Controller
{
    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function authenticate(Request $request)
    {
        // grab credentials from the request
        $credentials = $request->only('email', 'password');

        try {
            // attempt to verify the credentials and create a token for the user
            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'invalid_credentials'], 401);
            }
        } catch (JWTException $e) {
            // something went wrong whilst attempting to encode the token
            return response()->json(['error' => 'could_not_create_token'], 500);
        }

        // all good so return the token
        return response()->json([
            'token' => $token,
            'user'  => JWTAuth::user()
        ]);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
    {

        $input = $request->only(['email', 'password', 'first_name', 'last_name', 'password_confirmation']);

        $validator = \Validator::make($input, array(
            'first_name'            => 'required',
            'last_name'             => 'required',
            'email'                 => 'required|email|unique:users',
            'password'              => 'required|min:3|max:25',
            'password_confirmation' => 'required_with:password|same:password',
            //'avatar' => 'image|max:2000',
            //'terms' => 'accepted'
        ));

        if ($validator->fails()) {
            return response()->json([
                'result' => false,
                'errors' => $validator->messages()->toArray()
            ], 400);
        }
        $input['password'] = Hash::make($input['password']);

        $user = User::create($input);

        return response()->json([
            'token' => JWTAuth::fromUser($user),
            'user'  => $user->toArray()
        ]);
    }

    /**
     *
     */
    public function logout()
    {
        try {
            JWTAuth::invalidate(JWTAuth::getToken());
        } catch (JWTException $ex) {
        }
        return response('', 201);
    }

}
