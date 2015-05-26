define([
    'shared/services/EventBase'
], function (EventBase) {
    'use strict';

    function ReportEventBus() {
        EventBase.call(this);
    }

    ReportEventBus.prototype = Object.create(EventBase.prototype);

    ReportEventBus.prototype.onAllReportTabSelected=function(){};
    ReportEventBus.prototype.fireAllReportTabSelected=function(){};
    ReportEventBus.prototype.unsubscribeAllReportTabSelected=function(){};

    ReportEventBus.prototype.onFavReportTabSelected=function(){};
    ReportEventBus.prototype.fireFavReportTabSelected=function(){};
    ReportEventBus.prototype.unsubscribeFavReportTabSelected=function(){};

    ReportEventBus.prototype.onSearchReportTabSelected=function(){};
    ReportEventBus.prototype.fireSearchReportTabSelected=function(){};
    ReportEventBus.prototype.unsubscribeSearchReportTabSelected=function(){};

    ReportEventBus.getInstance = function () {
        if (ReportEventBus.__instance) {
            return ReportEventBus.__instance;
        }

        return (ReportEventBus.__instance = new ReportEventBus());
    };

    return ReportEventBus;
});