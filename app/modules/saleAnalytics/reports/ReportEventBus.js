define([
    'shared/services/EventBase'
], function (EventBase) {
    'use strict';

    function ReportEventBus() {
        EventBase.call(this);
    }

    ReportEventBus.inherits(EventBase);

    ReportEventBus.prototype.onAllReportTabSelected = function () {
    };
    ReportEventBus.prototype.fireAllReportTabSelected = function () {
    };
    ReportEventBus.prototype.unsubscribeAllReportTabSelected = function () {
    };

    ReportEventBus.prototype.onFolderReportSelected = function () {
    };
    ReportEventBus.prototype.fireFolderReportSelected = function () {
    };
    ReportEventBus.prototype.unsubscribeFolderReportSelected = function () {
    };

    ReportEventBus.prototype.onFolderReportOpenRequested = function () {
    };
    ReportEventBus.prototype.fireFolderReportOpenRequested = function () {
    };
    ReportEventBus.prototype.unsubscribeFolderReportOpenRequested = function () {
    };

    ReportEventBus.prototype.onFavReportTabSelected = function () {
    };
    ReportEventBus.prototype.fireFavReportTabSelected = function () {
    };
    ReportEventBus.prototype.unsubscribeFavReportTabSelected = function () {
    };

    ReportEventBus.prototype.onSearchActivated = function () {
    };
    ReportEventBus.prototype.fireSearchActivated = function () {
    };
    ReportEventBus.prototype.unsubscribeSearchActivated = function () {
    };

    ReportEventBus.prototype.onSearchDeactivated = function () {
    };
    ReportEventBus.prototype.fireSearchDeactivated = function () {
    };
    ReportEventBus.prototype.unsubscribeSearchDeactivated = function () {
    };

    ReportEventBus.prototype.onSearchReportTabSelected = function () {
    };
    ReportEventBus.prototype.fireSearchReportTabSelected = function () {
    };
    ReportEventBus.prototype.unsubscribeSearchReportTabSelected = function () {
    };

    ReportEventBus.getInstance = function () {
        if (ReportEventBus.__instance) {
            return ReportEventBus.__instance;
        }

        return (ReportEventBus.__instance = new ReportEventBus());
    };

    return ReportEventBus;
});