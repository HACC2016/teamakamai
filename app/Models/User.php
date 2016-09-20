<?php
namespace telecare\Models;
require_once base_path('vendor/twilio/sdk/Services/Twilio.php');

use \Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;

use Tymon\JWTAuth\Exceptions\JWTAuthException;


/**
 * Class User
 * @package telecare\Models
 */
class User extends Authenticatable implements JWTSubject
{
    /**
     * @var $twilio
     * @var string $token
     * @var null|string $user
     */
    private $twilio, $token, $user;
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'client_token',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];


    /**
     * @return bool
     */
    public function isOnline()
    {
        return !!$this->client_token;
    }

    /**
     * @return null|string
     */
    public function getTwilioCode($identity)
    {
        if ($this->twilio) {
            return $this->twilio;
        }
        $token = new \Services_Twilio_AccessToken(
            config('twilio.ID'),
            config('twilio.API'),
            config('twilio.API_KEY'),
            3600,
            $identity
        );

        // Grant access to Conversations
        $grant = new \Services_Twilio_Auth_ConversationsGrant();
        $grant->setConfigurationProfileSid(config('twilio.CONFIGURATION_ID'));
        $token->addGrant($grant);

        $this->twilio = $token->toJWT();

        return $this->getTwilioCode($identity);
    }

    /**
     * Get the identifier that will be stored in the subject claim of the JWT
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }
}
