//HEAD 
(function(app) {
try { app = angular.module("html"); }
catch(err) { app = angular.module("html", []); }
app.run(["$templateCache", function($templateCache) {
"use strict";

$templateCache.put("app/views/home.html","<div class=\"section no-pad-bot\" id=\"index-banner\">\n" +
    "    <div class=\"container\">\n" +
    "        <h2 class=\"header orange-text\">Contacts</h2>\n" +
    "    </div>\n" +
    "</div>\n" +
    "<div class=\"container\">\n" +
    "    <div users-list></div>\n" +
    "</div>")

$templateCache.put("users/views/list.html","<div class=\"video-container\" ng-class=\"{hidden: !inACall}\">\n" +
    "    <div ng-show=\"!hidePreview\" class=\"card local-media\"></div>\n" +
    "    <div class=\"card card-content remote-media\">\n" +
    "    </div>\n" +
    "</div>\n" +
    "<div class=\"contacts\" ng-class=\"{active: inACall}\">\n" +
    "    <input type=\"search\" ng-model=\"search\" placeholder=\"Filter\" />\n" +
    "    <div ng-repeat=\"item in items|orderBy:'-isActive'|filter:search\" class=\"item\" >\n" +
    "        <div class=\"card\">\n" +
    "            <div class=\"card-content row\">\n" +
    "                <div class=\"col s3\">\n" +
    "                    <img ng-src=\"{{item.avatar}}\" style=\"max-height: 40px;\" class=\"responsive-img\" />\n" +
    "                </div>\n" +
    "                <div class=\"col s9\">\n" +
    "                    <div class=\"card-title left\">\n" +
    "                        {{item.name}}\n" +
    "                    </div>\n" +
    "                    <a ng-class=\"{hide: !item.isActive}\" ng-click=\"call(item.client_token)\" class=\"right\" href=\"#\" ><i class=\"fa fa-phone fa-3x\" ></i></a>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "<div class=\"clearfix\"></div>")

$templateCache.put("account/views/auth/login.html","<div class=\"container\">\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col m6 offset-m3\">\n" +
    "\n" +
    "            <h3 class=\"center-align orange-text\">TEAM AKAMAI</h3>\n" +
    "            <div class=\"z-depth-1 grey lighten-4 row\" style=\" padding: 32px 48px 0px 48px; border: 1px solid #EEE;\">\n" +
    "\n" +
    "                <form ng-submit=\"login(submitData)\" class=\"col s12 4\" method=\"post\">\n" +
    "                    <div class='row'>\n" +
    "                        <div class='input-field col s12'>\n" +
    "                            <input ng-model=\"submitData.email\" class='validate' type='email' name='email' id='email'/>\n" +
    "                            <label for='email'>Enter your email</label>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class='row'>\n" +
    "                        <div class='input-field col s12'>\n" +
    "                            <input ng-model=\"submitData.password\" class='validate' type='password' name='password' id='password'/>\n" +
    "                            <label for='password'>Enter your password</label>\n" +
    "                        </div>\n" +
    "                        <label style='float: right;'>\n" +
    "                            <a ui-sref=\"account:recover\"  class='pink-text' href='#!'><b>Forgot Password?</b></a>\n" +
    "                        </label>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <br/>\n" +
    "\n" +
    "                    <div class=\"center-align\">\n" +
    "                        <div class='row'>\n" +
    "                            <button type='submit' name='btn_login' class='col s12 btn btn-large waves-effect indigo'>Login\n" +
    "                            </button>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </form>\n" +
    "            </div>\n" +
    "\n" +
    "            <a href=\"#!\" ui-sref=\"account:signup\">Register</a>\n" +
    "\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "")

$templateCache.put("account/views/auth/recover.html","<div class=\"container\">\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col m6 offset-m3\">\n" +
    "\n" +
    "            <h3 class=\"center-align orange-text\">TEAM AKAMAI</h3>\n" +
    "            <div class=\"z-depth-1 grey lighten-4 row\" style=\" padding: 32px 48px 0px 48px; border: 1px solid #EEE;\">\n" +
    "\n" +
    "                <form ng-submit=\"requestPasswordReset(submitData)\" class=\"col s12 4\" method=\"post\">\n" +
    "                    <div class='row'>\n" +
    "                        <div class='input-field col s12'>\n" +
    "                            <input ng-model=\"submitData.email\" class='validate' type='email' name='email' id='email'/>\n" +
    "                            <label for='email'>Enter your email</label>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    <br/>\n" +
    "\n" +
    "                    <div class=\"center-align\">\n" +
    "                        <div class='row'>\n" +
    "                            <button type='submit' name='btn_login' class='col s12 btn btn-large waves-effect indigo'>Recover password\n" +
    "                            </button>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </form>\n" +
    "            </div>\n" +
    "\n" +
    "            <a href=\"#!\" ui-sref=\"account:login\">Login</a>\n" +
    "\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "")

$templateCache.put("account/views/auth/reset.html","<div class=\"container\">\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col m6 offset-m3\">\n" +
    "\n" +
    "            <h3 class=\"center-align orange-text\">TEAM AKAMAI</h3>\n" +
    "            <div class=\"z-depth-1 grey lighten-4 row\" style=\" padding: 32px 48px 0px 48px; border: 1px solid #EEE;\">\n" +
    "\n" +
    "                <form ng-submit=\"passwordReset(submitData)\" class=\"col s12 4\" method=\"post\">\n" +
    "\n" +
    "                    <div class='input-field'>\n" +
    "                        <input ng-model=\"submitData.email\" type='email' name='email' id='email'/>\n" +
    "                        <label for='email'>Enter your e-mail</label>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class='input-field'>\n" +
    "                        <input ng-model=\"submitData.password\" type='password' name='password' id='password'/>\n" +
    "                        <label for='password'>Enter your new password</label>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class='input-field'>\n" +
    "                        <input ng-model=\"submitData.password_confirmation\" type='password' name='password_confirmation' id='password_confirmation'/>\n" +
    "                        <label for='password_confirmation'>Confirm your password</label>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"center-align\">\n" +
    "                        <div class='row'>\n" +
    "                            <button type='submit' name='btn_login' class='col s12 btn btn-large waves-effect indigo'>Recover password\n" +
    "                            </button>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </form>\n" +
    "            </div>\n" +
    "\n" +
    "            <a href=\"#!\" ui-sref=\"account:login\">Login</a>\n" +
    "\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "")

$templateCache.put("account/views/auth/signup.html","<div class=\"container\">\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col m6 offset-m3\">\n" +
    "            <h3 class=\"center-align orange-text\">TEAM AKAMAI</h3>\n" +
    "            <div class=\"z-depth-1 grey lighten-4 row\" style=\" padding: 32px 48px 0px 48px; border: 1px solid #EEE;\">\n" +
    "\n" +
    "                <form ng-submit=\"register(signupData)\" class=\"col s12\" method=\"post\">\n" +
    "                    <div class='row'>\n" +
    "                        <div class='input-field col s6'>\n" +
    "                            <input ng-model=\"signupData.firstname\" class='validate' type='text' name='firstname' id='firstname'/>\n" +
    "                            <label for='firstname'>Firstname</label>\n" +
    "                        </div>\n" +
    "                        <div class='input-field col s6'>\n" +
    "                            <input ng-model=\"signupData.lastname\" class='validate' type='text' name='lastname' id='lastname'/>\n" +
    "                            <label for='lastname'>Lastname</label>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class='row'>\n" +
    "                        <div class='input-field col s12'>\n" +
    "                            <input autocomplete=\"off\" ng-model=\"signupData.email\" class='validate' type='email' name='email' id='email'/>\n" +
    "                            <label for='email'>Enter your email</label>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class='row'>\n" +
    "                        <div class='input-field col s6'>\n" +
    "                            <input autocomplete=\"off\" ng-model=\"signupData.password\" class='validate' type='password' name='password' id='password'/>\n" +
    "                            <label for='password'>Enter your password</label>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class='input-field col s6'>\n" +
    "                            <input autocomplete=\"off\" ng-model=\"signupData.password_confirmation\" class='validate' type='password' name='password_confirmation' id='password_confirmation'/>\n" +
    "                            <label for='password_confirmation'>Confirm your password</label>\n" +
    "                        </div>\n" +
    "\n" +
    "\n" +
    "                        <label style='float: right;'>\n" +
    "                            <a ui-sref=\"account:recover\" class='pink-text' href='#!'><b>Forgot Password?</b></a>\n" +
    "                        </label>\n" +
    "                    </div>\n" +
    "\n" +
    "\n" +
    "                    <br/>\n" +
    "\n" +
    "                    <div class=\"center-align\">\n" +
    "                        <div class='row'>\n" +
    "                            <button type='submit' name='btn_login' class='col s12 btn btn-large waves-effect blue'>Signup\n" +
    "                            </button>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </form>\n" +
    "            </div>\n" +
    "            <a href=\"#!\" ui-sref=\"account:login\">Login</a>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "")
}]);
})();