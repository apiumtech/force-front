/**
 * Created by justin on 12/17/14.
 */

app.registerView(function (container) {

    var BaseView = container.getView('views/BaseView');

    var IntensityPresenter = container.getPresenter('presenters/IntensityPresenter');
    var IntensityModel = container.getModel('models/IntensityModel');

    function IntensityView($scope, $model, $presenter) {
        BaseView.call(this, $scope, $model, $presenter);
        $scope.widgets = [];
        var self = this;

        self.fn.loadWidgets = function () {
            self.event.onLoaded();
        };
    }

    IntensityView.prototype = Object.create(BaseView.prototype);

    IntensityView.prototype.__show = BaseView.prototype.show;
    IntensityView.prototype.show = function () {
        this.__show.call(this);
        this.fn.loadWidgets();
    };

    IntensityView.prototype.decorateWidget = function (widgetsData) {
        widgetsData.forEach(function (widget) {
            widget.template = '/templates/widgets/' + widget.widgetType + '.html';
        });
    };

    IntensityView.prototype.onWidgetsLoaded = function (widgetsData) {
        this.decorateWidget.call(this, widgetsData);
        widgetsData.sort(function (widgetA, widgetB) {
            return widgetA.order - widgetB.order;
        })
        this.$scope.widgets = widgetsData;
    };

    IntensityView.prototype.onWidgetsLoadFail = function (error) {
        alert("error while loading widgets");
        console.log(error);
    };


    IntensityView.newInstance = function ($scope, $model, $presenter, $viewRepAspect, $logErrorAspect) {
        var model = $model || IntensityModel.newInstance().getOrElse(throwInstantiateException(IntensityModel));
        var presenter = $presenter || IntensityPresenter.newInstance().getOrElse(throwInstantiateException(IntensityPresenter));

        var view = new IntensityView($scope, model, presenter);

        return view._injectAspects($viewRepAspect, $logErrorAspect);
    };

    return {newInstance: IntensityView.newInstance};
});
