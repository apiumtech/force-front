/**
 * Created by justin on 12/17/14.
 */

define([
    'modules/saleAnalytics/base/WidgetDecoratedPageModel',
    'modules/saleAnalytics/widgets/WidgetService',
    'shared/services/StorageService'
], function (WidgetDecoratedPageModel, WidgetService, StorageService) {

    function IntensityModel(widgetService, storageService) {
        widgetService = widgetService || new WidgetService();
        storageService = storageService || new StorageService();

        WidgetDecoratedPageModel.call(this, widgetService, storageService);
        this.pageName = "intensity";
    }

    IntensityModel.prototype = Object.create(WidgetDecoratedPageModel.prototype, {});

    return IntensityModel;
});