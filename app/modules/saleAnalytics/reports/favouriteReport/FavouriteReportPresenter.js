define([
	'modules/saleAnalytics/reports/favouriteReport/FavouriteReportModel',
	'modules/saleAnalytics/reports/ReportEventBus'
], function(FavouriteReportModel, ReportEventBus) {
	'use strict';

	function FavouriteReportPresenter(model) {
		this.model = model || new FavouriteReportModel();
		this.reportEventBus = ReportEventBus.getInstance();
	}

	FavouriteReportPresenter.prototype.show = function(view){
		var self = this;
		this.view = view;

		view.event.onLoadReports = function () {

			self.model._getReports()
				.then(view.onReportsLoaded.bind(view), view.showError.bind(view));
		};

		view.event.onUsersFilterApplied = function (filterValue) {
			// does nothing
		};
	};

	return FavouriteReportPresenter;
});