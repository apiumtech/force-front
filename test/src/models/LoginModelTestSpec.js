/**
 * Created by joanllenas 03/17/15.
 *
 */

describe('LoginModel', function(){
	var LoginModel = app.getModel('models/LoginModel');
    var model, loginUser, loginPass, UserKey;

	beforeEach(function() {
		model = LoginModel.newInstance().getOrElse(throwInstantiateException(LoginModel));
        loginUser = "bruno_test@gmail.com";
        loginPass = "dimarts1*";
        UserKey = "7b414ab1746611d76c64d0b55a6cf5aaaaf865b3";
	});

    it("should calculate the correct UserKey", function(){
        expect(model.calculateUserKey(loginUser, loginPass))
            .toEqual(UserKey);
    });

    it("should make a parametrized call to ajaxService's rawAjaxRequest() method on login()", function(){

        spyOn(model.ajaxService, 'rawAjaxRequest').and.callThrough();

        model.login(loginUser, loginPass);

        expect(model.ajaxService.rawAjaxRequest.calls.count()).toEqual(1);
        var argsForAjaxServiceCall = model.ajaxService.rawAjaxRequest.calls.argsFor(0);

        var credentials = argsForAjaxServiceCall[0];

        expect(credentials.headers).toBeDefined();
        expect(credentials.headers.user).toBeDefined();
        expect(credentials.headers.userKey).toBeDefined();

        expect(credentials.headers.user).toEqual(loginUser);
        expect(credentials.headers.userKey).toEqual( model.calculateUserKey(loginUser, loginPass) );
    });

    it("should call storeConfig() on login success", function(){
        var dummy = {
            token: "hello token",
            config: "hello token"
        };
        var dummyJSON = JSON.stringify(dummy);

        spyOn(model, 'storeConfig');
        spyOn(model.ajaxService, 'rawAjaxRequest').and.returnValue(exerciseFakeOkPromiseWithArg(dummyJSON));
        model.login(loginUser, loginPass);
        expect(model.storeConfig).toHaveBeenCalledWith(dummy.config);
    });

    it("should store config's entity object on storeConfig()", function(){
        var accountEntity = "ok entity";
        var config_stub = {
            entities: {
                account: accountEntity
            }
        };
        model.storeConfig(config_stub);
        expect(model.entityService.getEntityByName('account')).toBe(accountEntity);
    });
});