define([
    'shared/BaseView',
	'modules/literals/global/LiteralsPresenter',
	'modules/literals/global/LiteralsModel'
], function(BaseView, LiteralsPresenter, LiteralsModel) {
	'use strict';

	function LiteralsView($scope, $model, $presenter) {
		BaseView.call(this, $scope, $model, $presenter);
        this.configureEvents();
	}

    var proto = LiteralsView.prototype = Object.create(BaseView.prototype, {});

    proto.configureEvents = function () {
        var self = this;

        this.event.onInit = function () {};
    };


    LiteralsView.newInstance = function (namedParams) {
        var scope = namedParams.scope || {};
        var model = namedParams.model || LiteralsModel.newInstance();
        var presenter = namedParams.presenter || LiteralsPresenter.newInstance();
        var view = new LiteralsView(scope, model, presenter);

        return view._injectAspects(namedParams.viewRepAspect, namedParams.logErrorAspect);
    };

	return LiteralsView;
});