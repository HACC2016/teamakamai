@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row">
            <div class="col-md-10 col-md-offset-1">
                <div class="panel panel-info">
                    <div class="panel-heading">Contacts</div>
                    <div class="panel-body" users-list>

                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-10 col-md-offset-1">
                <div class="panel panel-default">
                    <div class="panel-heading">conversation</div>
                    <div class="panel-body" style="position: relative; height: 450px; width: 100%; background: #e8e8e8;">
                        <div id="remote-media" style="position: absolute; z-index: 1; top: 0; left:0; width: 100%; height:100%;"></div>
                        <div id="local-media" style="position: absolute; z-index: 2; bottom: 5px; right: 5px; width: 200px; height: 200px; overflow: hidden; border: solid 1px #262626;"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>

@endsection
