/**
 * Created by justin on 12/22/14.
 */
app.registerService(function (container) {
    var EventBus = container.getService("services/EventBus").getInstance();

    function ReloadWidget() {

    }

    ReloadWidget.newInstance = function () {
        return Some(EventBus.createChannel("ReloadWidget", "Global"));
    };

    return {newInstance: ReloadWidget.newInstance};
});