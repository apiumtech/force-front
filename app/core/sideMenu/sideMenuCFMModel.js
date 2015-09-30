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
	
	SideMenuCFMModel.prototype.logout = function () {
		var params = {
			url: this.configuration.api.logout,
			contentType: "application/json; charset=utf-8",
            dataType: "json",
            method: "POST"
		};

		return this.authAjaxService.rawAjaxRequest(params);
	}
	
	SideMenuCFMModel.prototype.getUserDataInfo = function () {
		var self = this;
		var deferred = Q.defer();
		
		/*var params = {
			url: this.configuration.api.getUserDataInfo,
			contentType: 'application/json; charset=utf-8',
			dataType: 'json',
			method: 'POST'
		};
		
		this.authAjaxService.rawAjaxRequest(params).then(
			function (data) {
				var userData = JSON.parse(data.d);
				console.log(JSON.stringify(userData));
				self.storeUserData(userData);
				deferred.resolve();
			}
		);*/
		setTimeout(function () {
			var stringData = '{"userSections":{"sections":[{"section":"dashboard","name":"Dashboard","hasSubSections":true,"subsections":[{"subsection":"data","name":"Dashboard","url":"dashboard.aspx"},{"subsection":"data","name":"Implementations","url":"implementations.aspx"}]},{"section":"data","name":"Fields","hasSubSections":true,"subsections":[{"subsection":"data","name":"Value lists","url":"valueslist.aspx"},{"subsection":"data","name":"Extra Fields","url":"extrafields.aspx"},{"subsection":"data","name":"Standard fields","url":"standardfields.aspx"},{"subsection":"data","name":"Literals","url":"changeliterals.aspx"}]},{"section":"users","name":"Users","hasSubSections":true,"subsections":[{"subsection":"data","name":"Hierarchy","url":"users.aspx"},{"subsection":"data","name":"Table","url":"users-table.aspx"}]},{"section":"permissions","name":"Permissions","url":"permissions.aspx"},{"section":"reports","name":"Reports","url":"reports.aspx"},{"section":"devices","name":"Devices","url":"devices.aspx"},{"section":"parameters","name":"Parameters","url":"parameters.aspx"},{"section":"views","name":"Views","url":"views.aspx"},{"section":"cron","name":"Cron Service","url":"cron.aspx"},{"section":"massives","name":"Records","hasSubSections":true,"subsections":[{"subsection":"massives","name":"Import Users","url":"massive-upload-users.aspx"},{"subsection":"massives","name":"Import Accounts","url":"massive-upload-companies.aspx"},{"subsection":"massives","name":"Import Contacts","url":"massive-upload-contacts.aspx"},{"subsection":"massives","name":"Global Replace","url":"massive-update.aspx"}]},{"section":"sqltester","name":"SQL Tester","url":"sqltester.aspx"},{"section":"dashboard","name":"Literals","url":"/web3/index.html#/custom-literals"}]},"userData":{"key":"e4fb7b9c641782d823316fd0e2a579de7faaaabc|ws_connect_elo","currencySymbol":"€","userFullName":"Bruno Ràfols","userName":"bruno_test@gmail.com","userId":"109","imgUrl":"http://be-sta.forcemanager.net/getuserpicture.ashx?userkey=7b414ab1746611d76c64d0b55a6cf5aaaaf865b3&strCellPhoneNumber=bruno_test@gmail.com&idUser=","userImg":"http://be-sta.forcemanager.net/getuserpicture.ashx?userkey=7b414ab1746611d76c64d0b55a6cf5aaaaf865b3&strCellPhoneNumber=bruno_test@gmail.com&idUser=109","cultureLang":"EN","implementation":"ForceManager Demo","idImplementation":"8004","isImplementator":"True","password":"7b414ab1746611d76c64d0b55a6cf5aaaaf865b3","locale":"en-GB","timezone":"31"}}';
			var userData = JSON.parse(stringData);
			self.storeUserData(userData);
			deferred.resolve();
		}, 300);
		
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