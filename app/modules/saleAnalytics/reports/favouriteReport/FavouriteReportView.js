define([
	'shared/BaseView',
	'modules/saleAnalytics/reports/favouriteReport/FavouriteReportPresenter'
], function(BaseView, FavouriteReportPresenter) {
	'use strict';

	function FavouriteReportView() {
		BaseView.call(this, $scope, null, $presenter);
	}

	FavouriteReportView.prototype = Object.create(BaseView.prototype);

	FavouriteReportView.newInstance = function($scope, $presenter, viewRepaintAspect, logErrorAspect){
		$presenter = $presenter || new FavouriteReportPresenter();
		var view = new FavouriteReportView($scope, $presenter);

		return view._injectAspects(viewRepaintAspect, logErrorAspect);
	}

	return FavouriteReportView;
});