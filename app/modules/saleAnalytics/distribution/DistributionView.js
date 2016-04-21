/**
 * Created by justin on 12/17/14.
 */

define([
    'modules/saleAnalytics/base/WidgetDecoratedPageView',
    'modules/saleAnalytics/distribution/DistributionPresenter',
    'jquery'
], function (WidgetDecoratedPageView, DistributionPresenter, $) {
    'use strict';

    function DistributionView($scope, $presenter) {
        $presenter = $presenter || new DistributionPresenter();
        WidgetDecoratedPageView.call(this, $scope, null, $presenter);
        this.pageName = 'distribution';
    }

    DistributionView.inherits(WidgetDecoratedPageView, {});

    DistributionView.prototype.__configureEvents = WidgetDecoratedPageView.prototype.configureEvents;
    DistributionView.prototype.__show = WidgetDecoratedPageView.prototype.show;
    DistributionView.prototype.show = function () {
        this.__show.call(this);
        this.event.onLoaded();
    };

    DistributionView.prototype.configureEvents = function () {
        var self = this;
        self.__configureEvents.call(this);
    };

    DistributionView.prototype.onWidgetsUpdated = function (data) {

    };

    DistributionView.prototype.onWidgetsUpdatedFail = function (error) {
        this.showError(error);
    };

    DistributionView.newInstance = function ($scope, $presenter, $viewRepAspect, $logErrorAspect) {
        var presenter = $presenter || new DistributionPresenter();

        var view = new DistributionView($scope, presenter);

        return view._injectAspects($viewRepAspect, $logErrorAspect);
    };

    return DistributionView;
});
