/**
 * Created by justin on 3/30/15.
 */

app.registerService(function (container) {
    var Q = container.getFunction('q');

    function FakeAjaxService() {

    }

    FakeAjaxService.prototype.rawAjaxRequest = function (params) {
        var defer = Q.defer();

        defer.resolve(params.result);

        return Q(defer.promise);
    };

    FakeAjaxService.newInstance = function () {
        return Some(new FakeAjaxService());
    };

    return FakeAjaxService;
});