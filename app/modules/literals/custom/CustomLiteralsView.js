define([
    'modules/literals/shared/BaseLiteralsView',
    'modules/literals/custom/CustomLiteralsPresenter',
    'modules/literals/custom/CustomLiteralsModel'
], function(BaseLiteralsView, CustomLiteralsPresenter, CustomLiteralsModel) {
    'use strict';

    function CustomLiteralsView($scope, $model, $presenter) {
        BaseLiteralsView.call(this, $scope, $model, $presenter);
    }

    CustomLiteralsView.inherits(BaseLiteralsView);
    var proto = CustomLiteralsView.prototype;

    proto.configureEvents = function () {
        this.__base__.configureEvents.call(this);
        this.event.onInit = function(){};
    };

    CustomLiteralsView.newInstance = function (namedParams) {
        var scope = namedParams.scope || {};
        var model = namedParams.model || CustomLiteralsModel.newInstance();
        var presenter = namedParams.presenter || CustomLiteralsPresenter.newInstance();
        var view = new CustomLiteralsView(scope, model, presenter);

        return view._injectAspects(namedParams.viewRepAspect, namedParams.logErrorAspect);
    };

    return CustomLiteralsView;
});