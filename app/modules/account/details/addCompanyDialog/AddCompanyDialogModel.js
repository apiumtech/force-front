define([
	'shared/services/ajax/FakeAjaxService'
], function (AjaxService) {
	'use strict';

	function AddCompanyDialogModel(ajaxService) {
		this.ajaxSerivce = ajaxService || new AjaxService();
	}

	AddCompanyDialogModel.prototype.getCompanyTypes = function(){
		return this.ajaxSerivce.rawAjaxRequest({
			result: {
				companyTypes: [
					{key: "type-1", value: "Type 01"},
					{key: "type-2", value: "Type 02"},
					{key: "type-3", value: "Type 03"},
					{key: "type-4", value: "Type 04"},
				]
			}
		});
	};

	return AddCompanyDialogModel;
});