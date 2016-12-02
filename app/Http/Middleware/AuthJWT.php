<?php

namespace telecare\Http\Middleware;

use Closure;
use JWTAuth;
use Exception;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Http\Middleware\BaseMiddleware;


class AuthJWT extends BaseMiddleware
{
    public function handle($request, \Closure $next)
    {
        try {
            $newToken = $this->auth->setRequest($request)->parseToken()->refresh();
        } catch (TokenExpiredException $e) {
            return $this->respond('tymon.jwt.expired', 'token_expired', $e->getStatusCode(), [$e]);
        } catch (JWTException $e) {
            return $this->respond('tymon.jwt.invalid', 'token_invalid', $e->getStatusCode(), [$e]);
        }

        // ensure the new token is available as JWTAuth's local copy (accessible through getToken)
        $this->auth->setToken($newToken);

        // *NOW* we run the controller (or whatever this middleware wraps)
        $response = $next($request);

        // Attach the token to the response back to the client
        $response->headers->set('Authorization', $newToken);

        return $response;
    }
}
