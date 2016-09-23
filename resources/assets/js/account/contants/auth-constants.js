/* Auth constants */

angular.module("account")

    .constant("AUTH_EVENTS", {
        loginSuccess: "auth-login-success",
        loginFailed: "auth-login-failed",
        signupSuccess: "auth-signup-success",
        signupFailed: "auth-signup-failed",
        logoutSuccess: "auth-logout-success",
        sessionTimeout: "auth-session-timeout",
        notAuthenticated: "auth-not-authenticated",
        notAuthorized: "auth-not-authorized",
        registered: "auth-registered"
    })
    .constant("AUTH_URLS", {
        login: "auth/signin",
        logout: "auth/signout",
        register: "auth/signup",
        updateProfile: "profile",
        updateAvatar: "profile/avatar",
        requestPasswordReset: "auth/recover-password",
        resetPassword: "auth/reset-password/token"
    })
    .constant("AUTH_HEADER_SESSION_ID", "Authorization");