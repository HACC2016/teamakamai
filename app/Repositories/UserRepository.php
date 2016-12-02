<?php
namespace telecare\Repositories;

use telecare\Interfaces\UserRepositoryInterface;
use telecare\Models\User;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Exceptions\JWTException;


class UserRepository implements UserRepositoryInterface
{
    public function __construct()
    {
        // Get the JWT auth token from the request
        $this->token = $this->getTokenFromRequest();

        // Get the user based on the token
        $this->user = $this->userFromToken($this->token);
    }

    public function doSelectUsers()
    {
        return User::where('id', '<>', \Auth::id())->get();
    }


    /**
     * @param $token
     * @return null
     */
    protected function userFromToken($token)
    {
        try {
            return JWTAuth::toUser($token);
        } catch (TokenExpiredException $e) {
            return null;
        } catch (TokenInvalidException $e) {
            return null;
        } catch (JWTAuthException $e) {
            return null;
        } catch (JWTException $e) {
            return null;
        }
    }

    /**
     * @param $user
     * @return mixed
     */
    protected function tokenForUser($user)
    {
        return JWTAuth::fromUser($user);
    }

    /**
     * Get the auth token from the request.
     *
     * @return string
     */
    protected function getTokenFromRequest()
    {
        try {
            return JWTAuth::getToken();
        } catch (JWTException $e) {
            return null;
        }
    }

    /**
     * @return null|string
     */
    public function getUser()
    {
        return $this->user;
    }

    /**
     * Get the auth token.
     */
    public function getToken()
    {
        return $this->token;
    }

    /**
     * Refresh the auth token.
     *
     * @return string
     */
    public function refreshToken()
    {
        return $this->token = $this->tokenForUser($this->getUser());
    }
}

?>