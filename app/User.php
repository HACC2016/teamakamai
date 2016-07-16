<?php
namespace telecare;
require_once base_path('vendor/twilio/sdk/Services/Twilio.php');

use \Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    private $twilio;
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

    public function isOnline(){
        return !! $this->client_token;
    }

    public function getTwilioCode(){
        if($this->twilio){
            return $this->twilio;
        }
        $token = new \Services_Twilio_AccessToken(
            config('twilio.ID'),
            config('twilio.API'),
            config('twilio.API_KEY'),
            3600,
            \Auth::user()->id
        );

        // Grant access to Conversations
        $grant = new \Services_Twilio_Auth_ConversationsGrant();
        $grant->setConfigurationProfileSid(config('twilio.CONFIGURATION_ID'));
        $token->addGrant($grant);

        $this->twilio = $token->toJWT();

        return $this->getTwilioCode();
    }
}
