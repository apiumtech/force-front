define([
    'modules/saleAnalytics/base/WidgetDecoratedPageModel',
    'modules/saleAnalytics/widgets/WidgetService',
    'shared/services/StorageService'
], function (WidgetDecoratedPageModel, WidgetService, StorageService) {

    function DistributionModel(widgetService, storageService) {
        WidgetDecoratedPageModel.call(this, widgetService, storageService);
        this.pageName = "distribution";
    }

    DistributionModel.prototype = Object.create(WidgetDecoratedPageModel.prototype, {});

    DistributionModel.newInstance = function (widgetService, storageService) {
        var _widgetService = widgetService || WidgetService.newInstance();
        var _storageService = storageService || StorageService.newInstance();

        return new DistributionModel(_widgetService, _storageService);
    };

    return DistributionModel;
});