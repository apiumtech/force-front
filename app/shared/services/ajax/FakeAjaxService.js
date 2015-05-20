/**
 * Created by justin on 3/30/15.
 */

define([
    'q'
], function (Q) {

    function FakeAjaxService() {

    }

    FakeAjaxService.prototype.rawAjaxRequest = function (params) {
        var defer = Q.defer();

        setTimeout(function () {
            defer.resolve(params.result);
        }, 1000);

        return Q(defer.promise);
    };

    FakeAjaxService.newInstance = function () {
        return new FakeAjaxService();
    };

    return FakeAjaxService;
});