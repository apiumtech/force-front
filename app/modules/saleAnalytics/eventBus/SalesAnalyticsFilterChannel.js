/**
 * Created by justin on 2/4/15.
 */
define([
    'shared/services/EventBus'
], function (EventBusClass) {
    'use strict';
    var EventBus = EventBusClass.getInstance();

    function SalesAnalyticsFilterChannel(widgetName) {
        this.channel = SalesAnalyticsFilterChannel._initChannel(widgetName);

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


    /*
     * Date Filter Apply Signal
     */

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


    /*
     * User Filter Apply Signal
     */

    SalesAnalyticsFilterChannel.prototype.sendUserFilterApplySignal = function (filterValue) {
        this.sendFilterApplySignal(SalesAnalyticsFilterChannel.UserFilter, filterValue);
    };

    SalesAnalyticsFilterChannel.prototype.onUserFilterApplySignalReceived = function (callback) {
        this.listen(function (event) {
            if (event.filterApplied && event.filterName === SalesAnalyticsFilterChannel.UserFilter) {
                callback(event.filterValue);
            }
        });
    };



    SalesAnalyticsFilterChannel._initChannel = function (widgetName) {
        return EventBus.createChannel("SalesAnalyticsFilterChannel", widgetName || "Global");
    };

    SalesAnalyticsFilterChannel.newInstance = function (widgetName) {
        return new SalesAnalyticsFilterChannel(widgetName);
    };

    return SalesAnalyticsFilterChannel;
});