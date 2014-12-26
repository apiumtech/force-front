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
    }

    IntensityView.prototype = Object.create(BaseView.prototype);

    IntensityView.prototype.__show = BaseView.prototype.show;
    IntensityView.prototype.show = function () {
        this.__show.call(this);
        this.event.onLoaded();
    };

    IntensityView.prototype.bindElementEvents = function () {
        var handleDraggablePanel = function (e) {
            "use strict";
            var t = ".panel-heading";
            var n = ".row > [class*=col]";
            $(e).sortable({
                handle: t,
                connectWith: n,
                start: function (event, ui) {
                    var oldIndex = ui.item.closest('.widget-container').index();
                    console.log('start index: ', oldIndex);
                },
                stop: function (event, ui) {
                    var newIndex = ui.item.closest('.widget-container').index();
                    console.log('stop index:', newIndex);
                }
            });
            $(e).data("sortable", true);
        };

        var element = "[class*=drag-and-drop]";
        $(document).on('mouseover', element, function (e) {
                var $this = $(this);
                if ($this.data('sortable'))
                    return;
                e.preventDefault();
                handleDraggablePanel($this);
            }
        );
    };

    IntensityView.prototype.decorateWidget = function (widgetsData) {
        widgetsData.forEach(function (widget) {
            widget.template = '/templates/widgets/' + widget.widgetType + '.html';
        });
    };

    IntensityView.prototype.onWidgetsLoaded = function (widgetsData) {
        this.decorateWidget.call(this, widgetsData);
        this.$scope.widgets = widgetsData;
    };

    IntensityView.prototype.onWidgetsLoadFail = function (error) {
        alert("error while loading widgets");
        console.log(error);
    };


    IntensityView.newInstance = function ($scope, $model, $presenter, $viewRepAspect, $logErrorAspect) {
        var model = $model || IntensityModel.newInstance().getOrElse(throwException("IntensityModel could not be instantiated!!"));
        var presenter = $presenter || IntensityPresenter.newInstance().getOrElse(throwException("IntensityPresenter could not be instantiated!!"));

        var view = new IntensityView($scope, model, presenter);

        return view._injectAspects($viewRepAspect, $logErrorAspect);
    };

    return {newInstance: IntensityView.newInstance};
});
