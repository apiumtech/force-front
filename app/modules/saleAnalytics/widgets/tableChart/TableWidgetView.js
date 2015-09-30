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
        //self.enableIdColumn = false;
        self.configureEvents();
        self.sortingState = {
            column: null,
            asc: false,
            desc: false
        }
    }

    TableWidgetView.inherits(WidgetBaseView, {
        columns: {
            get: function () {
                return this.$scope.columns || (this.$scope.columns = []);
            },
            set: function (value) {
                this.$scope.columns = value;
            }
        },
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

        self.fn.isImage = function (str, index) {
            if( self._isNumeric(str) ) {
                return false;
            }

            var isImgReg = new RegExp('\\.(?:jpg|gif|png)$');
            var isImage = !!str.match(isImgReg);

            if(!isImage) {
                isImage = str.substr(0,7) == "http://" || str.substr(0,8) == "https://";
            }

            return isImage;
        };

        /*self.fn.uncamelize = function(name){
            return name[0].toUpperCase() + name.replace(/[A-Z]/g, ' $&').toLowerCase().substr(2);
        };*/

        self.fn.sortColumnBy = function (column, $event) {
            var columnKey = column.key;
            if(columnKey!==self.sortingState.column){
                self.sortingState.asc = false;
            }
            self.sortingState.column = columnKey;
            self.sortingState.asc = !self.sortingState.asc;
            self.sortingState.desc = !self.sortingState.asc;
            self.renderChart();
        };

        self.fn.toggleColumn = function (column, $event) {
            // prevent the popup from disappearing
            if ($event && $event.stopPropagation){
                $event.stopPropagation();
            }

            self.columns.forEach(function (col) {
                if (col.key === column.key) {
                    col.visible = !col.visible;
                }
            });

            self.renderChart();
        };

        self.fn.restoreColumnDisplay = function () {
            self.columns.forEach(function (column) {
                column.visible = true;
            });

            self.renderChart();
        };

        self.event.parseData = function(){};
    };

/*
 key: key,
 name: key,
 type: 'string',
 sortable: true,
 visible: true,
 available: true
*/
    TableWidgetView.prototype.assignColumnsData = function (newColumns) {
        var self = this;
        var columnsToMerge = self.columns;

        if (columnsToMerge.length != newColumns.length){
            columnsToMerge = [];
        }

        /*var newColumns = inputData.map(function (item) {
            var isShown = true;
            var isAvailable = true;
            if(item == "Id" || item == "IdFm") {
                isShown = false;
                if(!self.enableIdColumn){
                    isAvailable = false;
                }
            }
            return {
                name: item.name,
                isShown: item.visible,
                isAvailable: item.available,
            }
        });*/

        newColumns.forEach(function (column) {
            var isExisting = _.find(columnsToMerge, function (c) {
                return c.key == column.key
            });

            if (undefined === isExisting)
                columnsToMerge.push(column);
        });

        this.columns = columnsToMerge;
    };

    TableWidgetView.prototype.getDisplayColumnIndices = function (columns) {
        if (!columns || !isArray(columns) || !columns.length) {
            throw new Error("Data is not valid");
        }

        var result = [];

        for (var i = 0; i < columns.length; i++) {
            if (!columns[i].hasOwnProperty('visible') || !columns[i].hasOwnProperty('available'))
                throw new Error("Data is not valid");

            if (columns[i].available && columns[i].visible){
                result.push(i);
            }
        }

        return result;
    };


    TableWidgetView.prototype.getDisplayData = function (data, displayColumnIndices) {
        var dataFields;
        for (var rowIndex in data) {
            if (rowIndex == 0) continue;
            dataFields = data[rowIndex].length;
            if (dataFields !== data[rowIndex - 1].length)
                throw new Error("Input data not valid")
        }

        if (dataFields < displayColumnIndices.length) {
            throw new Error("Columns to display are greater than input data");
        }

        for (var index in displayColumnIndices) {
            if (displayColumnIndices[index] > dataFields - 1) {
                throw new Error("Display column index is greater than input data");
            }
        }

        var result = data.map(function (rowData) {
            var r = [];

            for (var index in displayColumnIndices) {
                var columnIndex = displayColumnIndices[index];
                r.push(rowData[columnIndex]);
            }

            return r;
        });

        return result;
    };

    TableWidgetView.prototype._isNumeric = function(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    };

    TableWidgetView.prototype.renderChart = function () {
        var self = this;
        var displayColumnIndices = self.getDisplayColumnIndices(self.columns);
        var ds = self.getDisplayData(self.data.data, displayColumnIndices);

        var colIndex = self._getColumnIndexByKey(self.sortingState.column);
        if(self.sortingState.column !== null && colIndex > -1) {


            var numberSortFunction = function(a, b) {
                a = parseFloat(a[colIndex]); b = parseFloat(b[colIndex]);
                if (a === b) { return 0; }
                return (a < b) ? -1 : 1;
            };

            var stringSortFunction = function(a, b) {
                a = a[colIndex].toLowerCase(); b = b[colIndex].toLowerCase();
                if(a < b) return -1;
                if(a > b) return 1;
                return 0;
            };

            if( self._isNumeric(ds[0][colIndex]) ){
                ds.sort(numberSortFunction);
            } else {
                ds.sort(stringSortFunction);
            }


            if(self.sortingState.desc){
                ds.reverse();
            }
        }

        self.dataSource = ds;
    };

    TableWidgetView.prototype._getColumnIndexByKey = function (key) {
        var index = 0;
        var self = this;
        var len = self.columns.length;
        var pos = -1;

        for(var i=0; i<len; i++){
            var column = self.columns[i];
            if(column.available && column.visible){
                if(column.key === key){
                    pos = index;
                    break;
                }
                index++;
            }
        }

        return pos;
    };

    TableWidgetView.prototype.onReloadWidgetSuccess = function (data) {
        var self = this;
        var res = this.event.parseData(data, this.widget.option);
        self.data.data = res.data;
        self.data.columns = res.columns;
        self.assignColumnsData(self.data.columns);
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