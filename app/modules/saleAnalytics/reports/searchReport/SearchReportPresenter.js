define([
	'modules/saleAnalytics/reports/searchReport/SearchReportModel'
], function(SearchReportModel) {
	'use strict';

	function SearchReportPresenter(model) {
		this.model = model || new SearchReportModel();
	}

	SearchReportPresenter.prototype.show = function(view){
		this.view = view;


	};

	SearchReportPresenter.prototype.searchTabSelected = function(){

	};



	return SearchReportPresenter;
});