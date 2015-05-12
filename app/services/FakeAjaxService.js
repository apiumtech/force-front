/**
 * Created by justin on 3/30/15.
 */

app.registerService(function (container) {
    var Q = container.getFunction('q');

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