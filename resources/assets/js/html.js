//HEAD 
(function(app) {
try { app = angular.module("html"); }
catch(err) { app = angular.module("html", []); }
app.run(["$templateCache", function($templateCache) {
"use strict";

$templateCache.put("account/views/profile.html","<div class=\"container\">\n" +
    "    <h1>Profile</h1>\n" +
    "\n" +
    "    <div class=\"card light-blue lighten-5\" ng-class=\"{hide: !success}\">\n" +
    "        <div class=\"card-content light-blue-text\">\n" +
    "            <p><strong>Success</strong> : Your profile got updated.</p>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"card red\" ng-class=\"{hide: !errors.length}\">\n" +
    "        <div class=\"card-content white-text\">\n" +
    "            <p><strong>DANGER</strong> : Fix the errors before continue</p>\n" +
    "            <div ng-repeat=\"item in errors\">{{ item[0] }}</div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <br/>\n" +
    "\n" +
    "    <form ng-submit=\"changeProfile(data);\">\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col m3 center-align\">\n" +
    "                <img style=\"border: solid 1px #dedede; padding: 2px;\"\n" +
    "                     ng-src=\"{{data.avatar ? 'avatars/' + data.avatar : '//placehold.it/150x150'}}\"\n" +
    "                     alt=\"{{data.first_name}} {{data.last_name}}\" class=\"circle responsive-img\">\n" +
    "\n" +
    "                <a class=\"btn\" plupload=\"fileUpload.url\"\n" +
    "                   plupload-options=\"fileUpload.options\"\n" +
    "                   plupload-callbacks=\"fileUpload.callbacks\" > Change </a>\n" +
    "\n" +
    "            </div>\n" +
    "            <div class=\"col m9\">\n" +
    "                <div class=\"row\">\n" +
    "                    <div class=\"input-field col s6\">\n" +
    "                        <input ng-model=\"data.first_name\" id=\"first_name\" type=\"text\"/>\n" +
    "                        <label for=\"first_name\">First Name</label>\n" +
    "                    </div>\n" +
    "                    <div class=\"input-field col s6\">\n" +
    "                        <input id=\"last_name\" ng-model=\"data.last_name\" type=\"text\"/>\n" +
    "                        <label for=\"last_name\">Last Name</label>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"input-field  \">\n" +
    "                    <input autocomplete=\"off\" ng-model=\"data.email\" id=\"email\" type=\"text\"/>\n" +
    "                    <label for=\"email\">E-mail</label>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"row\">\n" +
    "                    <div class=\"input-field col s6\">\n" +
    "                        <input autocomplete=\"off\" ng-model=\"data.password\" id=\"password\" type=\"password\"/>\n" +
    "                        <label for=\"password\">Password</label>\n" +
    "                    </div>\n" +
    "                    <div class=\"input-field col s6\">\n" +
    "                        <input autocomplete=\"off\" ng-model=\"password_confirmation\" id=\"password_confirmation\"\n" +
    "                               type=\"password\"/>\n" +
    "                        <label for=\"password_confirmation\">Password confirmation</label>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "                <div class=\"center-align\">\n" +
    "                    <button class=\"btn waves-effect waves-light\" type=\"submit\">\n" +
    "                        Save profile\n" +
    "                    </button>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </form>\n" +
    "</div>")

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
    "        <div class=\"card \">\n" +
    "            <div class=\"card-image\">\n" +
    "                <img ng-src=\"{{'avatars/' + item.avatar}}\" alt=\"{{item.name}}\" />\n" +
    "            </div>\n" +
    "            <div class=\"card-action center-align teal\">\n" +
    "                <a class=\"btn-floating waves-effect waves-light green\" ng-click=\"item.isActive ? call(item.client_token) : ''\" ng-disabled=\"!item.isActive\"><i class=\"fa fa-phone\" aria-hidden=\"true\"></i></a>\n" +
    "                <div class=\"white-text\">{{item.first_name}} {{item.last_name}}</div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "<div class=\"clearfix\"></div>")

$templateCache.put("account/views/auth/login.html","<div class=\"container\">\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col m6 offset-m3\">\n" +
    "\n" +
    "            <h3 class=\"center-align orange-text\">Team Akamai</h3>\n" +
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
    "            <h3 class=\"center-align orange-text\">Team Akamai</h3>\n" +
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
    "            <h3 class=\"center-align orange-text\">Team Akamai</h3>\n" +
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
    "            <h3 class=\"center-align orange-text\">Team Akamai</h3>\n" +
    "            <div class=\"z-depth-1 grey lighten-4 row\" style=\" padding: 32px 48px 0px 48px; border: 1px solid #EEE;\">\n" +
    "\n" +
    "                <form ng-submit=\"register(signupData)\" class=\"col s12\" method=\"post\">\n" +
    "                    <div class='row'>\n" +
    "                        <div class='input-field col s6'>\n" +
    "                            <input ng-model=\"signupData.first_name\" class='validate' type='text' name='firstname' id='firstname'/>\n" +
    "                            <label for='firstname'>Firstname</label>\n" +
    "                        </div>\n" +
    "                        <div class='input-field col s6'>\n" +
    "                            <input ng-model=\"signupData.last_name\" class='validate' type='text' name='lastname' id='lastname'/>\n" +
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