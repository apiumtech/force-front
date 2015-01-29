/**
 * Created by justin on 12/17/14.
 */

app.registerView(function (container) {
    var WidgetDecoratedPageView = container.getView('views/WidgetDecoratedPageView');

    var DistributionPresenter = container.getPresenter('presenters/DistributionPresenter');
    var DistributionModel = container.getModel('models/DistributionModel');

    function DistributionView($scope, $model, $presenter) {
        WidgetDecoratedPageView.call(this, $scope, $model, $presenter);
        this.configureEvents();
    }

    DistributionView.prototype = Object.create(WidgetDecoratedPageView.prototype, {});

    DistributionView.prototype.__show = WidgetDecoratedPageView.prototype.show;
    DistributionView.prototype.show = function () {
        this.__show.call(this);
        this.event.onLoaded();
    };

    DistributionView.prototype.configureEvents = function () {
        var self = this;

        self.fn.dropWidgetToFullSizeArea = function (movingElement, widget) {
            widget.position.size = 12;
        };

        self.fn.highlightDroppableZones = function () {
            $('.fixedarea[as-sortable]').addClass("dropzone");
        };

        self.fn.removeHighlightDroppableZones = function () {
            $('.fixedarea[as-sortable]').removeClass("dropzone");
        };

        self.fn.moveWidgetToContainer = function (movingElement, widget) {
            $(movingElement.item).detach().prependTo('.widgets-container[as-sortable]');
        };
    };

    DistributionView.prototype.updateWidgetSize = function (movingElement, widget) {
        var self = this;
        var element = $(movingElement.item);

        if (element.is(".col-md-12") && (element.next().is(".col-md-6") || element.prev().is(".col-md-6"))) {
            widget.position.size = 6;
        }

        self.fn.removeHighlightDroppableZones();
    };

    DistributionView.newInstance = function ($scope, $model, $presenter, $viewRepAspect, $logErrorAspect) {
        var model = $model || DistributionModel.newInstance().getOrElse(throwInstantiateException(DistributionModel));
        var presenter = $presenter || DistributionPresenter.newInstance().getOrElse(throwInstantiateException(DistributionPresenter));

        var view = new DistributionView($scope, model, presenter);

        return view._injectAspects($viewRepAspect, $logErrorAspect);
    };

    return DistributionView;
});
