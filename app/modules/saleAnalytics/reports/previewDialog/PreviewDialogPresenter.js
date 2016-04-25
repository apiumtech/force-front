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
			self.model.toggleFavouriteReport(reportId)
				.then(view.onToggledFavouriteReport.bind(view), view.showError.bind(view));
		};

		view.event.getReportURL = function(report, callback, errorCallback){
			self.model.getReportURL(report).then(callback, function(err){
                errorCallback(err);
            });
		};

		view.event.onLoadingPreviewImage = function(report){
			self.model.loadPreviewImage(report)
				.then(view.onPreviewImageLoaded.bind(view), view.showError.bind(view));
		};


		view.event.onLoadingTablePreview = function(report){
			view.inProgress();
			self.model.loadTablePreview(report)
				.then(view.onTablePreviewLoaded.bind(view), view.showError.bind(view));
		};

	};

	return PreviewDialogPresenter;
});