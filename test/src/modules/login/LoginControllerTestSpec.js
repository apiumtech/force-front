define([
	'modules/login/LoginController'
],function(LoginController){
	describe('LoginController', function(){
		it("should call LoginController's configureView static method on instantiation", function () {
			var scope = {};
			var location = {};
			LoginController.configureView = jasmine.createSpy();
			var ctrl = new LoginController(scope, location);
			expect(LoginController.configureView).toHaveBeenCalledWith(scope, location);
		});
	});
});