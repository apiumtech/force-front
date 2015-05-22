/**
 * Created by joanllenas 03/31/15.
 */

define([
    'modules/contact/filters/ContactFilterController'
], function (ContactFilterController) {
    'use strict';

    describe('ContactFilterController', function(){


        it("should call ContactFilterController's configureView static method on instantiation", function () {
            var scope = {};
            ContactFilterController.configureView = jasmine.createSpy();
            var ctrl = new ContactFilterController(scope);
            expect(ContactFilterController.configureView).toHaveBeenCalledWith(scope);
        });

    });
});
