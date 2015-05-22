/**
 * Created by joanllenas 03/31/15.
 */

define([
    'modules/contact/ContactController'
], function (ContactController) {
    'use strict';

    describe('ContactController', function () {

        it("should call ContactController's configureView static method on instantiation", function () {
            var scope = {};
            ContactController.configureView = jasmine.createSpy();
            var ctrl = new ContactController(scope);
            expect(ContactController.configureView).toHaveBeenCalledWith(scope);
        });

    });
});
