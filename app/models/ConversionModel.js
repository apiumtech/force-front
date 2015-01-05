app.registerModel(function (container) {
    var Q = container.getFunction('q');
    var WidgetService = container.getService("services/WidgetService");

    function ConversionModel(widgetService) {
        this.widgetService = widgetService;
        this.pageName = "conversion";
    }

    ConversionModel.prototype._getWidgets = function () {
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

    ConversionModel.prototype.getWidgets = function () {
        return Q.fcall(this._getWidgets.bind(this));
    };

    ConversionModel.newInstance = function (widgetService) {
        var _widgetService = widgetService || WidgetService.newInstance().getOrElse(throwInstantiateException(WidgetService));

        return Some(new ConversionModel(_widgetService));
    };

    return ConversionModel;
});