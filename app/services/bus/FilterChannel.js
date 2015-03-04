/**
 * Created by justin on 3/4/15.
 */
app.registerService(function (container) {
    var EventBus = container.getService("services/EventBus").getInstance();

    function FilterChannel(tableName) {
        this.channel = FilterChannel._initChannel(tableName).getOrElse(throwException("Cannot instantiate channel"));

        this.send = this.channel.send;
        this.listen = this.channel.listen;
    }

    FilterChannel.prototype.sendOwnerToggleSignal = function (ownerFilter) {
        this.send({
            ownerToggle: true,
            owner: ownerFilter
        });
    };

    FilterChannel.prototype.onOwnerToggleReceived = function (callback) {
        this.listen(function (event) {
            if (event.ownerToggle) {
                callback(event.owner);
            }
        });
    };

    FilterChannel.prototype.sendQueryingData = function (querying) {
        this.send({
            searching: true,
            value: querying
        });
    };

    FilterChannel.prototype.onQueryingData = function (callback) {
        this.listen(function (event) {
            if (event.searching) {
                callback(event.value);
            }
        })
    };

    FilterChannel._initChannel = function (tableName) {
        return Some(EventBus.createChannel("LocalTableFilter", tableName || "Global"));
    };

    FilterChannel.newInstance = function (tableName) {
        return Some(new FilterChannel(tableName));
    };

    return FilterChannel;
});