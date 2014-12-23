/**
 * Created by justin on 12/22/14.
 */
app.registerService(function (container) {
    var EventBus = container.getService("services/EventBus").getInstance();

    function ReloadWidget() {

    }

    ReloadWidget.newInstance = function (widgetName) {
        return Some(EventBus.createChannel("ReloadWidget", widgetName || "Global"));
    };

    return {newInstance: ReloadWidget.newInstance};
});