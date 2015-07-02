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

        $(window).on('resize', self.onWindowResize.bind(self));

        self.$scope.$on('destroy', function () {
            $(window).unbind('resize', self.onWindowResize.bind(self));
        });
    };

    AnalyticWidgetView.prototype.onWindowResize = function () {
        var self = this;
        if(self.info)
            self.paintChart();
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

    AnalyticWidgetView.prototype.paintChart = function(chartElement, options){
        var self = this;
        if(!self.info || !self.info.activity_index || !self.info.activity_index.chartData) return;

        chartElement ? self.chartElement = chartElement : self.chartElement = $(self.$element.find('#activity-index-pie'))[0];

        var chartService = self.chartService;

        if (!self.chart || !self.chartData) {

            self.chartData = chartService.arrayToDataTable(self.info.activity_index.chartData);

            self.chart = chartService.createChart(self.chartElement, 'pie');
        }

        if(!options)
        options = {
            legend: {position: 'none'},
            pieHole: 0.4,
            backgroundColor: 'transparent',
            enableInteractivity: false,
            colors: ['#FFB54D', '#ed8b00'],
            pieSliceText: "none"
        };

        chartService.drawChart(self.chart, self.chartData, options);
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