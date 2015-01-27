app.registerModel(function (container) {
    var WidgetDecoratedPageModel = container.getModel("models/WidgetDecoratedPageModel");
    var WidgetService = container.getService("services/WidgetService");
    var StorageService = container.getService("services/StorageService");

    function DistributionModel(widgetService, storageService) {
        WidgetDecoratedPageModel.call(this, widgetService, storageService);
        this.pageName = "distribution";
    }

    DistributionModel.prototype = Object.create(WidgetDecoratedPageModel.prototype, {});

    DistributionModel.newInstance = function (widgetService, storageService) {
        var _widgetService = widgetService || WidgetService.newInstance().getOrElse(throwInstantiateException(WidgetService));
        var _storageService = storageService || StorageService.newInstance().getOrElse(throwInstantiateException(WidgetService));

        return Some(new DistributionModel(_widgetService, _storageService));
    };

    return DistributionModel;
});