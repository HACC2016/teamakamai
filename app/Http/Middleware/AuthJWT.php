<?php

namespace telecare\Http\Middleware;

use Closure;
use JWTAuth;
use Exception;
use Tymon\JWTAuth\Exceptions\JWTException;


class AuthJWT
{

    public function handle($request, Closure $next, $guard = null)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
            $token = JWTAuth::refresh(JWTAuth::getToken());

        } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
            return response()->json(['error' => 'Token is Invalid'], 403);
        } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
            return response()->json(['error' => 'Token is Expired'], 419);
        } catch (JWTException $e) {
            return response()->json(['error' => $e->getMessage()], 403);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage(),], 403);
        }


        $response = $next($request);
        $response->headers->add(['Refresh-Token'=>$token]);
        return $response;
    }
}
