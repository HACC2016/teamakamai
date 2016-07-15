@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-10 col-md-offset-1">
            <div class="panel panel-info">
                <div class="panel-heading">Contacts</div>
                <div class="panel-body">
                    <div class="row">
                        @foreach($users as $item)
                            <div class="col-md-3 col-sm-6 col-xs-6">
                                <div class="text-center">
                                    <p><img class="img-circle" src="//lorempixel.com/140/140/people/?id={{$item->id}}" /></p>

                                    <p>{{ $item->name }}</p>
                                </div>
                                <div class="text-center">
                                    <div class="btn-group">
                                        <a data-call="{{$item->client_token}}" href="#call" class="btn btn-xs btn-success {{$item->isOnline() ? '' : 'disabled'}}"> {!! $item->isOnline() ? '<i class=" fa fa-phone"></i> Call' : 'Offline' !!} </a>
                                        <a href="#eye" class="btn btn-xs btn-warning"><i class=" fa fa-eye"></i> Details </a>
                                    </div>
                                </div>
                            </div>
                        @endforeach
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
