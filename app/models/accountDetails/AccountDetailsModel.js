/**
 * Created by justin on 3/9/15.
 */
app.registerModel(function (container) {
    var AjaxService = container.getService("services/AjaxService");
    var Configuration = app.getService('Configuration');

    function AccountDetailsModel(ajaxService) {
        this.ajaxService = ajaxService;
    }

    AccountDetailsModel.prototype = Object.create(Object.prototype);

    AccountDetailsModel.prototype.getAccountDetail = function (id) {
        var self = this;
        var params = {
            url: Configuration.api.getAccount + '/' + id,
            type: 'get',
            contentType: 'application/json',
            accept: 'application/json'
        };

        return this.ajaxService.rawAjaxRequest(params).then(self.decorateAccountDetailData.bind(self));
    };

    AccountDetailsModel.prototype.decorateAccountDetailData = function (data) {
        // TODO: Fake for now
        return data;
    };

    AccountDetailsModel.newInstance = function (ajaxService) {
        ajaxService = ajaxService || AjaxService.newInstance().getOrElse(throwInstantiateException(AjaxService));

        return Some(new AccountDetailsModel(ajaxService));
    };

    return AccountDetailsModel;
});