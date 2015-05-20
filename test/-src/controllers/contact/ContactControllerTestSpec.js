/**
 * Created by joanllenas 03/31/15.
 */

describe('ContactController', function(){
    var ContactController = app.getController('controllers/contact/ContactController');

    it("should call ContactController's configureView static method on instantiation", function () {
        var scope = {};
        ContactController.configureView = jasmine.createSpy();
        var ctrl = new ContactController(scope);
        expect(ContactController.configureView).toHaveBeenCalledWith(scope);
    });

});