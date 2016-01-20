define([
    'shared/BaseView',
    'modules/saleAnalytics/eventBus/SalesAnalyticsFilterChannel',
    'modules/saleAnalytics/eventBus/WidgetAdministrationEventBus',
    'shared/services/StorageService',
    'shared/services/TranslatorService',
    'config',
    'jquery',
    'moment',
    'underscore'
], function (BaseView, SalesAnalyticsFilterChannel, WidgetAdministrationEventBus, StorageService, TranslatorService, config, $, moment, _) {
    'use strict';

    function SalesAnalyticsFilterView($scope, $rootScope) {
        BaseView.call(this, $scope, null, null);
        var self = this;
        self.filterChannel = SalesAnalyticsFilterChannel.newInstance("WidgetDecoratedPage");
        self.storageService = StorageService.newInstance();
        self.translator = TranslatorService.newInstance();


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
        var opts = {
            locale: {
                format: currentLocale.longDateFormat('L'),
                separator: " "+ String.fromCharCode(8594) +" ",
                applyClass: 'btn-green',
                applyLabel: "Apply",
                fromLabel: "From",
                toLabel: "To",
                cancelLabel: 'Cancel',
                daysOfWeek: currentLocale.weekdaysShort(now),
                firstDay: currentLocale.firstDayOfWeek(),
                monthNames: currentLocale.months(now)
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
                },
                'show.daterangepicker': function() {
                    $('#myDateRangePicker').data('daterangepicker').showCalendars();
                }
            }
        };

        opts.ranges = {};
        $rootScope.$on('i18nextLanguageChange', function() {
            [
                { label: self.translator.translate('commonText.dates.last7days'), dateRange: [moment().subtract(6, 'days'), moment()] },
                { label: self.translator.translate('commonText.dates.last15days'), dateRange: [moment().subtract(14, 'days'), moment()] },
                { label: self.translator.translate('commonText.dates.last30days'), dateRange: [moment().subtract(29, 'days'), moment()] },
                { label: self.translator.translate('commonText.dates.last90days'), dateRange: [moment().subtract(89, 'days'), moment()] },
                { label: self.translator.translate('commonText.dates.last180days'), dateRange: [moment().subtract(179, 'days'), moment()] }
            ].forEach(function(range){
                if(range.label && range.label.length > 0) {
                    opts.ranges[range.label] = range.dateRange;
                }
            });

            opts.locale.customRangeLabel = self.translator.translate('commonText.dates.customRange');

            self.$scope.opts = opts;
        });

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

    SalesAnalyticsFilterView.newInstance = function ($scope, $rootScope, $viewRepAspect, $logErrorAspect) {
        var view = new SalesAnalyticsFilterView($scope, $rootScope);

        return view._injectAspects($viewRepAspect, $logErrorAspect);
    };

    return SalesAnalyticsFilterView;
});