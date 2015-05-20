define([
    'modules/saleAnalytics/base/WidgetDecoratedPageModel',
    'modules/saleAnalytics/widgets/WidgetService',
    'shared/services/StorageService'
], function (WidgetDecoratedPageModel, WidgetService, StorageService) {
    'use strict';

    function ConversionModel(widgetService, storageService) {
        WidgetDecoratedPageModel.call(this, widgetService, storageService);
        this.pageName = "conversion";
    }

    ConversionModel.prototype = Object.create(WidgetDecoratedPageModel.prototype, {});

    ConversionModel.newInstance = function (widgetService, storageService) {
        var _widgetService = widgetService || WidgetService.newInstance();
        var _storageService = storageService || StorageService.newInstance();

        return new ConversionModel(_widgetService, _storageService);
    };

    return ConversionModel;
});