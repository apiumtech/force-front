define([
    'modules/account/addContact/AddContactModel',
    'modules/account/AccountService',
    'shared/services/ajax/AjaxService'
], function(AddContactModel, AccountService, AjaxService) {
    'use strict';

    describe('AddContactModel Test', function() {
        var sut, accountService, ajaxService;
        beforeEach(function(){
            accountService = mock(AccountService);
            ajaxService = mock(AjaxService);
            sut = new AddContactModel(ajaxService, accountService);
        });


        describe('getAccountData', function () {
            it("should call getAccountDetail from accountService", function () {
                sut.getAccountData();
                expect(sut.accountService.getDetails).toHaveBeenCalled();
            });
        });

    });
});