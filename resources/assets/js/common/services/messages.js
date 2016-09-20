/* User service */

angular.module("common").service("MessagesService", function () {

    this.messages = {};
    
    this.set = function(key, value)
    {
        this.messages[key] = value;        
        return this;
    }
    
    this.get = function(key, defaultValue)
    {
        return this.messages[key] || defaultValue;
    }
    this.destroy = function(){
        this.messages = {};        
        return this;
    }
    
    this.getAll = function(){
        return this.messages;
    }
    this.remove = function(key)
    {
        delete this.messages[key];
        
        return this;
    }
});
