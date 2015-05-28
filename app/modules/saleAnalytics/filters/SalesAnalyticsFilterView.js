/**
 * Created by justin on 2/3/15.
 */

define([
    'shared/BaseView',
    'modules/saleAnalytics/eventBus/SalesAnalyticsFilterChannel',
    'modules/saleAnalytics/filters/SalesAnalyticsFilterModel',
    'modules/saleAnalytics/filters/SalesAnalyticsFilterPresenter',
    'modules/saleAnalytics/eventBus/UserTreeListEventBus',

    'jquery',
    'moment',
    'underscore'
], function (BaseView, SalesAnalyticsFilterChannel, SalesAnalyticsFilterModel, SalesAnalyticsFilterPresenter, UserTreeListEventBusClass,
             $, moment, _) {
    'use strict';

    function SalesAnalyticsFilterView($scope, $filter, $model, $presenter) {
        BaseView.call(this, $scope, $model, $presenter);
        this.filter = $filter;
        this.filterChannel = SalesAnalyticsFilterChannel.newInstance("WidgetDecoratedPage");
        var self = this;
        self.resetDate = true;
        self.defaultPreviousDay = 30;
        self.$scope.datePickerFormat = "dd/MM/yyyy";
        self.momentFormat = 'DD/MM/YYYY';
        self.$scope.dateOptionRange = [7, 15, 30, 90];
        self.$scope.multipleSelection = true;
        self.$scope.isoStringDateStart = function () {
            return self.$scope.dateRangeStart.toString();
        };
        self.$scope.isoStringDateEnd = function () {
            return self.$scope.dateRangeEnd.toString();
        };
        self.$scope.isoStringDateEndLimit = function () {
            var date = new Date(self.$scope.dateRangeStart);
            date = date.setDate(date.getDate() + 1);
            return new Date(date).toString();
        };
        self.$scope.isoStringMaxDateLimit = function () {
            return new Date().toString();
        };

        self.$scope.isoStringMaxDateFromLimit = function () {
            var date = new Date(self.$scope.dateRangeEnd);
            date = date.setDate(date.getDate() - 1);
            return new Date(date).toString();
        };

        SalesAnalyticsFilterView.configureEvents(this);
    }

    SalesAnalyticsFilterView.prototype = Object.create(BaseView.prototype, {
        dateRangeFilterOpened: {
            get: function () {
                return this.$scope.dateRangeFilterOpened || (this.$scope.dateRangeFilterOpened = false);
            },
            set: function (value) {
                this.$scope.dateRangeFilterOpened = value;
            }
        },
        userFilterOpened: {
            get: function () {
                return this.$scope.userFilterOpened || (this.$scope.userFilterOpened = false);
            },
            set: function (value) {
                this.$scope.userFilterOpened = value;
            }
        },

        dateRangeStart: {
            get: function () {
                return this.$scope.dateRangeStart;
            },
            set: function (value) {
                this.$scope.dateRangeStart = value;
            }
        },
        dateRangeEnd: {
            get: function () {
                return this.$scope.dateRangeEnd;
            },
            set: function (value) {
                this.$scope.dateRangeEnd = value;
            }
        },
        dateRangePlaceholder: {
            get: function () {
                return this.$scope.dateRangePlaceholder;
            },
            set: function (value) {
                this.$scope.dateRangePlaceholder = value;
            }
        },
        displayDateStart: {
            get: function () {
                return this.$scope.displayDateStart || (this.$scope.displayDateStart = this.fn.getFormattedDate(this.dateRangeStart));
            },
            set: function (value) {
                this.$scope.displayDateStart = value;
            }
        },
        displayDateEnd: {
            get: function () {
                return this.$scope.displayDateEnd;
            },
            set: function (value) {
                this.$scope.displayDateEnd = value;
            }
        }
    });

    SalesAnalyticsFilterView.configureEvents = function (instance) {
        var self = instance;

        self.$scope.$watch('displayDateStart', function (value) {
            var _date = moment(value, self.momentFormat);
            if (!_date.isValid()) {
                console.error("Input date is not valid");
                return;
            }
            self.dateRangeStart = _date.toDate();
            self.validateDates();
        });

        self.$scope.$watch('displayDateEnd', function (value) {
            var _date = moment(value, self.momentFormat);
            if (!_date.isValid()) {
                console.error("Input date is not valid");
                return;
            }

            self.dateRangeEnd = _date.toDate();
            self.validateDates();
        });

        self.fn.openDatePickerStart = function (event) {
            event.stopPropagation();
            self.datePickerStartOpened = true;
            self.datePickerEndOpened = false;
        };

        self.fn.openDatePickerEnd = function (event) {
            event.stopPropagation();
            self.datePickerEndOpened = true;
            self.datePickerStartOpened = false;
        };

        self.fn.closeDatePickers = function (event) {
            event.stopPropagation();
            $(document).find('.force-datepicker-calendar').removeClass('force-datepicker-open');
        };

        self.fn.loadPreviousLastDaysFilter = function (days, event) {
            self.dateRangeEnd = new Date();
            self.dateRangeStart = self.fn.getPreviousDate(days, self.dateRangeEnd);
            self.displayDateEnd = self.fn.getFormattedDate(self.dateRangeEnd);
            self.displayDateStart = self.fn.getFormattedDate(self.dateRangeStart);
            self.fn.applyDateFilter();
        };

        self.fn.dateFilterToggled = function (isOpened) {
            if (!isOpened) {
                if (!self.resetDate) {
                    self.resetDate = true;
                    return;
                }
                self.fn.resetDate();
            }
        };

        self.fn.validateDateInput = function (event) {
            if ([46, 8, 9, 27, 13, 191, 111].indexOf(event.keyCode) !== -1 ||
                    // Allow: Ctrl+A
                (event.keyCode == 65 && event.ctrlKey === true) ||
                    // Allow: home, end, left, right, down, up
                (event.keyCode >= 35 && event.keyCode <= 40)) {
                // let it happen, don't do anything
                return;
            }

            // Ensure that it is a number and stop the keypress
            if ((event.shiftKey || (event.keyCode < 48 || event.keyCode > 57)) && (event.keyCode < 96 || event.keyCode > 105)) {
                event.preventDefault();
            }
        };

        self.fn.getPreviousDate = function (days, from) {
            if (!from || !(from instanceof Date))
                return null;

            return moment(from).subtract(days, 'days').toDate();
        };

        self.fn.getDatePlaceholder = function () {
            return self.dateRangePlaceholder = self.fn.getFormattedDate(self.dateRangeStart) + '-' + self.fn.getFormattedDate(self.dateRangeEnd);
        };

        self.fn.getFormattedDate = function (date) {
            return moment(date).format(self.momentFormat);
        };

        self.fn.initializeFilters = function () {
            self.fn.resetDate();
        };

        self.fn.applyDateFilter = function () {
            console.log('applying date filter');
            self.resetDate = false;
            self.dateRangeFilterOpened = false;
            self.fn.getDatePlaceholder();
            self.filterChannel.sendDateFilterApplySignal({
                dateStart: self.dateRangeStart,
                dateEnd: self.dateRangeEnd
            });
        };

        self.fn.cancelFilter = function () {
            self.resetDate = true;
            self.dateRangeFilterOpened = false;
        };

        self.fn.resetDate = function () {
            self.dateRangeEnd = new Date();
            self.dateRangeStart = self.fn.getPreviousDate(self.defaultPreviousDay, self.dateRangeEnd);
            self.displayDateEnd = self.fn.getFormattedDate(self.dateRangeEnd);
            self.displayDateStart = self.fn.getFormattedDate(self.dateRangeStart);
            self.fn.getDatePlaceholder();
        };

    };

    SalesAnalyticsFilterView.prototype.validateDates = function () {
        var self = this;
        if (moment(self.dateRangeStart).isAfter(self.dateRangeEnd)) {
            self.dateRangeEnd = new Date(self.dateRangeStart.toString());
            self.displayDateEnd = self.fn.getFormattedDate(self.dateRangeEnd);
        }
    };

    SalesAnalyticsFilterView.prototype.showError = function (error) {
        console.error(error);
    };

    SalesAnalyticsFilterView.newInstance = function ($scope, $filter, $model, $presenter, $viewRepAspect, $logErrorAspect) {
        var model = $model || SalesAnalyticsFilterModel.newInstance();
        var presenter = $presenter || SalesAnalyticsFilterPresenter.newInstance();

        var view = new SalesAnalyticsFilterView($scope, $filter, model, presenter);

        return view._injectAspects($viewRepAspect, $logErrorAspect);
    };

    return SalesAnalyticsFilterView;
});