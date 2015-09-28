define([
	'shared/services/ajax/AjaxService',
	'shared/services/StorageService',
	'config',
	'q'
], function (AjaxService, StorageService, Configuration, Q) {
	'use strict';
	
	function SideMenuCFMModel (ajaxService, storageService, configuration) {
		this.authAjaxService = ajaxService;
		this.storageService = storageService;
		this.configuration = configuration;
	};
	
	SideMenuCFMModel.USER_DATA_KEY = 'fm2userData';
	
	SideMenuCFMModel.prototype.getUserSections = function () {
		var userData = this.storageService.retrieve(SideMenuCFMModel.USER_DATA_KEY);
		return userData.userSections.sections;
	};
	
	SideMenuCFMModel.prototype.getUserDataInfo = function () {
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
	
	SideMenuCFMModel.prototype.storeUserData = function (userData) {
		this.storageService.store(SideMenuCFMModel.USER_DATA_KEY, userData);
	};
	
	SideMenuCFMModel.newInstance = function (ajaxService, storageService, configuration) {
		ajaxService = ajaxService || AjaxService.newInstance();
		storageService = storageService || StorageService.newInstance();
		configuration = configuration || Configuration;
		
		return new SideMenuCFMModel(ajaxService, storageService, configuration);
	};
	
	return SideMenuCFMModel;
});