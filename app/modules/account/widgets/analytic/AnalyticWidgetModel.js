define([
	'shared/services/ajax/FakeAjaxService'
], function(AjaxService) {
	'use strict';

	function AnalyticWidgetModel(ajaxService) {
		this.ajaxService = ajaxService || new AjaxService();
	}

	AnalyticWidgetModel.prototype.loadData = function(accountId){
		return this.ajaxService.rawAjaxRequest({
			result: {
				activity_index: {
					value: 4,
					total: 10
				},
				number_of_visits: 200,
				call_minutes: 60,
				email_sent: 85
			}
		});
	};

	return AnalyticWidgetModel;
});