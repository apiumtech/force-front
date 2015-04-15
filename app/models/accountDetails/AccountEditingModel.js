/**
 * Created by justin on 3/20/15.
 */
app.registerModel(function (container) {
    var AjaxService = container.getService("services/AjaxService");
    var AccountService = container.getService("services/AccountService");
    var Configuration = app.getService('Configuration');


    function AccountEditingModel(ajaxService, uploadService) {
        AccountService.call(this, ajaxService);
        this.uploadService = uploadService;
    }

    AccountEditingModel.prototype = Object.create(AccountService.prototype, {});

    AccountEditingModel.prototype.uploadFile = function (file) {
        var $upload = this.uploadService;
        var self = this;

        return $upload.upload({
            url: Configuration.api.uploadFile,
            method: 'POST',
            file: file
        }).then(self.decorateResponseData.bind(self), function (error) {
            return error;
        });
    };

    AccountEditingModel.prototype.decorateResponseData = function (response) {
        return response.data;
    };

    AccountEditingModel.newInstance = function (uploadService, ajaxService) {
        assertNotNull('uploadService', uploadService);
        ajaxService = ajaxService || AjaxService.newInstance().getOrElse(throwInstantiateException(AjaxService));

        return Some(new AccountEditingModel(ajaxService, uploadService));
    };

    return AccountEditingModel;
});