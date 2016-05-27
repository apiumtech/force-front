define([
    'modules/saleAnalytics/base/WidgetDecoratedPageView'
], function (WidgetDecoratedPageView) {
  'use strict';

    function ElBocataDelDiaView($scope) {
        WidgetDecoratedPageView.call(this, $scope, null, null);
        this.pageName = 'elbocatadeldia';
        this.configureEvents();
    }

    ElBocataDelDiaView.inherits(WidgetDecoratedPageView, {});

    ElBocataDelDiaView.prototype.__configureEvents = WidgetDecoratedPageView.prototype.configureEvents;

    ElBocataDelDiaView.prototype.show = function () {
        this.__base__.show.call(this);
    };

    ElBocataDelDiaView.prototype.configureEvents = function(){
        var self = this;
        self.__configureEvents.call(this);
    };

    ElBocataDelDiaView.prototype.onWidgetsUpdated = function (data) {

    };

    ElBocataDelDiaView.prototype.onWidgetsUpdatedFail = function (error) {
        this.showError(error);
    };

    ElBocataDelDiaView.newInstance = function ($scope, $viewRepAspect, $logErrorAspect) {
        var view = new ElBocataDelDiaView($scope);

        return view._injectAspects($viewRepAspect, $logErrorAspect);
    };

    return ElBocataDelDiaView;
});
