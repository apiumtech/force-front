define([
	'modules/saleAnalytics/reports/searchReport/SearchReportModel',
	'modules/saleAnalytics/reports/ReportEventBus'
], function(SearchReportModel, ReportEventBus) {
	'use strict';

	function SearchReportPresenter(model) {
		this.model = model || new SearchReportModel();
		this.reportEventBus = ReportEventBus.getInstance();
	}

	SearchReportPresenter.prototype.show = function(view){
		this.view = view;

		this.reportEventBus.onSearchReportTabSelected(this.searchTabSelected.bind(this));
	};

	SearchReportPresenter.prototype.searchTabSelected = function(){

	};



	return SearchReportPresenter;
});