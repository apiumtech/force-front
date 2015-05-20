/**
 * Created by justin on 12/17/14.
 */

define([
    'modules/saleAnalytics/base/WidgetDecoratedPageModel',
    'modules/saleAnalytics/widgets/WidgetService',
    'shared/services/StorageService'
], function (WidgetDecoratedPageModel, WidgetService, StorageService) {

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