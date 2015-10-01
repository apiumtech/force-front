/**
 * Created by justin on 12/22/14.
 */
define([
    'modules/saleAnalytics/widgets/WidgetBaseView',
    'modules/saleAnalytics/widgets/tableChart/TableWidgetModel',
    'modules/saleAnalytics/widgets/tableChart/TableWidgetPresenter',
    'modules/widgets/BaseWidgetEventBus',
    'underscore'
], function (WidgetBaseView, TableWidgetModel, TableWidgetPresenter, BaseWidgetEventBus, _) {
    'use strict';

    function TableWidgetView(scope, element, presenter) {
        presenter = presenter || new TableWidgetPresenter();
        WidgetBaseView.call(this, scope, element, presenter);
        this.dataSource = [];
        var self = this;
        self.configureEvents();
        self.sortingState = {
            column: null,
            asc: false,
            desc: false
        }
    }


    TableWidgetView.inherits(WidgetBaseView, {
        dataSource: {
            get: function () {
                return this.$scope.dataSource;
            },
            set: function (value) {
                this.$scope.dataSource = value;
            }
        },
        sortingState: {
            get: function () {
                return this.$scope.sortingState;
            },
            set: function (value) {
                this.$scope.sortingState = value;
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


    TableWidgetView.prototype.configureEvents = function () {
        var self = this;
        var eventChannel = self.eventChannel;
        eventChannel.onReloadCommandReceived(self.onReloadCommandReceived.bind(self));
        eventChannel.onExpandingWidget(self.renderChart.bind(self));

        self.fn.sortColumnBy = function (column, $event) {
            var columnKey = column.key;
            if(!self.sortingState.column || (self.sortingState.column.key !== columnKey)){
                self.sortingState.asc = false;
            }
            self.sortingState.column = column;
            self.sortingState.asc = !self.sortingState.asc;
            self.sortingState.desc = !self.sortingState.asc;
            self.renderChart();
        };

        self.fn.toggleColumn = function (column, $event) {
            // prevent the popup from disappearing
            if ($event && $event.stopPropagation){
                $event.stopPropagation();
            }
            self.data.columns.forEach(function (col) {
                if (col.key === column.key) {
                    col.visible = !col.visible;
                }
            });
            self.renderChart();
        };

        self.fn.restoreColumnDisplay = function () {
            self.data.columns.forEach(function (column) {
                column.visible = true;
            });
            self.renderChart();
        };

        self.fn.secondsToTime = function (totalSeconds) {
            var sec_num = parseInt(totalSeconds, 10);
            var hours   = Math.floor(sec_num / 3600);
            var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
            var seconds = sec_num - (hours * 3600) - (minutes * 60);
            if (hours   < 10) {hours   = "0"+hours;}
            if (minutes < 10) {minutes = "0"+minutes;}
            if (seconds < 10) {seconds = "0"+seconds;}
            var time    = hours+':'+minutes+':'+seconds;
            return time;
        };

        self.event.parseData = function(){};
    };


    TableWidgetView.prototype.renderChart = function () {
        var self = this;
        if(self.sortingState.column) {
            var key = self.sortingState.column.key;
            var numberSortFunction = function(a, b) {
                a = parseFloat(a[key]); b = parseFloat(b[key]);
                if (a === b) { return 0; }
                return (a < b) ? -1 : 1;
            };
            var stringSortFunction = function(a, b) {
                a = a[key].toLowerCase(); b = b[key].toLowerCase();
                if(a < b) return -1;
                if(a > b) return 1;
                return 0;
            };
            if( ['int','float','seconds'].indexOf(self.sortingState.column.type) > -1 ){
                self.data.data.sort(numberSortFunction);
            } else {
                self.data.data.sort(stringSortFunction);
            }
            if(self.sortingState.desc) {
                self.data.data.reverse();
            }
        }
        self.dataSource = self.data.data;
    };


    TableWidgetView.prototype.onReloadWidgetSuccess = function (data) {
        var self = this;
        var res = this.event.parseData(data, this.widget.option);
        self.data.data = res.data;
        self.data.columns = res.columns;
        self.renderChart();
    };


    TableWidgetView.prototype.onMoveWidgetSuccess = function (data) {
    };


    TableWidgetView.prototype.onMoveWidgetError = function (error) {
        this.showError(error);
    };


    TableWidgetView.newInstance = function ($scope, $element, $viewRepAspect, $logErrorAspect) {
        var view = new TableWidgetView($scope, $element);
        return view._injectAspects($viewRepAspect, $logErrorAspect);
    };

    return TableWidgetView;
});