/**
 * Created by justin on 12/17/14.
 */

app.registerService(function (container) {
    var Q = container.getFunction('q');

    function WidgetBase() {
        this.fetchPoint = 'http://localhost:8065/api/widget';
        this._widgetId = '';
    }

    WidgetBase.prototype = Object.create(Object.prototype, {
        widgetId: {
            get: function () {
                return this._widgetId;
            },
            set: function (value) {
                this._widgetId = value;
                this._reload();
            }
        },
        column: {
            get: function () {
                return this._column;
            },
            set: function (value) {
                this._column = value;
                this._updatePosition();
            }
        },
        order: {
            get: function () {
                return this.order;
            },
            set: function (value) {
                this.order = value;
                this._updatePosition();
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

    WidgetBase.prototype.reloadWidget = function () {
        if (!this.widgetId)
            throw new Error("Widget Id is not defined");

        return Q.fcall(this._reload.bind(this));
    };

    WidgetBase.prototype._reload = function () {
        var deferred = Q.defer();
        var self = this;
        var url = self.fetchPoint + '/' + self.widgetId;
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

    WidgetBase.prototype._updatePosition = function () {
        var deferred = Q.defer();
        var self = this;
        var url = self.fetchPoint + '/' + self.widgetId + '/updatePosition';
        $.ajax({
            url: url,
            type: 'POST',
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