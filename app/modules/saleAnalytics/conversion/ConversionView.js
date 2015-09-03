/**
 * Created by justin on 12/17/14.
 */

define([
    'modules/saleAnalytics/base/WidgetDecoratedPageView',
    'modules/saleAnalytics/conversion/ConversionPresenter',
    'jquery'
], function (WidgetDecoratedPageView, ConversionPresenter, $) {
    'use strict';

    function ConversionView($scope, $presenter) {
        $presenter = $presenter || new ConversionPresenter();
        WidgetDecoratedPageView.call(this, $scope, null, $presenter);
        this.pageName = 'conversion';
    }

    ConversionView.inherits(WidgetDecoratedPageView, {});

    ConversionView.prototype.__show = WidgetDecoratedPageView.prototype.show;
    ConversionView.prototype.__configureEvents = WidgetDecoratedPageView.prototype.configureEvents;
    ConversionView.prototype.show = function () {
        this.__show.call(this);
        this.event.onLoaded();
    };

    ConversionView.prototype.configureEvents = function () {
        var self = this;

        self.__configureEvents.call(this);

        /*self.fn.makeFullSize = function (movingElement, widget) {
            widget.position.size = 12;
        };*/

        self.fn.highlightDroppableZones = function () {
            $(self.fixedAreaSelector).addClass(self.dropZoneClassName);
        };

        self.fn.removeHighlightDroppableZones = function () {
            $(self.fixedAreaSelector).removeClass(self.dropZoneClassName);
        };

        /*self.fn.moveWidgetToContainer = function (movingElement, widget) {
            self._moveElementToContainer(movingElement);
            self.event.onWidgetMoved(widget, self.getElementIndex(movingElement.item));
        };*/
    };

    ConversionView.prototype._moveElementToContainer = function (movingElement) {
        var self = this;
        $(movingElement.item).detach().appendTo(self.widgetContainerSelector);
    };

    ConversionView.prototype.updateWidgetSize = function (movingElement, widget) {
        var self = this;
        var element = $(movingElement.item);

        if (element.is(".col-md-12") && (element.next().is(".col-md-6") || element.prev().is(".col-md-6"))) {
            widget.position.size = 6;
        }

        self.event.onWidgetMoved(widget, self.getElementIndex(movingElement.item));
    };

    ConversionView.prototype.onWidgetsUpdated = function (data) {

    };

    ConversionView.prototype.onWidgetsUpdatedFail = function (error) {
        this.showError(error);
    };

    ConversionView.newInstance = function ($scope, $presenter, $viewRepAspect, $logErrorAspect) {

        var presenter = $presenter || new ConversionPresenter();

        var view = new ConversionView($scope, presenter);

        return view._injectAspects($viewRepAspect, $logErrorAspect);
    };

    return ConversionView;
});
