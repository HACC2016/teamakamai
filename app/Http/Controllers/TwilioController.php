<?php

namespace telecare\Http\Controllers;

require_once base_path('vendor/twilio/sdk/Services/Twilio.php');

use Illuminate\Http\Request;

use telecare\Http\Requests;

class TwilioController extends Controller
{
    public function __construct(){
        $this->middleware('auth');
    }

    public function callAction($method, $parameters){

        $token = new \Services_Twilio_AccessToken(
            config('twilio.ID'),
            config('twilio.API'),
            config('twilio.API_KEY'),
            3600,
            \Auth::user()->client_token
        );

        // Grant access to Conversations
        $grant = new \Services_Twilio_Auth_ConversationsGrant();
        $grant->setConfigurationProfileSid(config('twilio.CONFIGURATION_ID'));
        $token->addGrant($grant);


        return view('call', [
            'token'=>$token->toJWT()
        ]);
    }
}
