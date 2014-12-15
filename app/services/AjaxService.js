/**
 * Created by kevin on 10/27/14.
 */
app.registerService(function (container) {
    var Q = container.getFunction('q');

    function AjaxService() {

    }

    AjaxService.prototype.ajax = function (params) {
        return Q($.ajax(params));
    };

    AjaxService.newInstance = function () {
        return Some(new AjaxService());
    };

    return {newInstance: AjaxService.newInstance};
});