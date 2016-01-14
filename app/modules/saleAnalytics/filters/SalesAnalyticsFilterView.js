define([
    'shared/BaseView',
    'modules/saleAnalytics/eventBus/SalesAnalyticsFilterChannel',
    'modules/saleAnalytics/eventBus/WidgetAdministrationEventBus',
    'shared/services/StorageService',
    'config',
    'jquery',
    'moment',
    'underscore'
], function (BaseView, SalesAnalyticsFilterChannel, WidgetAdministrationEventBus, StorageService, config, $, moment, _) {
    'use strict';

    function SalesAnalyticsFilterView($scope) {
        BaseView.call(this, $scope, null, null);
        var self = this;
        self.filterChannel = SalesAnalyticsFilterChannel.newInstance("WidgetDecoratedPage");
        self.storageService = StorageService.newInstance();


        var savedDateFilter = self.storageService.retrieve('dateFilter', true);
        if(savedDateFilter === null) {
            savedDateFilter = {
                startDate: moment().subtract(config.defaultDateSubtraction, "days").toDate().getTime(),
                endDate: moment().toDate().getTime()
            };
            self.storageService.store('dateFilter', savedDateFilter, true);
        }

        self.$scope.date = {
            startDate: moment(savedDateFilter.startDate),
            endDate: moment(savedDateFilter.endDate)
        };


        var currentLocale = moment.localeData();
        var now = moment();
        self.$scope.opts = {
            locale: {
                format: currentLocale.longDateFormat('L'),
                separator: " "+ String.fromCharCode(8594) +" ",
                applyClass: 'btn-green',
                applyLabel: "Apply",
                fromLabel: "From",
                toLabel: "To",
                cancelLabel: 'Cancel',
                customRangeLabel: 'Custom Range',
                daysOfWeek: currentLocale.weekdaysShort(now),
                firstDay: currentLocale.firstDayOfWeek(),
                monthNames: currentLocale.months(now)
            },
            ranges: {
                'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                'Last 15 Days': [moment().subtract(14, 'days'), moment()],
                'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                'Last 90 Days': [moment().subtract(89, 'days'), moment()],
                'Last 180 Days': [moment().subtract(179, 'days'), moment()]
            },
            minDate: moment('2010-01-01'),
            maxDate: moment(),
            eventHandlers: {
                'apply.daterangepicker': function(ev, picker){
                    self.storageService.store('dateFilter', {
                        startDate: self.$scope.date.startDate.toDate().getTime(),
                        endDate: self.$scope.date.endDate.toDate().getTime()
                    }, true);
                    self.filterChannel.sendDateFilterApplySignal({
                        dateStart: self.$scope.date.startDate.toDate(),
                        dateEnd: self.$scope.date.endDate.toDate()
                    });
                }
            }
        };

        SalesAnalyticsFilterView.configureEvents(this);
    }

    SalesAnalyticsFilterView.inherits(BaseView, {});

    SalesAnalyticsFilterView.configureEvents = function (instance) {
        var self = instance;
        self.fn.toggleDateRangePicker = function() {
            if($('#myDateRangePicker').data('daterangepicker').isShowing){
                //$('#myDateRangePicker').data('daterangepicker').hide();
            } else {
                $('#myDateRangePicker').data('daterangepicker').show();
            }
        };
    };

    SalesAnalyticsFilterView.prototype.showError = function (error) {
        window.console.error(error);
    };

    SalesAnalyticsFilterView.newInstance = function ($scope, $viewRepAspect, $logErrorAspect) {
        var view = new SalesAnalyticsFilterView($scope);

        return view._injectAspects($viewRepAspect, $logErrorAspect);
    };

    return SalesAnalyticsFilterView;
});