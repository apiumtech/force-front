/**
 * Created by justin on 4/2/15.
 */
app.registerView(function (container) {
    var BaseView = container.getView("views/BaseView");
    var moment = container.getFunction('moment');
    var DatetimeTypeFilterPresenter = container.getModel('presenters/filters/DatetimeTypeFilterPresenter');

    function DatetimeTypeFilterView($scope, $element, $model, $presenter) {
        this.$element = $element;
        BaseView.call(this, $scope, $model, $presenter);
        var self = this;
        self.datePickerFormat = 'DD/MM/YYYY';
        self.$scope.dateOptionRange = [7, 15, 30, 90];
        self.$scope.dateRangeFilterOpened = false;
        this.configureEvents();
    }

    DatetimeTypeFilterView.prototype = Object.create(BaseView.prototype, {
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

    DatetimeTypeFilterView.prototype.configureEvents = function () {
        var self = this;
        var scope = self.$scope;

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

        self.fn.loadPreviousLastDaysFilter = function (days, event) {
            self.dateRangeEnd = new Date();
            self.dateRangeStart = self.fn.getPreviousDate(days, self.dateRangeEnd);
            self.displayDateEnd = self.fn.getFormattedDate(self.dateRangeEnd);
            self.displayDateStart = self.fn.getFormattedDate(self.dateRangeStart);
            self.fn.getDatePlaceholder();
        };

        self.fn.applyDateFilter = function () {
            self.data.dateRangeFilterOpened = false;
            self.event.filterSelectionToggled(scope.filterFor.data, [{
                from: self.dateRangeStart,
                to: self.dateRangeEnd
            }]);
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
            return moment(date).format(self.datePickerFormat);
        };

        self.fn.resetDate = function () {
            self.dateRangeEnd = new Date();
            self.dateRangeStart = self.fn.getPreviousDate(self.defaultPreviousDay, self.dateRangeEnd);
            self.displayDateEnd = self.fn.getFormattedDate(self.dateRangeEnd);
            self.displayDateStart = self.fn.getFormattedDate(self.dateRangeStart);
            self.fn.getDatePlaceholder();
        };
    };

    DatetimeTypeFilterView.newInstance = function ($scope, $element, $model, $presenter, $viewRepaintAspect, $logErrorAspect) {
        $scope = $scope || {};
        $element = $element || {};

        $presenter = $presenter || DatetimeTypeFilterPresenter.newInstance().getOrElse(throwInstantiateException(DatetimeTypeFilterPresenter));

        var view = new DatetimeTypeFilterView($scope, $element, $model, $presenter);
        return view._injectAspects($viewRepaintAspect, $logErrorAspect);
    };

    return DatetimeTypeFilterView;
});