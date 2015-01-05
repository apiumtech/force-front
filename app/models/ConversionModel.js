app.registerModel(function (container) {
    var Q = container.getFunction('q');
    var WidgetDecoratedPageModel = container.getModel("models/WidgetDecoratedPageModel");

    var WidgetService = container.getService("services/WidgetService");

    function ConversionModel(widgetService) {
        WidgetDecoratedPageModel.call(this, widgetService);
        this.pageName = "conversion";
    }

    ConversionModel.prototype = Object.create(WidgetDecoratedPageModel.prototype, {});

    ConversionModel.newInstance = function (widgetService) {
        var _widgetService = widgetService || WidgetService.newInstance().getOrElse(throwInstantiateException(WidgetService));

        return Some(new ConversionModel(_widgetService));
    };

    return ConversionModel;
});