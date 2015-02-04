/**
 * Created by justin on 12/22/14.
 */
app.registerService(function (container) {
    var EventBus = container.getService("services/EventBus").getInstance();

    function WidgetEventBus(widgetName) {
        this.channel = WidgetEventBus._initChannel(widgetName).getOrElse(throwException("Cannot instantiate channel"));

        this.send = this.channel.send;
        this.listen = this.channel.listen;
    }

    WidgetEventBus.prototype.sendReloadSignal = function () {
        this.send({reloadWidget: true});
    };

    WidgetEventBus.prototype.onReloadSignalReceived = function (callback) {
        this.listen(function (event) {
            if (event.reloadWidget) {
                callback(event);
            }
        });
    };

    WidgetEventBus.prototype.sendFilterApply = function (filterName, filterValue) {
        this.send({
            filterApplied: true,
            filterName: filterName,
            filterValue: filterValue
        })
    };

    WidgetEventBus.prototype.onDateFilterApplied = function (callback) {
        this.listen(function (event) {
            if (event.filterApplied) {
                callback(event.filterName, event.filterValue);
            }
        });
    };

    WidgetEventBus.prototype.sendReloadCompleteSignal = function (error) {
        this.send({
            reloadCompleted: true,
            reloadError: error != undefined && error != null,
            errorMessage: error || null
        });
    };

    WidgetEventBus.prototype.onReloadCompleteSignalReceived = function (callback) {
        this.listen(function (event) {
            if (event.reloadCompleted) {
                callback(event.reloadError, event.errorMessage);
            }
        });
    };

    WidgetEventBus._initChannel = function (widgetName) {
        return Some(EventBus.createChannel("WidgetEventBus", widgetName || "Global"));
    };

    WidgetEventBus.newInstance = function (widgetName) {
        return Some(new WidgetEventBus(widgetName));
    };

    return WidgetEventBus;
});