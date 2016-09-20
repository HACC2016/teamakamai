/* Base model */

angular.module("common").factory("BaseModel", function(restmod) {

    return restmod.mixin(function() {
        // this.disableRenaming();
    })
});
