define([
    'modules/saleAnalytics/base/WidgetDecoratedPageModel',
    'modules/saleAnalytics/widgets/WidgetService',
    'shared/services/StorageService'
], function (WidgetDecoratedPageModel, WidgetService, StorageService) {
    'use strict';

    function ConversionModel(widgetService, storageService) {
        widgetService = widgetService || new WidgetService();
        storageService = storageService || new StorageService();

        WidgetDecoratedPageModel.call(this, widgetService, storageService);
        this.pageName = "conversion";
    }

    ConversionModel.prototype = Object.create(WidgetDecoratedPageModel.prototype, {});

    return ConversionModel;
});