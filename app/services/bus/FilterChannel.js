/**
 * Created by kevin on 11/5/14.
 */
app.registerService(function (container) {
    var EventBus = container.getService("services/EventBus").getInstance();

    function FilterChannel() {

    }

    FilterChannel.newInstance = function (tableName) {
        return Some(EventBus.createChannel("LocalTableFilter", tableName || "Global"));
    };

    return {newInstance: FilterChannel.newInstance};
});