/**
 * Created by justin on 12/22/14.
 */
app.registerService(function (container) {
    var EventBus = container.getService("services/EventBus").getInstance();

    function WidgetEventBus(widgetName) {
        this.channel = WidgetEventBus._initChannel(widgetName).getOrElse("Cannot instantiate channel");

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
        })
    };

    WidgetEventBus.prototype.sendMoveSignal = function (oldPosition, newPosition, moveEvent) {
        this.send({widgetMoved: true, oldPosition: oldPosition, newPosition: newPosition, moveEvent: moveEvent});
    };

    function notSamePosition(newPosition, oldPosition){
        if((newPosition.row === oldPosition.row) && (newPosition.order === oldPosition.order) && (newPosition.column === oldPosition.column)){
            return false;
        }
        return true;
    }

    WidgetEventBus.prototype.onMoveSignalReceived = function (callback) {
        this.listen(function (event) {
            if (event.widgetMoved && (undefined !== event.oldPosition) && notSamePosition(event.newPosition,event.oldPosition) && (undefined !== event.newPosition)) {
                callback(event.oldPosition, event.newPosition, event.moveEvent);
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