
angular.module("common").directive("ngDownload", function () {
    return {
	restrict: "A",
	scope: {
	    ngDownload: '=ngDownload'
	},
	link: function (scope, elem, attrs, ngModel) {

	    var callback = function (event)
	    {
		event.preventDefault();
		
		var hiddenIFrameID = 'ng.download',
			iframe = document.getElementById(hiddenIFrameID);
		if (iframe === null) {
		    iframe = document.createElement('iframe');
		    iframe.id = hiddenIFrameID;
		    iframe.style.display = 'none';
		    document.body.appendChild(iframe);
		}
		iframe.src = scope.ngDownload;
		
		return false;
	    }

	    elem.bind('click', callback);

	    return false;
	}
    };

});
