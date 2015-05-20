/**
 * Created by justin on 12/22/14.
 */
app.registerView(function (container) {
    var WidgetBaseView = container.getView("views/widgets/WidgetBaseView");
    var WidgetEventBus = container.getService('services/bus/WidgetEventBus');
    var TableWidgetModel = container.getModel('models/widgets/TableWidgetModel');
    var TableWidgetPresenter = container.getPresenter('presenters/widgets/TableWidgetPresenter');

    var BaseWidgetEventBus = container.getService('services/bus/BaseWidgetEventBus');

    function TableWidgetView(scope, element, model, presenter) {
        WidgetBaseView.call(this, scope, element, model, presenter);
        this.dataSource = [];
        var self = this;
        self.configureEvents();
    }

    TableWidgetView.prototype = Object.create(WidgetBaseView.prototype, {
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

        var eventChannel = self.eventChannel,
            scope = self.$scope;

        eventChannel.onReloadCommandReceived(self.onReloadCommandReceived.bind(self));

        self.fn.isImage = function (string) {
            if (typeof string !== 'string') return false;

            var isImgReg = new RegExp('\\.(?:jpg|gif|png)$');
            return !!string.match(isImgReg);
        };

        self.fn.toggleColumn = function (columnName, $event) {
            // prevent the popup from disappearing
            if ($event && $event.stopPropagation)
                $event.stopPropagation();

            self.columns.forEach(function (column) {
                if (column.name === columnName) {
                    column.isShown = !column.isShown;
                }
            });

            self.renderChart();
        };

        self.fn.restoreColumnDisplay = function () {
            self.columns.forEach(function (column) {
                column.isShown = true;
            });

            self.renderChart();
        };
    };

    TableWidgetView.prototype.assignColumnsData = function (inputData) {
        var columnsToMerge = this.columns;

        if (columnsToMerge.length != inputData.length)
            columnsToMerge = [];

        var newColumns = inputData.map(function (item) {
            return {
                name: item,
                isShown: true
            }
        });

        newColumns.forEach(function (column) {
            var isExisting = _.find(columnsToMerge, function (c) {
                return c.name == column.name
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
            if (!columns[i].hasOwnProperty('isShown'))
                throw new Error("Data is not valid");

            if (columns[i].isShown)
                result.push(i);
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

            console.log('data', rowData);

            return r;
        });

        return result;
    };

    TableWidgetView.prototype.renderChart = function () {
        var self = this;
        var displayColumnIndices = self.getDisplayColumnIndices(self.columns);
        self.dataSource = self.getDisplayData(self.data.data, displayColumnIndices);
        console.log(self.dataSource);
    };

    TableWidgetView.prototype.onReloadWidgetSuccess = function (data) {
        var self = this;
        self.data = data.data.params;
        self.assignColumnsData(self.data.columns);
        self.renderChart();
    };

    TableWidgetView.prototype.onMoveWidgetSuccess = function (data) {
        console.log("Widget moved to new position");
    };

    TableWidgetView.prototype.onMoveWidgetError = function (error) {
        this.showError(error);
    };

    TableWidgetView.newInstance = function ($scope, $element, $model, $presenter, $viewRepAspect, $logErrorAspect) {
        var model = $model || TableWidgetModel.newInstance();
        var presenter = $presenter || TableWidgetPresenter.newInstance();

        var view = new TableWidgetView($scope, $element, model, presenter);

        return view._injectAspects($viewRepAspect, $logErrorAspect);
    };

    return TableWidgetView;
});