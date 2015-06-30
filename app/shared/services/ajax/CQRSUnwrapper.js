define([
    'app',
    'q'
], function (app, Q) {

    function CQRSUnwrapper() {
        this.deferred = Q.defer();
    }

    CQRSUnwrapper.unwrap = function (promise) {
        var self = CQRSUnwrapper.$newInstance();

        promise.then(
            function(res) {
                self.onSuccess(res);
            },
            function(err) {
                self.deferred.reject(err);
            }
        );

        return self.deferred.promise;
    };

    CQRSUnwrapper.prototype.onSuccess = function (res) {
        if( res.status === "ack" ){
            this.deferred.resolve(res);
        } else {
            this.deferred.reject(res);
        }
    };

    CQRSUnwrapper.$newInstance = function() {
        return new CQRSUnwrapper();
    };

    return CQRSUnwrapper;
});