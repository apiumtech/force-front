/**
 * Created by justin on 2/3/15.
 */

app.registerView(function (container) {
    var BaseView = container.getView('views/BaseView');
    var SalesAnalyticsFilterChannel = container.getService("services/bus/SalesAnalyticsFilterChannel");

    function SalesAnalyticsFilterView($scope, $model, $presenter) {
        BaseView.call(this, $scope, $model, $presenter);
        this.filterChannel = SalesAnalyticsFilterChannel.newInstance("WidgetDecoratedPage").getOrElse(throwInstantiateException(SalesAnalyticsFilterChannel));
        var self = this;
        this.$scope.datePickerFormat = 'dd/MM/yyyy';
        this.$scope.dateOptionRange = [7, 15, 30, 90];
        this.datePickerSettings = {
            showWeeks: false,
            showButtonBar: false
        };

        SalesAnalyticsFilterView.configureEvents(this);
    }

    SalesAnalyticsFilterView.prototype = Object.create(BaseView.prototype, {
        datePickerSettings: {
            get: function () {
                return this.$scope.datePickerSettings;
            },
            set: function (value) {
                this.$scope.datePickerSettings = value;
            }
        },
        datePickerStartOpened: {
            get: function () {
                return this.$scope.datePickerStartOpened || (this.$scope.datePickerStartOpened = false);
            },
            set: function (value) {
                this.$scope.datePickerStartOpened = value;
            }
        },
        datePickerEndOpened: {
            get: function () {
                return this.$scope.datePickerEndOpened || (this.$scope.datePickerEndOpened = false);
            },
            set: function (value) {
                this.$scope.datePickerEndOpened = value;
            }
        },
        dateRangeStart: {
            get: function () {
                return this.$scope.dateRangeStart || (this.$scope.dateRangeStart = new Date());
            },
            set: function (value) {
                this.$scope.dateRangeStart = value;
            }
        },
        dateRangeEnd: {
            get: function () {
                return this.$scope.dateRangeEnd || (this.$scope.dateRangeEnd = new Date());
            },
            set: function (value) {
                this.$scope.dateRangeEnd = value;
            }
        }
    });

    SalesAnalyticsFilterView.configureEvents = function (instance) {
        var self = instance;

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

        self.fn.closeDateTimePickers = function (event) {
            self.datePickerEndOpened = false;
            self.datePickerStartOpened = false;
        };

        self.fn.setPreviousLastDays = function (days, event) {
            event.stopPropagation();
            self.dateRangeEnd = new Date();
            self.dateRangeStart = self.fn.getPreviousDate(days, self.dateRangeEnd);
        };

        self.fn.getPreviousDate = function (days, from) {
            return moment(from).subtract(days, 'days').toDate();
        };

        self.fn.getDatePlaceholder = function () {
            return moment(self.dateRangeStart).format("DD/MM/YYYY") + '-' + moment(self.dateRangeEnd).format("DD/MM/YYYY");
        };

        self.fn.applyDateFilter = function () {
            self.filterChannel.sendDateFilterApplySignal({
                dateStart: self.dateRangeStart,
                dateEnd: self.dateRangeEnd
            });
        };
    };


    SalesAnalyticsFilterView.newInstance = function ($scope, $model, $presenter, $viewRepAspect, $logErrorAspect) {

        var view = new SalesAnalyticsFilterView($scope, $model, $presenter);

        return view._injectAspects($viewRepAspect, $logErrorAspect);
    };

    return SalesAnalyticsFilterView;
});