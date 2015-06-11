define([
    'shared/BaseView',
    'modules/literals/custom/CustomLiteralsPresenter',
    'modules/literals/custom/CustomLiteralsModel'
], function(BaseView, CustomLiteralsPresenter, CustomLiteralsModel) {
    'use strict';

    function CustomLiteralsView($scope, $model, $presenter) {
        BaseView.call(this, $scope, $model, $presenter);
        this.data.currentError = null;
        this.configureEvents();
    }

    CustomLiteralsView.inherits(BaseView, {});
    var proto = CustomLiteralsView.prototype;

    proto.configureEvents = function () {
    };

    proto.showError = function (msg) {
        this.data.currentError = msg;
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