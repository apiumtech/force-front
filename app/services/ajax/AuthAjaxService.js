/**
 * Created by kevin on 10/28/14.
 */
app.registerService(function (container) {
    var DelegateAjaxService = container.getService('services/AjaxService');

    function AuthAjaxService(underlying) {
        this.underlyingAjaxService = underlying;
    }

    AuthAjaxService.prototype.ajax = function (params) {
        return this.underlyingAjaxService.ajax(params);
    };

    AuthAjaxService.newInstance = function ($underlyingAjaxService) {
      return Some($underlyingAjaxService || new DelegateAjaxService());
    };

    return AuthAjaxService;
});