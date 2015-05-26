define([
	'shared/services/ajax/FakeAjaxService'
], function(AjaxService) {
	'use strict';

	function FavouriteReportModel(ajaxService) {
		this.ajaxService = ajaxService || new AjaxService();
	}

	return FavouriteReportModel;
});