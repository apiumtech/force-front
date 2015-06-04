define([
	'shared/BaseView',
	'modules/literals/shared/search/LiteralsSearchPresenter',
	'modules/literals/shared/search/LiteralsSearchModel'
], function(BaseView, LiteralsSearchPresenter, LiteralsSearchModel) {
	'use strict';

	function LiteralsSearchView($scope, $model, $presenter) {
		BaseView.call(this, $scope, $model, $presenter);
		this.configureEvents();
	}

    LiteralsSearchView.inherits(BaseView, {});
	var proto = LiteralsSearchView.prototype;

	proto.configureEvents = function () {
		var self = this;
		this.event.onInit = function () {};
	};


    LiteralsSearchView.newInstance = function (namedParams) {
		var scope = namedParams.scope || {};
		var model = namedParams.model || LiteralsSearchModel.newInstance();
		var presenter = namedParams.presenter || LiteralsSearchPresenter.newInstance();
		var view = new LiteralsSearchView(scope, model, presenter);

		return view._injectAspects(namedParams.viewRepAspect, namedParams.logErrorAspect);
	};

	return LiteralsSearchView;
});