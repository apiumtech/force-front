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
	};

	return ReportParamsDialogPresenter;
});