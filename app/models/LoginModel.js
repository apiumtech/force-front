/**
 * Created by joanllenas on 03/16/15.
 */

app.registerModel(function (container) {
    var AjaxService = container.getService("services/AjaxService");
    var EntityService = container.getService("services/config/EntityService");
    var StorageService = container.getService("services/StorageService");
    var Configuration = container.getService("Configuration");
    var sha1 = container.getFunction('crypto.SHA1');
    var Q = container.getFunction('q');

    function LoginModel(ajaxService, entityService, storage, configuration) {
        this.ajaxService = ajaxService;
        this.entityService = entityService;
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

        var self = this;
        var deferred = Q.defer();
        this.ajaxService.rawAjaxRequest(params).then(
            function(jqXHR) {
                self.storeConfig(jqXHR.data);
                deferred.resolve(jqXHR)
            },
            function(jqXHR) {deferred.reject(jqXHR)}
        );
        return deferred.promise;
    };

    LoginModel.prototype.storeConfig = function(configObject) {
        this.entityService.storeEntities(configObject);
    };


    LoginModel.newInstance = function (ajaxService, entityService, storage, configuration) {
        var _ajaxService = ajaxService || AjaxService.newInstance().getOrElse(throwInstantiateException(AjaxService));
        var _entityService = entityService || EntityService.newInstance().getOrElse(throwInstantiateException(EntityService));
        var _storage = storage || StorageService.newInstance().getOrElse(throwInstantiateException(StorageService));
        var _configuration = configuration || Configuration;
        return Some(new LoginModel(_ajaxService, _entityService, _storage, _configuration));
    };


    return {newInstance: LoginModel.newInstance};
});
