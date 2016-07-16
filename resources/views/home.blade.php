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
                                        <p><img class="img-circle"
                                                src="//placeimg.com/150/150/people?id={{$item->id}}"/></p>
                                        <p>{{ $item->name }}</p>
                                    </div>
                                    <div class="text-center">
                                        <div class="btn-group">
                                            <a data-call="{{$item->id}}" href="#"
                                               class="btn btn-xs btn-success {{$item->isOnline() || 1 ? '' : 'disabled'}}"> {!! $item->isOnline() || 1 ? '<i class=" fa fa-phone"></i> Call' : 'Offline' !!} </a>
                                            <a href="#eye" class="btn btn-xs btn-warning"><i class=" fa fa-eye"></i>
                                                Details </a>
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

    <div class="modal fade" tabindex="-1" role="dialog" id="conversation">
        <div class="modal-dialog">
            <div class="modal-content modal-lg">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                                aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title">CHAT WINDOW</h4>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-xs-6"><div id="remote-media"></div></div>
                        <div class="col-xs-6"><div id="local-media"></div></div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-dismiss="modal">END CALL</button>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->

@endsection
