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
        this.unsubscribers = [];

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
        var unsubscribeHandler = this.listen(function (event) {
            if (event.filterApplied && event.filterName === SalesAnalyticsFilterChannel.DateFilter) {
                callback(event.filterValue);
            }
        });
        this.unsubscribers.push({
            callback: callback,
            unsubscribe: unsubscribeHandler
        });
    };


    /*
     * User Filter Apply Signal
     */

    SalesAnalyticsFilterChannel.prototype.sendUserFilterApplySignal = function (filterValue) {
        this.sendFilterApplySignal(SalesAnalyticsFilterChannel.UserFilter, filterValue);
    };

    SalesAnalyticsFilterChannel.prototype.onUserFilterApplySignalReceived = function (callback) {
        var unsubscribeHandler = this.listen(function (event) {
            if (event.filterApplied && event.filterName === SalesAnalyticsFilterChannel.UserFilter) {
                callback(event.filterValue);
            }
        });
        this.unsubscribers.push({
            callback: callback,
            unsubscribe: unsubscribeHandler
        });
    };


    /*
     * Unsubscriber
     */
    SalesAnalyticsFilterChannel.prototype.unsubscribeCallback = function (callback) {
        var foundIndex = -1;
        this.unsubscribers.forEach(function(unsubscriber, index){
            if(unsubscriber.callback === callback){
                unsubscriber.unsubscribe();
                foundIndex = index;
            }
        });
        if(foundIndex > -1){
            this.unsubscribers.splice(foundIndex, 1);
        }
    };



    SalesAnalyticsFilterChannel._initChannel = function (widgetName) {
        return EventBus.createChannel("SalesAnalyticsFilterChannel", widgetName || "Global");
    };

    SalesAnalyticsFilterChannel.newInstance = function (widgetName) {
        return new SalesAnalyticsFilterChannel(widgetName);
    };

    return SalesAnalyticsFilterChannel;
});