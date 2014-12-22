/**
 * Created by justin on 12/17/14.
 */

app.registerModel(function (container) {
    var Q = container.getFunction('q');

    function IntensityFirstWidgetModel() {

    }

    IntensityFirstWidgetModel.prototype.reloadWidget = function () {
        var deferred = Q.defer();

        $.ajax({
            url: 'http://localhost:8065/api/widgets/intensity/1',
            type: 'get',
            contentType: 'application/json'
        }).success(function (data) {
            deferred.resolve(JSON.parse(data));
        }).error(function (error) {
            deferred.reject(error);
        });

        return deferred.promise;
    };

    IntensityFirstWidgetModel.prototype.onReloadWidgetRequested = function () {
        return Q.fcall(this.reloadWidget.bind(this));
    };

    IntensityFirstWidgetModel.newInstance = function () {
        return Some(new IntensityFirstWidgetModel());
    };

    return IntensityFirstWidgetModel;
});