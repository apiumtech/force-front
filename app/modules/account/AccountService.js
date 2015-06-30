/**
 * Created by apium on 6/11/15.
 */
define([
    'shared/services/ajax/AjaxService',
    'shared/services/ajax/FakeAjaxService',
    'config'
], function (AjaxService, FakeAjaxService, Configuration) {

    function AccountService(ajaxService, fakeAjaxService) {
        this.ajaxService = ajaxService || new AjaxService();
        this.fakeAjaxService = fakeAjaxService || new FakeAjaxService();
    }

    AccountService.inherits(Object);

    AccountService.prototype.getAccountDetail = function (id) {
        var self = this;
        var params = {
            url: Configuration.api.getAccount.format(id),
            type: 'get',
            contentType: 'application/json',
            accept: 'application/json'
        };

        return self.ajaxService.rawAjaxRequest(params);
    };

    AccountService.prototype.decorateAccountDetailData = function (data) {
        // TODO: Fake for now
        return data;
    };

    return AccountService;
});