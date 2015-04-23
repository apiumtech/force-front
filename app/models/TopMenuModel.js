/**
 * Created by joanllenas on 4/21/15.
 */

app.registerModel(function (container) {
    var AjaxService = container.getService("services/AjaxService");
    var StorageService = container.getService("services/StorageService");
    var Q = container.getFunction('q');


    function TopMenuModel(ajaxService, storageService) {
        this.ajaxService = ajaxService;
        this.storageService = storageService;
    }


    TopMenuModel.prototype.getUserSections = function () {
        var deferred = Q.defer();

        this._getUserDataInfo().then(
            function(userData) {
                deferred.resolve(userData.userSections.sections);
            },
            function(error) {deferred.reject(error);}
        );

        return deferred.promise;
    };


    TopMenuModel.prototype._getUserDataInfo = function () {
        var self = this;
        var deferred = Q.defer();

        var params = {
            url: "http://websta.forcemanager.net/ASMX/Proxy.asmx/getUserDataInfo",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            method: "POST"
        };

        this.ajaxService.rawAjaxRequest(params).then(
            function(data) {
                var userData = JSON.parse(data.d)
                self.storeUserData(userData);
                deferred.resolve(userData);
            },
            function(error) {deferred.reject(error);}
        );

        return deferred.promise;
    };


    TopMenuModel.prototype.storeUserData = function(userData) {
        this.storageService.store("fm2UserData", userData);
    };


    TopMenuModel.newInstance = function (ajaxService, storageService) {
        ajaxService = ajaxService || AjaxService.newInstance().getOrElse(throwInstantiateException(AjaxService));
        storageService = storageService || StorageService.newInstance().getOrElse(throwInstantiateException(StorageService));

        return Some(new TopMenuModel(ajaxService, storageService));
    };


    return {
        newInstance: TopMenuModel.newInstance
    };
});
