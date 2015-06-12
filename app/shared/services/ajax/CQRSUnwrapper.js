define([
    'app',
    'q'
], function (app, Q) {

    function CQRSUnwrapper() {
        this.deferred = null;
    }

    CQRSUnwrapper.prototype.unwrap = function (promise) {
        this.deferred = Q.defer();

        promise.then(
            this.onSuccess.bind(this),
            function(err) {
                this.deferred.reject(err);
            }
        );

        return this.deferred.promise;
    };

    CQRSUnwrapper.prototype.onSuccess = function (res) {
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