app.registerModel(function (container) {
    var WidgetDecoratedPageModel = container.getModel("models/WidgetDecoratedPageModel");

    var WidgetService = container.getService("services/WidgetService");
    var StorageService = container.getService("services/StorageService");

    function ConversionModel(widgetService, storageService) {
        WidgetDecoratedPageModel.call(this, widgetService, storageService);
        this.pageName = "conversion";
    }

    ConversionModel.prototype = Object.create(WidgetDecoratedPageModel.prototype, {});

    ConversionModel.newInstance = function (widgetService, storageService) {
        var _widgetService = widgetService || WidgetService.newInstance().getOrElse(throwInstantiateException(WidgetService));
        var _storageService = storageService || StorageService.newInstance().getOrElse(throwInstantiateException(StorageService));

        return Some(new ConversionModel(_widgetService, _storageService));
    };

    return ConversionModel;
});