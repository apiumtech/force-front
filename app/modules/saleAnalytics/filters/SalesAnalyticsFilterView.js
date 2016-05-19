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

    function SalesAnalyticsFilterView($scope) {
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
            var event = new CustomEvent('dateFilterChanged', {'detail': savedDateFilter});
            window.dispatchEvent(event);
        }

        $scope.datePicker = $scope.datePicker || {};
        $scope.datePicker.date = {
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
                applyLabel: self.translator.translate('commonText.Apply'),
                fromLabel: self.translator.translate('label_from'),
                toLabel: self.translator.translate('label_until'),
                cancelLabel: self.translator.translate('action_cancel'),
                daysOfWeek: currentLocale.weekdaysShort(now),
                firstDay: currentLocale.firstDayOfWeek(),
                monthNames: currentLocale.months(now),
                customRangeLabel: self.translator.translate('commonText.dates.customRange')
            },
            autoApply: true,
            minDate: moment('2010-01-01'),
            maxDate: moment(),
            eventHandlers: {
                'apply.daterangepicker': function(ev, picker){
                    self.storageService.store('dateFilter', {
                        startDate: $scope.datePicker.date.startDate.toDate().getTime(),
                        endDate: $scope.datePicker.date.endDate.toDate().getTime()
                    }, true);
                    self.filterChannel.sendDateFilterApplySignal({
                        dateStart: $scope.datePicker.date.startDate.toDate(),
                        dateEnd: $scope.datePicker.date.endDate.toDate()
                    });
                },
                'show.daterangepicker': function() {
                    $('#myDateRangePicker').data('daterangepicker').showCalendars();
                    $('.daterangepicker.dropdown-menu .ranges > ul > li:last-child').hide();
                }
            }
        };



        opts.ranges = {};

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

        $scope.datePicker.opts = opts;


        setTimeout(function(){
          try{
            var datePickerInstance = $('#myDateRangePicker').data('daterangepicker');
            datePickerInstance.container.find('.applyBtn, .cancelBtn').removeClass('hide');
          }catch(err){/* to avoid tests failing */}
        }, 1000);

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
