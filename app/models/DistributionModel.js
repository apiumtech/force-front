app.registerModel(function (container) {
    var Q = container.getFunction('q');
    var WidgetService = container.getService("services/WidgetService");

    function DistributionModel(widgetService) {
        this.widgetService = widgetService;
        this.pageName = "distribution";
    }

    DistributionModel.prototype._getWidgets = function () {
        var deferred = Q.defer();

        this.widgetService.getWidgetsForPage(this.pageName)
            .then(function (data) {
                deferred.resolve(data.data);
            })
            .fail(function (error) {
                deferred.reject(error);
            });

        return deferred.promise;
    };

    DistributionModel.prototype.getWidgets = function () {
        return Q.fcall(this._getWidgets.bind(this));
    };

    DistributionModel.newInstance = function (widgetService) {
        var _widgetService = widgetService || WidgetService.newInstance().getOrElse(throwInstantiateException(WidgetService));

        return Some(new DistributionModel(_widgetService));
    };

    return DistributionModel;
});