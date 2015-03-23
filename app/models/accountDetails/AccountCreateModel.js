/**
 * Created by justin on 3/20/15.
 */
app.registerModel(function (container) {
    var AjaxService = container.getService("services/AjaxService");
    var AccountService = container.getService("services/AccountService");
    var Configuration = app.getService('Configuration');


    function AccountCreateModel(ajaxService, uploadService) {
        AccountService.call(this, ajaxService);
        this.uploadService = uploadService;
    }

    AccountCreateModel.prototype = Object.create(AccountService.prototype, {});

    AccountCreateModel.prototype.uploadFile = function (file) {
        var $upload = this.uploadService;
        var self = this;

        return $upload.upload({
            url: '/upload',
            method: 'POST',
            file: file
        }).then(self.decorateResponseData.bind(self));
    };

    AccountCreateModel.prototype.decorateResponseData = function (response) {
        return response.data;
    };

    AccountCreateModel.prototype.createAccount = function (model) {
        var self = this;
        var params = {
            url: Configuration.api.createAccount,
            type: 'post',
            contentType: 'application/json',
            accept: 'application/json',
            data: model
        };

        return self.ajaxService.rawAjaxRequest(params);
    };

    AccountCreateModel.newInstance = function (uploadService, ajaxService) {
        assertNotNull('uploadService', uploadService);
        ajaxService = ajaxService || AjaxService.newInstance().getOrElse(throwInstantiateException(AjaxService));

        return Some(new AccountCreateModel(ajaxService, uploadService));
    };

    return AccountCreateModel;
});