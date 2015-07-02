/**
 * Created by apium on 6/11/15.
 */
define([
    'shared/services/ajax/AuthAjaxService',
    'shared/services/ajax/FakeAjaxService',
    'config'
], function (AuthAjaxService, FakeAjaxService, Configuration) {

    function AccountService(authAjaxService, fakeAjaxService) {
        this.authAjaxService = authAjaxService || AuthAjaxService._diResolve();
        this.fakeAjaxService = fakeAjaxService || FakeAjaxService._diResolve();
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

        return self.authAjaxService.rawAjaxRequest(params);
    };

    AccountService.prototype.decorateAccountDetailData = function (data) {
        // TODO: Fake for now
        return data;
    };

    return AccountService;
});