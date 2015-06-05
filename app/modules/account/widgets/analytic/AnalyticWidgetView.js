define([
    'shared/BaseView',
    'shared/services/bus/AccountDetailWidgetEventBus',
    'modules/account/widgets/analytic/AnalyticWidgetPresenter',
    'shared/services/GoogleChartService',
    'jquery'
], function (BaseView, AccountDetailWidgetEventBus, AnalyticWidgetPresenter, GoogleChartService, $) {
    'use strict';

    function AnalyticWidgetView($scope, $element, presenter, eventBus, googleChartService) {
        presenter = presenter || new AnalyticWidgetPresenter();
        BaseView.call(this, $scope, null, presenter);
        this.$element = $element;
        this.eventBus = eventBus || AccountDetailWidgetEventBus.newInstance();
        this.chartService = googleChartService || GoogleChartService.newInstance();
        this.configureEvents();
    }

    AnalyticWidgetView.inherits(BaseView, {
        info: {
            get: function () {
                return this.$scope.info;
            },
            set: function (value) {
                this.$scope.info = value;
            }
        },
        accountId: {
            get: function () {
                return this.$scope.accountId;
            },
            set: function (value) {
                this.$scope.accountId = value;
            }
        }
    });

    AnalyticWidgetView.prototype.configureEvents = function () {
        var self = this;
        var scope = self.$scope;
        self.eventBus.onReloadCommandReceived(self.onReloadCommandReceived.bind(self));

        scope.$watch('accountId', self.onAccountIDUpdated.bind(self));
        scope.$on("$destroy", self.onDestroyed.bind(self));
    };

    AnalyticWidgetView.prototype.onAccountIDUpdated = function () {
        var self = this;
        if (self.accountId) {
            self.eventBus.sendReloadCommand();
        }
    };

    AnalyticWidgetView.prototype.onReloadCommandReceived = function () {
        var self = this;
        self.loadData();
    };

    AnalyticWidgetView.prototype.loadData = function () {
        var self = this;
        console.log("before event load data", self.eventBus);
        self.event.loadData(self.accountId);
    };

    AnalyticWidgetView.prototype.onLoadDataSuccess = function (data) {
        var self = this;
        self.eventBus.sendReloadCompleteCommand();
        self.decorateData(data);
    };

    AnalyticWidgetView.prototype.decorateData = function (data) {
        var self = this;
        self.info = data;
        self.paintChart();
    };

    AnalyticWidgetView.prototype.paintChart = function(data){
        var self = this;
        var pieHolder = self.$element.find('#activity-index-pie');
        var data = [
            ['Task', 'Hours per Day'],
            ['Work',     11],
            ['Eat',      2],
            ['Commute',  2],
            ['Watch TV', 2],
            ['Sleep',    7]
        ];
        var options = {
            legend: {position: 'none'}
        };
        var chartData = self.chartService.arrayToDataTable(data);
        var chart = self.chartService.createChart($(pieHolder)[0], 'pie');
        self.chartService.drawChart(chart, chartData, options);
    };

    AnalyticWidgetView.prototype.onDestroyed = function () {
        var self = this;
        self.eventBus.unsubscribeReloadCommand();
        self.eventBus.unsubscribeReloadCompleteCommand();
    };

    AnalyticWidgetView.prototype.showError = function () {

    };

    AnalyticWidgetView.newInstance = function ($scope, $element, $viewRepaintAspect, $logErrorAspect) {
        var view = new AnalyticWidgetView($scope, $element);
        return view._injectAspects($viewRepaintAspect, $logErrorAspect);
    };

    return AnalyticWidgetView;
});