//HEAD 
(function(app) {
try { app = angular.module("html"); }
catch(err) { app = angular.module("html", []); }
app.run(["$templateCache", function($templateCache) {
"use strict";

$templateCache.put("users/list.html","<div class=\"row\">\n" +
    "    <div ng-repeat=\"item in items\" class=\"col-md-3 col-sm-6 col-xs-6\">\n" +
    "        <div class=\"text-center\">\n" +
    "            <p><img class=\"img-circle\"\n" +
    "                    ng-src=\"//placeimg.com/150/150/people?id={{item.id}}\"/></p>\n" +
    "            <p>{{ item.name }}</p>\n" +
    "            {{item.email}}\n" +
    "        </div>\n" +
    "        <div class=\"text-center\">\n" +
    "            <div class=\"btn-group\">\n" +
    "                <a ng-click=\"call(item.id)\" href=\"#\"\n" +
    "                   class=\"btn btn-xs btn-success\"> <i class=\" fa fa-phone\"></i> Call </a>\n" +
    "                <a href=\"#eye\" class=\"btn btn-xs btn-warning\"><i class=\" fa fa-eye\"></i>\n" +
    "                    Details </a>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>")
}]);
})();