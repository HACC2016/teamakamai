@extends('layouts.app')

@section('menu') @endsection

@section('content')

@endsection

@section('javascripts')
    @parent

    <script src="https://media.twiliocdn.com/sdk/js/common/v0.1/twilio-common.min.js"></script>
    <script src="https://media.twiliocdn.com/sdk/js/conversations/v0.13/twilio-conversations.min.js"></script>

    <script type="text/javascript">
        var token = '{!! $token !!}}';

        var accessManager = new Twilio.AccessManager(token);

        conversationsClient = new Twilio.Conversations.Client(accessManager);
        conversationsClient.listen().then(function(){
            alert('connected')
        }, function (error) {
            log('Could not connect to Twilio: ' + error.message);
            console.log(error);
        });

    </script>
@endsection