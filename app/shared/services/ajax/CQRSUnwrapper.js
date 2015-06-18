define([
    'app',
    'q'
], function (app, Q) {

    function CQRSUnwrapper() {
        this.deferred = null;
    }

    CQRSUnwrapper.prototype.unwrap = function (promise) {
        return promise;


        var self = this;
        self.deferred = Q.defer();

        promise.then(
            function(res) {
                console.log("success");
                self.onSuccess.bind(res)
            },
            function(err) {
                console.log("error");
                self.deferred.reject(err);
            }
        );

        return self.deferred.promise;
    };

    CQRSUnwrapper.prototype.onSuccess = function (res) {
        console.log("onSuccess " + res.status);
        if( res.status === "ack" ){
            this.deferred.resolve(res);
        } else {
            this.deferred.reject(res);
        }
    };

    CQRSUnwrapper.newInstance = function () {
        return new CQRSUnwrapper();
    };

    return CQRSUnwrapper;
});