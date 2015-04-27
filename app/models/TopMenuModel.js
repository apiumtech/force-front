/**
 * Created by joanllenas on 4/21/15.
 */

app.registerModel(function (container) {
    var AjaxService = container.getService("services/AjaxService");
    var StorageService = container.getService("services/StorageService");
    var Configuration = container.getService("Configuration");
    var Q = container.getFunction('q');


    function TopMenuModel(ajaxService, storageService, configuration) {
        this.ajaxService = ajaxService;
        this.storageService = storageService;
        this.configuration = configuration;
    }

    TopMenuModel.USER_DATA_KEY = "fm2UserData";


    TopMenuModel.prototype.getUserSections = function () {
        var userData = this.storageService.retrieve(TopMenuModel.USER_DATA_KEY);
        return userData.userSections.sections;
    };

    TopMenuModel.prototype.getUserOptions = function () {
        var userData = this.storageService.retrieve(TopMenuModel.USER_DATA_KEY);
        return userData.userOptions.menuItems;
    };

    TopMenuModel.prototype.getUserData = function () {
        var userData = this.storageService.retrieve(TopMenuModel.USER_DATA_KEY);
        return userData.userData;
    };

    TopMenuModel.prototype.getUserNotifications = function () {
        var userData = this.storageService.retrieve(TopMenuModel.USER_DATA_KEY);
        return userData.unreadNotifications;
    };


    TopMenuModel.prototype.getUserDataInfo = function () {
        var self = this;
        var deferred = Q.defer();

        var params = {
            url: this.configuration.api.getUserDataInfo,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            method: "POST"
        };

        this.ajaxService.rawAjaxRequest(params).then(
            function(data) {
                var userData = JSON.parse(data.d);
                self.storeUserData(userData);
                deferred.resolve();
            },
            function(error) {deferred.reject(error);}
        );

        return deferred.promise;
    };


    TopMenuModel.prototype.storeUserData = function(userData) {
        this.storageService.store(TopMenuModel.USER_DATA_KEY, userData);
    };


    TopMenuModel.newInstance = function (ajaxService, storageService, configuration) {
        ajaxService = ajaxService || AjaxService.newInstance().getOrElse(throwInstantiateException(AjaxService));
        storageService = storageService || StorageService.newInstance().getOrElse(throwInstantiateException(StorageService));
        configuration = configuration || Configuration;

        return Some(new TopMenuModel(ajaxService, storageService, configuration));
    };


    return {
        newInstance: TopMenuModel.newInstance
    };
});
