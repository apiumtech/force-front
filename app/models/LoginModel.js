/**
 * Created by joanllenas on 03/16/15.
 */

app.registerModel(function (container) {
    var AjaxService = container.getService("services/AjaxService");
    var StorageService = container.getService("services/StorageService");
    var Configuration = container.getService("Configuration");
    var sha1 = container.getFunction('crypto.SHA1');

    function LoginModel(ajaxService, storage, configuration) {
        this.ajaxService = ajaxService;
        this.storage = storage;
        this.configuration =  configuration;
    }

    LoginModel.prototype.calculateUserKey = function (loginUser, loginPass) {
        return Crypto.SHA1( loginUser + '|' + loginPass );
    };


    LoginModel.prototype.login = function (loginUser, loginPassword) {
        var params = {
            url: this.configuration.api.authentication,
            type: 'POST',
            contentType: 'application/json',
            accept: 'application/json',
            headers: {
                user: loginUser,
                userKey: this.calculateUserKey(loginUser, loginPassword)
            }
        };
        return this.ajaxService.rawAjaxRequest(params);
    };


    LoginModel.newInstance = function (ajaxService, storage, configuration) {
        var _ajaxService = ajaxService || AjaxService.newInstance().getOrElse(throwInstantiateException(AjaxService));
        var _storage = storage || StorageService.newInstance().getOrElse(throwInstantiateException(StorageService));
        var _configuration = configuration || Configuration;
        return Some(new LoginModel(_ajaxService, _storage, _configuration));
    };


    return {newInstance: LoginModel.newInstance};
});
