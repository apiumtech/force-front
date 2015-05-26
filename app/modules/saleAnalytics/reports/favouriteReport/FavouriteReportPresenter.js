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
		this.view = view;
		this.reportEventBus.onFavReportTabSelected(this.favouriteTabSelected.bind(this));
	}

	FavouriteReportPresenter.prototype.favouriteTabSelected = function(){

	}

	return FavouriteReportPresenter;
});