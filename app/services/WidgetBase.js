/**
 * Created by justin on 12/17/14.
 */

app.register(function () {
    function WidgetBase() {
        this._widgetName = null;
        this._widgetType = null;
        this._fetchPoint = null;
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
                this.reload();
            }
        }
    });

    WidgetBase.prototype.reload = function () {
    };

    return WidgetBase;
});