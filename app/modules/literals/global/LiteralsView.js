define([
	'modules/literals/shared/BaseLiteralsView',
	'modules/literals/global/LiteralsPresenter',
	'modules/literals/global/LiteralsModel'
], function(BaseLiteralsView, LiteralsPresenter, LiteralsModel) {
	'use strict';

	function LiteralsView($scope, $model, $presenter) {
        BaseLiteralsView.call(this, $scope, $model, $presenter);
	}

    LiteralsView.inherits(BaseLiteralsView);
    var proto = LiteralsView.prototype;

    LiteralsView.newInstance = function (namedParams) {
        var scope = namedParams.scope || {};
        var model = namedParams.model || LiteralsModel.newInstance();
        var presenter = namedParams.presenter || LiteralsPresenter.newInstance();
        var view = new LiteralsView(scope, model, presenter);

        return view._injectAspects(namedParams.viewRepAspect, namedParams.logErrorAspect);
    };

	return LiteralsView;
});