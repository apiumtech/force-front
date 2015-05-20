/**
 * Created by justin on 12/17/14.
 */

app.registerModel(function (container) {
    var WidgetDecoratedPageModel = container.getModel("models/WidgetDecoratedPageModel");
    var WidgetService = container.getService("services/WidgetService");
    var StorageService = container.getService("services/StorageService");

    function IntensityModel(widgetService, storageService) {
        WidgetDecoratedPageModel.call(this, widgetService, storageService);
        this.pageName = "intensity";
    }

    IntensityModel.prototype = Object.create(WidgetDecoratedPageModel.prototype, {});

    IntensityModel.newInstance = function (widgetService, storageService) {
        var _widgetService = widgetService || WidgetService.newInstance();
        var _storageService = storageService || StorageService.newInstance();

        return new IntensityModel(_widgetService, _storageService);
    };

    return IntensityModel;
});