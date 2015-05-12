/**
 * Created by Justin on 2/5/2015.
 */
app.registerModel(function (container) {
    var AjaxService = container.getService("services/ajax/AuthAjaxService");
    var StorageService = container.getService("services/StorageService");
    var SalesAnalyticsFilterModel = container.getModel("models/filters/SalesAnalyticsFilterModel");
    var _ = container.getFunction("underscore");

    function SalesAnalyticsFilterPresentationModel(ajaxService, storageService) {
        SalesAnalyticsFilterModel.call(this, ajaxService, storageService);
    }

    SalesAnalyticsFilterPresentationModel.prototype = Object.create(SalesAnalyticsFilterModel.prototype, {});

    SalesAnalyticsFilterPresentationModel.prototype.decorateData = function (serverData) {
        var result = [];

        serverData.forEach(function (dataRecord) {
            var group;
            if (dataRecord.idParent == "-1") {
                group = _.find(result, function (item) {
                    return item.id == dataRecord.id;
                });
                if (group === undefined) {
                    group = {
                        id: dataRecord.id,
                        group: dataRecord.name,
                        children: []
                    };
                    result.push(group);
                }
            } else {
                group = _.find(result, function (item) {
                    return item.id === dataRecord.idParent;
                });
                if (group) {
                    dataRecord.checked = false;
                    group.children.push(dataRecord);
                }
            }
        });

        return result;
    };

    SalesAnalyticsFilterPresentationModel.newInstance = function (ajaxService, storageService) {
        var _ajaxService = ajaxService || AjaxService.newInstance();
        var _storageService = storageService || StorageService.newInstance();

        return new SalesAnalyticsFilterPresentationModel(_ajaxService, _storageService);
    };

    return SalesAnalyticsFilterPresentationModel;
});