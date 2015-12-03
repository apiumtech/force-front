define([
    'app',
    'q'
], function (app, Q) {
    'use strict';

    function CQRSUnwrapper() {
        this.deferred = Q.defer();
        this.unwrapData = false;
    }

    CQRSUnwrapper.unwrap = function (promise) {
        var self = CQRSUnwrapper.$newInstance();
        return CQRSUnwrapper.___doUnwrap(self, promise);
    };

    CQRSUnwrapper.unwrapData = function (promise) {
        var self = CQRSUnwrapper.$newInstance();
        self.unwrapData = true;
        return CQRSUnwrapper.___doUnwrap(self, promise);
    };

    CQRSUnwrapper.___doUnwrap = function (self, promise) {
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
        if( res.success === true ){
            if(this.unwrapData){
                this.deferred.resolve(res.data);
            } else {
                this.deferred.resolve(res);
            }
        } else {
            this.deferred.reject(res);
        }
    };

    CQRSUnwrapper.$newInstance = function() {
        return new CQRSUnwrapper();
    };

    return CQRSUnwrapper;
});