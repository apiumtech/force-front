/**
 * Created by justin on 12/17/14.
 */

define([
    'shared/services/ajax/AuthAjaxService',
    'shared/services/ajax/AjaxCacheService',
    'shared/services/StorageService',
    'moment',
    'config',
    'q'
], function (AjaxService, AjaxCacheService, StorageService, moment, Configuration, Q) {
    'use strict';

    function WidgetBase(ajaxService) {
        this.authAjaxService = ajaxService || AjaxService.newInstance();
        this.fetchPoint = null;
        this.widgetId = null;
        this.queries = {
            users: "",
            period: ""
        };

        this.storageService = StorageService.newInstance();


        // Saved Date Filter
        var savedDateFilter = this.storageService.retrieve('dateFilter', true);
        if(savedDateFilter === null) {
            savedDateFilter = {
                startDate: moment().subtract(Configuration.defaultDateSubtraction, "days").toDate().getTime(),
                endDate: moment().toDate().getTime()
            };
            this.storageService.store('dateFilter', savedDateFilter, true);
            var event = new CustomEvent('dateFilterChanged', {'detail': savedDateFilter});
            window.dispatchEvent(event);
        }
        this.addDateFilter(
            moment(savedDateFilter.startDate),
            moment(savedDateFilter.endDate)
        );

        // Saved User Filter
        var savedUserFilter = this.storageService.retrieve('userFilter', true);
        if(savedUserFilter !== null) {
            this.addUserFilter(savedUserFilter);
        }
    }

    WidgetBase.prototype.buildQueryString = function () {
        var queries = "";

        for (var prop in this.queries) {
            if (queries !== "") {
                queries += "&";
            }
            queries += prop + "=" + this.queries[prop];
        }

        return queries;
    };

    WidgetBase.prototype.setFetchEndPoint = function (endpoint) {
        if (!endpoint) {
            throw new Error("Input data cannot be null");
        }
        this.fetchPoint = Configuration.appendBaseUrl( endpoint );
    };

    WidgetBase.prototype.addQuery = function (key, value) {
        this.queries[key] = value;
    };

    WidgetBase.prototype.addDateFilter = function (dateStart, dateEnd) {
        /*this.addQuery(
            "period",
            moment(dateStart).startOf('day').unix() + "," + moment(dateEnd).endOf('day').unix()
        );*/

        dateStart = moment(dateStart).toDate();
        dateEnd = moment(dateEnd).toDate();
        var utcDateStart = Date.UTC(dateStart.getFullYear(), dateStart.getMonth(), dateStart.getDate(), 0, 0, 0, 0) / 1000;
        var utcDateEnd = Date.UTC(dateEnd.getFullYear(), dateEnd.getMonth(), dateEnd.getDate(), 23, 59, 59, 0) / 1000;
        this.addQuery(
            "period",
            utcDateStart.toString() +","+ utcDateEnd.toString()
        );
    };

    WidgetBase.prototype.addUserFilter = function (userIdsList) {
        this.storageService.store('userFilter', userIdsList, true);
        var event = new CustomEvent('userFilterChanged', {'detail': userIdsList});
        window.dispatchEvent(event);

        var nonComputableIds = this.storageService.retrieve('nonComputableUsers', true) || [];
        var correctedUserIdsList = userIdsList.filter(function(id){
            return nonComputableIds.indexOf(id) === -1;
        });
        this.addQuery("users", correctedUserIdsList);
    };

    WidgetBase.prototype.reloadWidget = function () {
        if (!this.getUrl()) {
            throw new Error("FetchPoint is not defined");
        }

        return this._reload();
    };

    WidgetBase.prototype.getUrl = function () {
        return this.fetchPoint;
    };

    WidgetBase.prototype._reload = function () {
        var url = this.getUrl();

        /*if (this.queries && !isEmptyObject(this.queries)) {
            var queries = this.buildQueryString();
            url += "?" + queries;
        }*/
        var requestData = {
          users: this.queries.users ? this.queries.users.join() : '',
          period: this.queries.period ? this.queries.period : '',
          grouping: this.queries.grouping ? this.queries.grouping : ''
        };
        var request = {
            url: url + '?users=&period=&grouping=',
            type: 'get',
            contentType: 'application/json',
            headers: {
                'x-fm-requestData': JSON.stringify(requestData)
            },
        };

        var cache = AjaxCacheService.getByParams(request);
        if( cache ) {
            return Q.fcall(function () {
                return cache;
            });
        } else {
            return this.authAjaxService.rawAjaxRequest(request).then(
                function(data) {
                    AjaxCacheService.putByParams(request, data);
                    return Q.fcall(function () {
                        return data;
                    });
                }
            );
        }
    };

    return WidgetBase;
});
