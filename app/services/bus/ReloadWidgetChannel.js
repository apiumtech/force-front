/**
 * Created by justin on 12/22/14.
 */
app.registerService(function (container) {
    var EventBus = container.getService("services/EventBus").getInstance();

    function ReloadWidget(widgetName) {
        this.channel = ReloadWidget._initChannel(widgetName).getOrElse("Cannot instantiate channel");

        this.send = this.channel.send;
        this.listen = this.channel.listen;
    }

    ReloadWidget.prototype.sendReloadSignal = function () {
        this.send({reloadWidget: true});
    };

    ReloadWidget.prototype.sendReloadCompleteSignal = function (error) {
        this.send({
            reloadCompleted: true,
            reloadError: error != undefined && error != null,
            errorMessage: error || null
        });
    };

    ReloadWidget._initChannel = function (widgetName) {
        return Some(EventBus.createChannel("ReloadWidget", widgetName || "Global"));
    };

    ReloadWidget.newInstance = function (widgetName) {
        return Some(new ReloadWidget(widgetName));
    };

    return ReloadWidget;
});