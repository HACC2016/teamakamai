angular.module("app").constant("APP", {
    default: function(){
        return 'https://'+window.location.host+'/api'
    },
    api: {
        'local.telecare.us': 'https://local.telecare.us/api',
        'telecare.zapto.org': 'https://telecare.zapto.org/api',
        'dev.teamakamai.com': 'https://dev.teamakamai.com/api'
    },
    get: function () {
        return window.location.host in this.api ? this.api[window.location.host] : this.default();
    }
});