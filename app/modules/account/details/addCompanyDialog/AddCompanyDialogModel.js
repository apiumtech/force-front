define([
	'shared/services/ajax/AjaxService',
	'config'
], function (AjaxService, Configuration) {
	'use strict';

	function AddCompanyDialogModel(ajaxService) {
		this.ajaxService = ajaxService || new AjaxService();
	}

	AddCompanyDialogModel.prototype.getCompanyTypes = function(){
		var params = {
			url: Configuration.api.getCompanyRelationType,
			type: 'get',
			contentType: 'application/json',
			accept: 'application/json'
		};

		return this.ajaxService.rawAjaxRequest(params);
	};

	return AddCompanyDialogModel;
});