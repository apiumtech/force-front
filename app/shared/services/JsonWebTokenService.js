define([
], function () {

    function JsonWebTokenService(token) {
        if( !token ){
            throw new Error("No token was provided");
        }
        this._token = token;
    }

    JsonWebTokenService.prototype.getPayload = function(){
        var parts = this._token.split(".");
        if(parts.length != 3){
            throw new Error("Invalid token");
        }
        var payload = parts[1];
        payload = window.atob(payload);
        return JSON.parse(payload);
    };

    return JsonWebTokenService;
});