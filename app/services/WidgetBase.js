/**
 * Created by justin on 12/17/14.
 */

app.registerService(function (container) {
    var Q = container.getFunction('q');

    function WidgetBase() {
        this._fetchPoint = 'http://localhost:8065/api/widgets';
        this._widgetName = '';
        this._widgetType = '';
    }

    WidgetBase.prototype = Object.create(Object.prototype, {
        widgetName: {
            get: function () {
                return this._widgetName;
            },
            set: function (value) {
                this._widgetName = value;
            }
        },
        widgetType: {
            get: function () {
                return this._widgetType;
            },
            set: function (value) {
                this._widgetType = value;
            }
        },
        fetchPoint: {
            get: function () {
                return this._fetchPoint;
            },
            set: function (value) {
                this._fetchPoint = value;
                this._reload();
            }
        }
    });

    WidgetBase.prototype.onReloadWidgetRequested = function () {
        if (!this.widgetName)
            throw new Error("Widget Name is not defined");
        if (!this.widgetType)
            throw new Error("Widget Type is not defined");

        return Q.fcall(this._reload.bind(this));
    };

    WidgetBase.prototype._reload = function () {
        var deferred = Q.defer();
        var self = this;
        var url = self.fetchPoint + '/' + self.widgetType + '/' + self.widgetName;
        $.ajax({
            url: url,
            type: 'get',
            contentType: 'application/json'
        }).success(function (data) {
            deferred.resolve(JSON.parse(data));
        }).error(function (error) {
            deferred.reject(error);
        });

        return deferred.promise;
    };

    return WidgetBase;
});