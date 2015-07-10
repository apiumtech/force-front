define([
	'modules/saleAnalytics/reports/reportParamsDialog/ReportParamsDialogModel'
], function(ReportParamsDialogModel) {
	'use strict';

	function ReportParamsDialogPresenter(model) {
		this.model = model || new ReportParamsDialogModel();
	}

	ReportParamsDialogPresenter.prototype.show = function(view){
		var self = this;
		self.view = view;

		view.event = view.event || {};

        view.event.getReportListOfValues = self.model.getReportListOfValues.bind(self.model);
	};

	return ReportParamsDialogPresenter;
});