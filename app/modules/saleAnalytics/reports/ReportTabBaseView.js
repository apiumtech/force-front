define([
    'modules/saleAnalytics/widgets/WidgetBaseView',
    'modules/saleAnalytics/reports/ReportEventBus',
    'modules/widgets/BaseWidgetEventBus'
], function (WidgetBaseView, ReportEventBus, BaseWidgetEventBus) {
    'use strict';

    function ReportTabBaseView(scope, presenter, eventBus) {
        WidgetBaseView.call(this, scope, null, presenter);
        this.reportEventBus = eventBus || ReportEventBus.getInstance();
        this.configureEvents();
    }

    ReportTabBaseView.inherits(WidgetBaseView, {
        reports: {
            get: function () {
                return this.$scope.reports;
            },
            set: function (value) {
                this.$scope.reports = value;
            }
        },
        isLoading: {
            get: function () {
                return this.$scope.isLoading;
            },
            set: function (value) {
                this.$scope.isLoading = value;
            }
        },
        eventChannel: {
            get: function () {
                return this.$scope.eventChannel || (this.$scope.eventChannel = BaseWidgetEventBus.newInstance());
            },
            set: function (value) {
                this.$scope.eventChannel = value;
            }
        }
    });

    ReportTabBaseView.prototype.configureEvents = function () {
        var self = this;
        var eventChannel = self.eventChannel;

        self.event.onDateFilterApplied = function (filterValue) {

        };

        eventChannel.onReloadCommandReceived(self.onReloadCommandReceived.bind(self));
    };

    ReportTabBaseView.prototype.reloadReports = function () {
        this.fn.loadReports();
    };

    ReportTabBaseView.prototype.onReloadWidgetSuccess = function (data) {

        var self = this;
        self.reports = data;
    };


    return ReportTabBaseView;
});