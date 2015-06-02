define([
    'modules/saleAnalytics/base/WidgetDecoratedPageModel',
    'modules/saleAnalytics/widgets/WidgetService',
    'shared/services/StorageService'
], function (WidgetDecoratedPageModel, WidgetService, StorageService) {

    function DistributionModel(widgetService, storageService) {
        var _widgetService = widgetService || new WidgetService();
        var _storageService = storageService || new StorageService();

        WidgetDecoratedPageModel.call(this, _widgetService, _storageService);
        this.pageName = "distribution";
    }

    DistributionModel.inherits(WidgetDecoratedPageModel, {});

    DistributionModel.newInstance = function (widgetService, storageService) {
        var _widgetService = widgetService || WidgetService.newInstance();
        var _storageService = storageService || StorageService.newInstance();

        return new DistributionModel(_widgetService, _storageService);
    };

    return DistributionModel;
});