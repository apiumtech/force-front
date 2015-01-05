app.registerModel(function (container) {
    var Q = container.getFunction('q');
    var WidgetDecoratedPageModel = container.getModel("models/WidgetDecoratedPageModel");
    var WidgetService = container.getService("services/WidgetService");

    function DistributionModel(widgetService) {
        WidgetDecoratedPageModel.call(this, widgetService);
        this.pageName = "distribution";
    }

    DistributionModel.prototype = Object.create(WidgetDecoratedPageModel.prototype, {});

    DistributionModel.newInstance = function (widgetService) {
        var _widgetService = widgetService || WidgetService.newInstance().getOrElse(throwInstantiateException(WidgetService));

        return Some(new DistributionModel(_widgetService));
    };

    return DistributionModel;
});