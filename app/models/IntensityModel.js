/**
 * Created by justin on 12/17/14.
 */

app.registerModel(function (container) {
    var Q = container.getFunction('q');
    var WidgetService = container.getService("services/WidgetService");

    function IntensityModel(widgetService) {
        this.widgetService = widgetService;
        this.pageName = "intensity";
    }

    IntensityModel.prototype._getWidgets = function () {
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

    IntensityModel.prototype.getWidgets = function () {
        return Q.fcall(this._getWidgets.bind(this));
    };

    IntensityModel.newInstance = function (widgetService) {
        var _widgetService = widgetService || WidgetService.newInstance().getOrElse(throwInstantiateException(WidgetService));

        return Some(new IntensityModel(_widgetService));
    };

    return IntensityModel;
});