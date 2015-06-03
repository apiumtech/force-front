define([
	'modules/saleAnalytics/reports/previewDialog/PreviewDialogModel'
], function(PreviewDialogModel) {
	'use strict';

	function PreviewDialogPresenter(model) {
		this.model = model || new PreviewDialogModel();
	}

	PreviewDialogPresenter.prototype.show = function(view){
		var self = this;
		self.view = view;

		view.event = view.event || {};

		view.event.toggleFavouriteReport = function(reportId){
			self.model.toggleFavouriteReport(reportId);
		};

		view.event.getReportURL = function(report, callback){
			self.model.getReportURL(report, callback);
		}

	};

	return PreviewDialogPresenter;
});