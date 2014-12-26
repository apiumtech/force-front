/**
 * Created by justin on 12/17/14.
 */

app.registerModel(function (container) {
    var Q = container.getFunction('q');

    function IntensityModel() {

    }

    IntensityModel.prototype._getWidgets = function () {
        var deferred = Q.defer();
        var url = 'http://localhost:8065/api/widgets/intensity';
        $.ajax({
            url: url,
            type: 'get',
            contentType: 'application/json'
        }).success(function (data) {
            var parsedData = JSON.parse(data)
            deferred.resolve(undefined != parsedData.data ? parsedData.data : parsedData);
        }).error(function (error) {
            deferred.reject(error);
        });

        return deferred.promise;
    };

    IntensityModel.prototype.getWidgets = function () {
        return Q.fcall(this._getWidgets.bind(this));
    };

    IntensityModel.newInstance = function () {
        return Some(new IntensityModel());
    };

    return IntensityModel;
});