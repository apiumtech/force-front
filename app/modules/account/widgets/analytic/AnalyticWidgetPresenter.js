define([
	'modules/account/widgets/analytic/AnalyticWidgetModel'
], function(AnalyticWidgetModel) {
	'use strict';

	function AnalyticWidgetPresenter(model) {
		this.model = model || new AnalyticWidgetModel();
	}

	AnalyticWidgetPresenter.prototype.show = function(view){
		var self = this;
		self.view = view;
		view.event = view.event || {};

		view.event.loadData = function(accountId){
			self.model.loadData(accountId).then(view.onLoadDataSuccess.bind(view), view.showError.bind(view));
		};

	};

	return AnalyticWidgetPresenter;
});