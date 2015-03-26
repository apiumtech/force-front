/**
 * Created by joanllenas 03/17/15.
 *
 */

describe('LoginModel', function(){
	var LoginModel = app.getModel('models/LoginModel');
    var model, ajaxService, loginUser, loginPass, UserKey;

	beforeEach(function() {
        ajaxService = {
            rawAjaxRequest: function(){}
        };
		model = LoginModel.newInstance(ajaxService).getOrElse(throwInstantiateException(LoginModel));
        loginUser = "bruno_test@gmail.com";
        loginPass = "dimarts1*";
        UserKey = "7b414ab1746611d76c64d0b55a6cf5aaaaf865b3";
	});

    it("should calculate the correct UserKey", function(){
        expect(model.calculateUserKey(loginUser, loginPass))
            .toEqual(UserKey);
    });

    it("should make a parametrized call to ajaxService's rawAjaxRequest() method on login()", function(){

        spyOn(ajaxService, 'rawAjaxRequest');

        model.login(loginUser, loginPass);

        expect(ajaxService.rawAjaxRequest.calls.count()).toEqual(1);
        var argsForAjaxServiceCall = ajaxService.rawAjaxRequest.calls.argsFor(0);

        var credentials = argsForAjaxServiceCall[0];

        expect(credentials.headers).toBeDefined();
        expect(credentials.headers.user).toBeDefined();
        expect(credentials.headers.userKey).toBeDefined();

        expect(credentials.headers.user).toEqual(loginUser);
        expect(credentials.headers.userKey).toEqual( model.calculateUserKey(loginUser, loginPass) );
    });
});