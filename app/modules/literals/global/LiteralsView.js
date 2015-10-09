define([
	'modules/literals/shared/BaseLiteralsView',
	'modules/literals/global/LiteralsPresenter',
	'modules/literals/global/LiteralsModel',
    'shared/services/StorageService',
    'config'
], function(BaseLiteralsView, LiteralsPresenter, LiteralsModel, StorageService, config) {
	'use strict';

	function LiteralsView($scope, $model, $presenter) {
        BaseLiteralsView.call(this, $scope, $model, $presenter);

        // FIXME: Get rid of this harcoded permission
        if( !config.isDevMode() ) {
            var userCode = StorageService.newInstance().retrieve(config.userCodeKey, true);
            var implCode = StorageService.newInstance().retrieve(config.implementationCodeKey, true);
            if ( ["6003_2", "6003_160", "8004_309"].indexOf(implCode+"_"+userCode) === -1 ) {
                console.warn("Access not allowed");
                window.location.href = "/" + config.badTokenRedirectionPage;
            }
        }
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