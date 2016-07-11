@extends('layouts.app')

@section('menu') @endsection

@section('content')
    <div style="background: #000; width: 100%; height: 100%; min-height: 100%; position: relative;" class="">
        <div id="localMedia"
             style="width: 100px; height: 100px; bottom: 5px; right: 5px; position: absolute; z-index: 2; border: 1px solid #fff; ">
            &nbsp;</div>
        <div id="remoteMedia" style="width: 100%; height:100%; position: absolute; z-index: 1; top: 0;left: 0; ">
            &nbsp;</div>
    </div>

@endsection

@section('javascripts')
    @parent

    <script src="https://media.twiliocdn.com/sdk/js/common/v0.1/twilio-common.min.js"></script>
    <script src="https://media.twiliocdn.com/sdk/js/conversations/v0.13/twilio-conversations.min.js"></script>

    <script type="text/javascript">
        var token = '{!! $token !!}}';

        var accessManager = new Twilio.AccessManager(token);

        conversationsClient = new Twilio.Conversations.Client(accessManager);
        conversationsClient.listen().then(function () {
            console.log('listening')
        }, function (error) {
            console.log('error', error);
        });


        previewMedia = new Twilio.Conversations.LocalMedia();
        Twilio.Conversations.getUserMedia().then(
                function (mediaStream) {
                    previewMedia.addStream(mediaStream);
                    previewMedia.attach('#localMedia');
                },
                function (error) {
                    console.error('Unable to access local media', error);
                });


    </script>
@endsection