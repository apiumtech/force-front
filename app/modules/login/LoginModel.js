/**
 * Created by joanllenas on 03/16/15.
 */

define([
    'shared/services/ajax/AjaxService',
    'shared/services/config/EntityService',
    'shared/services/StorageService',
    'config',
    'crypto.SHA1',
    'q'
], function (AjaxService, EntityService, StorageService, Configuration, sha1, Q) {

    function LoginModel(ajaxService, entityService, storage, configuration) {
        this.ajaxService = ajaxService;
        this.entityService = entityService;
        this.storage = storage;
        this.configuration = configuration;
    }

    LoginModel.prototype.calculateUserKey = function (loginUser, loginPass) {
        return Crypto.SHA1(loginUser + '|' + loginPass);
    };


    LoginModel.prototype.login = function (loginUser, loginPassword) {
        var params = {
            url: this.configuration.api.authentication,
            type: 'POST',
            contentType: 'application/json',
            accept: 'application/json',
            dataType: 'json',
            headers: {
                user: loginUser,
                userKey: this.calculateUserKey(loginUser, loginPassword)
            }
        };

        var self = this;
        var deferred = Q.defer();
        this.ajaxService.rawAjaxRequest(params).then(
            function (data) {
                self.storeToken(data.token);
                self.storeConfig(data.config);
                deferred.resolve(data);
            },
            function (error) {
                deferred.reject(error);
            }
        );
        return deferred.promise;
    };

    LoginModel.prototype.storeConfig = function (configObject) {
        this.entityService.storeEntities(configObject);
    };

    LoginModel.prototype.storeToken = function (token) {
        this.storage.store(this.configuration.tokenStorageKey, token);
    };


    LoginModel.newInstance = function (ajaxService, entityService, storage, configuration) {
        var _ajaxService = ajaxService || AjaxService.newInstance();
        var _entityService = entityService || EntityService.newInstance();
        var _storage = storage || StorageService.newInstance();
        var _configuration = configuration || Configuration;
        return new LoginModel(_ajaxService, _entityService, _storage, _configuration);
    };


    return LoginModel;
});
