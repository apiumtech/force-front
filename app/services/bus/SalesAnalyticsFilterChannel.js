/**
 * Created by justin on 2/4/15.
 */
app.registerService(function (container) {
    var EventBus = container.getService("services/EventBus").getInstance();

    function SalesAnalyticsFilterChannel(widgetName) {
        this.channel = SalesAnalyticsFilterChannel._initChannel(widgetName).getOrElse(throwException("Cannot instantiate channel"));

        this.send = this.channel.send;
        this.listen = this.channel.listen;
    }

    SalesAnalyticsFilterChannel.DateFilter = "DateFilter";
    SalesAnalyticsFilterChannel.UserFilter = "UserFilter";

    SalesAnalyticsFilterChannel.prototype.sendFilterApplySignal = function (filterName, filterValue) {
        this.send({
            filterApplied: true,
            filterName: filterName,
            filterValue: filterValue
        });
    };

    SalesAnalyticsFilterChannel.prototype.sendDateFilterApplySignal = function (filterValue) {
        this.sendFilterApplySignal(SalesAnalyticsFilterChannel.DateFilter, filterValue);
    };

    SalesAnalyticsFilterChannel.prototype.onDateFilterApplySignalReceived = function (callback) {
        this.listen(function (event) {
            if (event.filterApplied && event.filterName === SalesAnalyticsFilterChannel.DateFilter) {
                callback(event.filterValue);
            }
        });
    };

    SalesAnalyticsFilterChannel.prototype.onUserFilterApplySignalReceived = function (callback) {
        this.listen(function (event) {
            if (event.filterApplied && event.filterName === SalesAnalyticsFilterChannel.UserFilter) {
                callback(event.filterValue);
            }
        });
    };

    SalesAnalyticsFilterChannel._initChannel = function (widgetName) {
        return Some(EventBus.createChannel("SalesAnalyticsFilterChannel", widgetName || "Global"));
    };

    SalesAnalyticsFilterChannel.newInstance = function (widgetName) {
        return Some(new SalesAnalyticsFilterChannel(widgetName));
    };

    return SalesAnalyticsFilterChannel;
});