/**
 * Created by justin on 3/4/15.
 */
app.registerModel(function (container) {
    var Configuration = container.getService('Configuration');
    var AjaxService = container.getService("services/AjaxService");

    function AccountModel(ajaxService) {
        this.ajaxService = ajaxService;
    }

    AccountModel.prototype.toggleFollow = function (record) {
        // TODO: replace $loki with the record identifer
        var params = {
            url: Configuration.api.toggleFollow + "/" + record.$loki,
            type: 'post',
            contentType: 'application/json',
            accept: 'application/json'
        };

        return this.ajaxService.rawAjaxRequest(params);
    };

    AccountModel.newInstance = function (ajaxService) {
        var _ajaxService = ajaxService || AjaxService.newInstance().getOrElse(throwInstantiateException(AjaxService));
        return Some(new AccountModel(_ajaxService));
    };

    return AccountModel;
});
