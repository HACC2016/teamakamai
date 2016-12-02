var users = {
    _data: [],
    findPOS: function(client){
        for(var pos in this._data){
            if(this._data[pos].id == client.id) return pos;
        }
        return false;
    },
    deleteClient: function(client){
        var pos = this.findPOS(client);
        if(pos !== false) this._data.splice(pos, 1);
        return this;
    },
    getData: function(){
        return this._data;
    },
    addClient: function(client){
        this.deleteClient(client)
            ._data.push(client);
        return this;
    }
};

module.exports = users;