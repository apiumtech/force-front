define([
	'shared/services/ajax/AjaxService',
	'shared/services/StorageService',
	'config',
	'q'
], function (AjaxService, StorageService, Configuration, Q) {
	'use strict';
	
	function TopMenuCFMModel(ajaxService, storageService, configuration) {
		this.authAjaxService = ajaxService;
		this.storageService = storageService;
		this.configuration = configuration;
	};
	
	TopMenuCFMModel.USER_DATA_KEY = 'fm2userData';
    
    TopMenuCFMModel.prototype.getUserSections = function () {
        var userData = this.storageService.retrieve(TopMenuCFMModel.USER_DATA_KEY);
        return userData.userSections.sections;
    };
	
	TopMenuCFMModel.prototype.getUserData = function () {
        var userData = this.storageService.retrieve(TopMenuCFMModel.USER_DATA_KEY);
        return userData.userData;
    };
	
	TopMenuCFMModel.prototype.logout = function () {
        var self = this;

        var params = {
            url: this.configuration.api.logout,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            method: "POST"
        };

        return this.authAjaxService.rawAjaxRequest(params);
    };
    
    TopMenuCFMModel.prototype.getUserDataInfo = function () {
        var self = this;
        var deferred = Q.defer();

        var params = {
			url: this.configuration.api.getUserDataInfo,
			contentType: 'application/json; charset=utf-8',
			dataType: 'json',
			method: 'POST'
		};
		
		this.authAjaxService.rawAjaxRequest(params).then(
			function (data) {
				var userData = JSON.parse(data.d);
				self.storeUserData(userData);
				deferred.resolve();
			}
		);

        return deferred.promise;
    };
    
    TopMenuCFMModel.prototype.storeUserData = function (userData) {
        this.storageService.store(TopMenuCFMModel.USER_DATA_KEY, userData);
    };
    
    TopMenuCFMModel.newInstance = function (ajaxService, storageService, configuration) {
        ajaxService = ajaxService || AjaxService.newInstance();
        storageService = storageService || StorageService.newInstance();
        configuration = configuration || Configuration;

        return new TopMenuCFMModel(ajaxService, storageService, configuration);
    };
    
    return TopMenuCFMModel;
});