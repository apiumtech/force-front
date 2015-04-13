/**
 * Created by joanllenas 03/31/15.
 */

describe('ContactFilterController', function(){
    var ContactFilterController = app.getController('controllers/contact/ContactFilterController');

    it("should call ContactFilterController's configureView static method on instantiation", function () {
        var scope = {};
        ContactFilterController.configureView = jasmine.createSpy();
        var ctrl = new ContactFilterController(scope);
        expect(ContactFilterController.configureView).toHaveBeenCalledWith(scope);
    });

});