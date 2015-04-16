/**
 * Created by justin on 16/4/15.
 */
app.registerService(function (container) {
    var EventBus = container.getService("services/EventBus").getInstance();

    function ScrollEventBus(channel) {
        this.channel = channel;

        this.send = this.channel.send;
        this.listen = this.channel.listen;
        this.unsubscribe = this.channel.unsubscribe;
    }

    ScrollEventBus.prototype.sendScrolledToBottomEvent = function () {
        this.send({scrolledToBottom: true});
    };

    ScrollEventBus.prototype.onScrolledToBottom = function (callback) {
        this.listen(function (event) {
            if (event.scrolledToBottom) {
                callback(event);
            }
        });
    };

    ScrollEventBus.getInstance = function () {
        return new ScrollEventBus(EventBus.createChannel("ScrollEventBus", "Global"));
    };

    return ScrollEventBus;
});