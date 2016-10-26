/* Account constants */

angular.module("account")
  .constant("ACCOUNT_ANALYTICS_EVENTS", {
    signup:                 "account:signup",
    activate:               "account:activate",
    login:                  "account:login",
    requestPasswordReset:   "account:requestPasswordReset",
    resetPassword:          "account:resetPassword"
  });