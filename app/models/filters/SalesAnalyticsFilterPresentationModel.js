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

        serverData.data.forEach(function (dataRecord) {
            var group = _.find(result, function (item) {
                return item.group === dataRecord.environment;
            });

            if (group === undefined) {
                group = {
                    group: dataRecord.environment,
                    data: []
                };
                result.push(group);
            }
            dataRecord.checked = false;
            group.data.push(dataRecord);
        });

        return result;
    };

    SalesAnalyticsFilterPresentationModel.newInstance = function (ajaxService, storageService) {
        var _ajaxService = ajaxService || AjaxService.newInstance().getOrElse(throwInstantiateException(AjaxService));
        var _storageService = storageService || StorageService.newInstance().getOrElse(throwInstantiateException(StorageService));

        return Some(new SalesAnalyticsFilterPresentationModel(_ajaxService, _storageService));
    };

    return SalesAnalyticsFilterPresentationModel;
});