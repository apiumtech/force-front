/**
 * Created by justin on 3/4/15.
 */
app.registerService(function (container) {
    var EventBus = container.getService("services/EventBus").getInstance();

    function FilterChannel(tableName) {
        this.channel = FilterChannel._initChannel(tableName);

        this.send = this.channel.send;
        this.listen = this.channel.listen;
    }

    FilterChannel.prototype.sendEnvironmentToggleSignal = function (environmentFilter) {
        this.send({
            environmentToggle: true,
            value: environmentFilter
        });
    };

    FilterChannel.prototype.onEnvironmentToggleReceived = function (callback) {
        this.listen(function (event) {
            if (event.environmentToggle) {
                callback(event.value);
            }
        });
    };

    FilterChannel.prototype.sendViewChangedSignal = function (view) {
        console.log("signal", view);
        this.send({
            viewChanged: true,
            value: view
        });
    };

    FilterChannel.prototype.onViewChangedReceived = function (callback) {
        this.listen(function (event) {
            if (event.viewChanged) {
                callback(event.value);
            }
        });
    };

    FilterChannel.prototype.sendAccountTypeToggledSignal = function (accountType) {
        this.send({
            accountTypesToggled: true,
            value: accountType
        });
    };

    FilterChannel.prototype.onAccountTypeToggledReceived = function (callback) {
        this.listen(function (event) {
            if (event.accountTypesToggled) {
                callback(event.value);
            }
        });
    };

    FilterChannel.prototype.sendOwnerToggleSignal = function (ownerFilter) {
        this.send({
            ownerToggle: true,
            value: ownerFilter
        });
    };

    FilterChannel.prototype.onOwnerToggleReceived = function (callback) {
        this.listen(function (event) {
            if (event.ownerToggle) {
                callback(event.value);
            }
        });
    };

    FilterChannel.prototype.sendQueryingData = function (querying) {
        this.send({
            searching: true,
            queryString: querying
        });
    };

    FilterChannel.prototype.onQueryingData = function (callback) {
        this.listen(function (event) {
            if (event.searching) {
                callback(event.queryString);
            }
        })
    };

    FilterChannel._initChannel = function (tableName) {
        return EventBus.createChannel("LocalTableFilter", tableName || "Global");
    };

    FilterChannel.newInstance = function (tableName) {
        return new FilterChannel(tableName);
    };

    return FilterChannel;
});