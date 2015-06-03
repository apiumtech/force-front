/**
 * Created by justin on 3/20/15.
 */
define([
    'shared/services/ajax/AjaxService',
    'shared/services/AccountService',
    'config'
], function (AjaxService, AccountService, Configuration) {

    function AccountEditingModel(ajaxService, uploadService) {
        AccountService.call(this, ajaxService);
        this.uploadService = uploadService;
    }

    AccountEditingModel.inherits(AccountService, {});

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
        ajaxService = ajaxService || AjaxService.newInstance();

        return new AccountEditingModel(ajaxService, uploadService);
    };

    return AccountEditingModel;
});