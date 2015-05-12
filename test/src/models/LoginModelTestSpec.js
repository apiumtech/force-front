/**
 * Created by joanllenas 03/17/15.
 *
 */

describe('LoginModel', function(){
	var LoginModel = app.getModel('models/LoginModel');
    var model, loginUser, loginPass, UserKey;

	beforeEach(function() {
		model = LoginModel.newInstance();
        loginUser = "bruno_test@gmail.com";
        loginPass = "dimarts1*";
        UserKey = "7b414ab1746611d76c64d0b55a6cf5aaaaf865b3";
	});

    it("should calculate the correct UserKey", function(){
        expect(model.calculateUserKey(loginUser, loginPass))
            .toEqual(UserKey);
    });

    it("should reject promise on login error", function(done){
        spyOn(model.ajaxService, 'rawAjaxRequest').and.returnValue( exerciseFakeKoPromiseWithArg("an error") );
        model.login(loginUser, loginPass).then(
            function(){},
            function(err){
                expect(err).toBe("an error");
                done();
            }
        );
    });

    it("should make a parametrized call to ajaxService's rawAjaxRequest() method on login()", function(){
        spyOn(model.ajaxService, 'rawAjaxRequest').and.returnValue( exerciseFakePromise() );

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

    it("should store entity and token on login success", function(){
        var dummy = {
            token: "fake token",
            config: "fake config"
        };


        spyOn(model, 'storeConfig');
        spyOn(model, 'storeToken');
        spyOn(model.ajaxService, 'rawAjaxRequest').and.returnValue(exerciseFakeOkPromiseWithArg(dummy));
        model.login(loginUser, loginPass);
        expect(model.storeConfig).toHaveBeenCalledWith(dummy.config);
        expect(model.storeToken).toHaveBeenCalledWith(dummy.token);
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

    it("should store token on storeToken()", function(){
        model.storeToken("the token");
        expect(model.storage.retrieve('token')).toBe("the token");

        window.localStorage.clear();
    });
});