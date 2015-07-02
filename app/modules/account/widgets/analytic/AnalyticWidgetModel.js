define([
	'shared/services/ajax/FakeAjaxService'
], function(AjaxService) {
	'use strict';

	function AnalyticWidgetModel(ajaxService) {
		this.authAjaxService = ajaxService || new AjaxService();
	}

	AnalyticWidgetModel.prototype.loadData = function(accountId){
		return this.authAjaxService.rawAjaxRequest({
			result: {
				activity_index: {
					data: {
						value: 2,
						total: 10
					},
					chartData: [['Title', 'Value'], ['value', 20], ['other', 80]]
				},
				number_of_visits: 200,
				call_minutes: 60,
				email_sent: 85
			}
		});
	};

	return AnalyticWidgetModel;
});