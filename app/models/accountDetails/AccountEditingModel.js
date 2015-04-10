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
        }).then(self.decorateResponseData.bind(self), function (error) {
            return error;
        });
    };

    AccountCreateModel.prototype.decorateResponseData = function (response) {
        return response.data;
    };

    AccountCreateModel.newInstance = function (uploadService, ajaxService) {
        assertNotNull('uploadService', uploadService);
        ajaxService = ajaxService || AjaxService.newInstance().getOrElse(throwInstantiateException(AjaxService));

        return Some(new AccountCreateModel(ajaxService, uploadService));
    };

    return AccountCreateModel;
});