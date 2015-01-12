/**
 * Created by kevin on 10/27/14.
 */
app.registerService(function (container) {
    var Q = container.getFunction('q');

    function AjaxService(ajaxImpl) {
        this.ajaxImpl = ajaxImpl;
    }

    AjaxService.prototype.ensureSuccess = function (result) {
        if (result.success !== true) {
            throw new Error(result.error || JSON.stringify(result) + ".success is not true");
        }

        return result;
    };

    AjaxService.prototype.mapRequest = function (params) {
        var request = Object.create(Object.prototype, params);

        if (typeof request.data != "string") {
            request.data = JSON.stringify(request.data);
        }

        return request;
    };

    AjaxService.prototype.rawAjaxRequest = function (params) {
        return Q(this.ajaxImpl.ajax(this.mapRequest(params)));
    };

    AjaxService.prototype.ajax = function (params) {
        return this.rawAjaxRequest(params).then(this.ensureSuccess);
    };

    AjaxService.newInstance = function (ajaxImpl) {
        return Some(new AjaxService(ajaxImpl || $));
    };

    return {newInstance: AjaxService.newInstance};
});