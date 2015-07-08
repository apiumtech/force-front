/**
 * Created by justin on 4/2/15.
 */
define([
    'shared/BaseView',
    'moment',
    'modules/account/filters/datetimeTypeFilter/DatetimeTypeFilterPresenter',
    'jquery'
], function (BaseView, moment, DatetimeTypeFilterPresenter, $) {

    function DatetimeTypeFilterView($scope, $element, $model, $presenter) {
        this.$element = $element;
        BaseView.call(this, $scope, $model, $presenter);
        var self = this;
        self.resetDate = true;
        self.defaultPreviousDay = 30;
        self.momentFormat = 'DD/MM/YYYY';
        self.$scope.datePickerFormat = "dd/MM/yyyy";
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

        this.configureEvents();
    }

    DatetimeTypeFilterView.inherits(BaseView, {
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
                return this.$scope.dateRangeStart || new Date();
            },
            set: function (value) {
                this.$scope.dateRangeStart = value;
            }
        },
        dateRangeEnd: {
            get: function () {
                return this.$scope.dateRangeEnd || new Date();
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
        },
        dateFilterInformation: {
            get: function () {
                return this.$scope.dateFilterInformation;
            },
            set: function (value) {
                this.$scope.dateFilterInformation = value;
            }
        }
    });

    DatetimeTypeFilterView.prototype.configureEvents = function () {
        var self = this;
        var scope = self.$scope;

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

        self.fn.dateFilterToggled = function (isOpened) {
            if (!isOpened) {
                if (!self.resetDate) {
                    self.resetDate = true;
                    return;
                }
                self.fn.resetDate();
            }
        };

        self.fn.loadPreviousLastDaysFilter = function (days, event) {
            self.dateRangeEnd = new Date();
            self.dateRangeStart = self.fn.getPreviousDate(days, self.dateRangeEnd);
            self.displayDateEnd = self.fn.getFormattedDate(self.dateRangeEnd);
            self.displayDateStart = self.fn.getFormattedDate(self.dateRangeStart);
            self.fn.getDatePlaceholder();
        };

        self.fn.applyDateFilter = function () {
            self.data.dateRangeFilterOpened = false;
            self.event.filterSelectionToggled(scope.filterFor.key, [{
                from: self.dateRangeStart,
                to: self.dateRangeEnd
            }]);
            self.dateFilterInformation = self.displayDateStart + " - " + self.displayDateEnd;
        };

        self.fn.getPreviousDate = function (days, from) {
            if (!from || !(from instanceof Date))
                return null;

            return moment(from).subtract(days, 'days').toDate();
        };

        self.fn.cancelFilter = function () {
            self.data.dateRangeFilterOpened = false;
        };

        self.fn.getDatePlaceholder = function () {
            return self.dateRangePlaceholder = self.fn.getFormattedDate(self.dateRangeStart) + '-' + self.fn.getFormattedDate(self.dateRangeEnd);
        };

        self.fn.getFormattedDate = function (date) {
            return moment(date).format(self.momentFormat);
        };

        self.fn.resetDate = function () {
            self.dateRangeEnd = new Date();
            self.dateRangeStart = self.fn.getPreviousDate(self.defaultPreviousDay, self.dateRangeEnd);
            self.displayDateEnd = self.fn.getFormattedDate(self.dateRangeEnd);
            self.displayDateStart = self.fn.getFormattedDate(self.dateRangeStart);
            self.fn.getDatePlaceholder();
        };

        self.fn.initializeFilters = function () {
            self.fn.resetDate();
        };

        self.fn.getFormattedDate = function (date) {
            return moment(date).format(self.momentFormat);
        };

    };

    DatetimeTypeFilterView.prototype.validateDates = function () {
        var self = this;
        if (moment(self.dateRangeStart).isAfter(self.dateRangeEnd)) {
            self.dateRangeEnd = new Date(self.dateRangeStart.toString());
            self.displayDateEnd = self.fn.getFormattedDate(self.dateRangeEnd);
        }
    };

    DatetimeTypeFilterView.newInstance = function ($scope, $element, $model, $presenter, $viewRepaintAspect, $logErrorAspect) {
        $scope = $scope || {};
        $element = $element || {};

        $presenter = $presenter || DatetimeTypeFilterPresenter.newInstance();

        var view = new DatetimeTypeFilterView($scope, $element, $model, $presenter);
        return view._injectAspects($viewRepaintAspect, $logErrorAspect);
    };

    return DatetimeTypeFilterView;
});