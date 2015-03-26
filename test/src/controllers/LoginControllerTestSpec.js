describe('LoginController', function(){
	var LoginController = app.getController('controllers/LoginController');

	it("should call LoginController's configureView static method on instantiation", function () {
		var scope = {};
        var location = {};
		LoginController.configureView = jasmine.createSpy();
		var ctrl = new LoginController(scope, location);
		expect(LoginController.configureView).toHaveBeenCalledWith(scope, location);
	});

});