/**
 * Created by justin on 12/17/14.
 */

define([
    'modules/saleAnalytics/base/WidgetDecoratedPageView',
    'modules/saleAnalytics/distribution/DistributionPresenter',
    'modules/saleAnalytics/eventBus/WidgetAdministrationEventBus',
    'jquery'
], function (WidgetDecoratedPageView, DistributionPresenter, WidgetAdministrationEventBus, $) {

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

        self.fn.makeFullSize = function (movingElement, widget) {
            widget.position.size = 12;
        };

        self.fn.highlightDroppableZones = function () {
            $(self.fixedAreaSelector).addClass(self.dropZoneClassName);
        };

        self.fn.removeHighlightDroppableZones = function () {
            $(self.fixedAreaSelector).removeClass(self.dropZoneClassName);
        };

        self.fn.moveWidgetToContainer = function (movingElement, widget) {
            self._moveElementToContainer(movingElement);
            self.event.onWidgetMoved(widget, self.getElementIndex(movingElement.item));
        };

        WidgetAdministrationEventBus.getInstance().onToggleWidgetAdministration( self.onToggleWidgetAdministration.bind(this) );
    };

    DistributionView.prototype.onToggleWidgetAdministration = function () {
        $("#WidgetAdministrationContainer").toggle();
    };

    DistributionView.prototype._moveElementToContainer = function (movingElement) {
        var self = this;
        $(movingElement.item).detach().prependTo(self.widgetContainerSelector);
    };

    DistributionView.prototype.onWidgetsUpdated = function (data) {

    };

    DistributionView.prototype.onWidgetsUpdatedFail = function (error) {
        this.showError(error);
    };

    DistributionView.prototype.updateWidgetSize = function (movingElement, widget) {
        var self = this;
        var element = $(movingElement.item);

        if (element.is(".col-md-12") && (element.next().is(".col-md-6") || element.prev().is(".col-md-6"))) {
            widget.position.size = 6;
        }

        self.event.onWidgetMoved(widget, self.getElementIndex(movingElement.item));
    };

    DistributionView.newInstance = function ($scope, $presenter, $viewRepAspect, $logErrorAspect) {
        var presenter = $presenter || new DistributionPresenter();

        var view = new DistributionView($scope, presenter);

        return view._injectAspects($viewRepAspect, $logErrorAspect);
    };

    return DistributionView;
});
