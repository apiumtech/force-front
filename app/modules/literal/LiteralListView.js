/**
 * Created by joanllenas 5/14/15
 */

define([
    'shared/BaseView',
    'modules/literal/LiteralListPresenter',
    'modules/literal/LiteralListModel',
    'shared/services/DataTableService',
    'shared/services/SimpleTemplateParser',
    'shared/services/TranslatorService'
], function (BaseView, LiteralListPresenter, LiteralListModel, DataTableService, SimpleTemplateParser, TranslatorService) {
    'use strict';

    function LiteralListView($scope, $compile, $model, $presenter, dataTableService, templateParser) {
        BaseView.call(this, $scope, $model, $presenter);

        this.dataTableService = dataTableService;
        this.templateParser = templateParser;
        this.$compile = $compile;
        this.translator = TranslatorService.newInstance();

        this.data.tableColumns = null;
        this.data.literals = null;
        this.data.table = null;

        this.data.currentSearchQuery = "";
        this.data.currentError = null;

        this.onSearchTimeout = null;

        this.configureEvents();
    }

    var proto = LiteralListView.prototype = Object.create(BaseView.prototype, {});


    proto.configureEvents = function () {
        this.fn.deleteLiteralPrompt = this.deleteLiteralPrompt.bind(this);
        this.fn.onSearchTextFilterChanged = this.onSearchTextFilterChanged.bind(this);

        // Events defined in Presenter
        this.event.onInit = function () {
        };
        this.event.onDelete = function () {
        };
    };


    proto.onSearchTextFilterChanged = function (searchQuery) {
        clearTimeout(this.onSearchTimeout);
        this.onSearchTimeout = setTimeout(
            this.presenter.onSearchTextFilterChanged.bind(this.presenter),
            1000,
            searchQuery
        );
    };


    proto.deleteLiteralPrompt = function (literalId) {
        var msg = this.translator.translate(
            "Literal.List.Table.Delete_Confirm_Message",
            {literalId: literalId}
        );

        if (confirm(msg)) {
            this.event.onDelete(literalId);
        }
    };


    proto.onGetLanguageList = function (data) {
        this.createColumns(data);
        this.presenter.getLiteralList();
    };


    proto.createColumns = function (data) {
        var languages = [];
        data.forEach(function (lang) {
            languages.push({
                data: lang.Name,
                title: lang.Name,
                type: "string",
                visible: true,
                sortable: true
            });
        });
        var columns = [{
            data: "Key",
            title: "Key",
            type: "string",
            visible: true,
            sortable: false
        }];
        this.data.tableColumns = columns.concat(languages);
    };


    proto.showTableData = function (data) {
        var self = this;
        var languages = [];

        data[0].LanguageValues.forEach(function (value, index) {
            languages.push({
                data: value.Key,
                title: value.Key,
                type: "string",
                visible: true,
                sortable: true
            });
        });

        var requestRow = function (obj) {
            var row = {};
            row.$ref = obj;
            row.Id = obj.Id;
            row.Key = obj.Key;
            languages.forEach(function (lang, index) {
                row[lang.data] = obj.LanguageValues[index].Value;
            });
            return row;
        };
        data = data.map(function (row) {
            return requestRow(row);
        });

        if (this.data.table) {
            this.data.table
                .clear()
                .rows.add(data)
                .draw();
        } else {
            var dataTableConfig = {
                data: data,
                columns: this.data.tableColumns,
                columnDefs: [
                    {
                        targets: 0,
                        render: self.renderKeyColumn.bind(self),
                        createdCell: function (cell, cellData, rowData, rowIndex, colIndex) {
                            self.$compile(cell)(self.$scope);
                        }
                    }
                ],
                deferRender: true,
                pageLength: 50,
                pagingType: "full_numbers"
            };

            this.data.table = this.dataTableService.createDatatable("#data-table", dataTableConfig);

        }
    };


    proto.renderKeyColumn = function (data, type, row) {
        var self = this
        var colTemplate = $(".literalKeyColumnTemplate").html();
        return self.templateParser.parseTemplate(colTemplate, row);
    };


    proto.showError = function (error) {
        console.error(error);
        this.data.currentError = error;
    };


    LiteralListView.newInstance = function ($scope, $compile, $model, $presenter, $dataTableService, $templateParser, $viewRepAspect, $logErrorAspect) {
        var model = $model || LiteralListModel.newInstance();
        var presenter = $presenter || LiteralListPresenter.newInstance();
        var dataTableService = $dataTableService || DataTableService.newInstance();
        var templateParser = $templateParser || SimpleTemplateParser.newInstance();
        var view = new LiteralListView($scope, $compile, model, presenter, dataTableService, templateParser);
        return view._injectAspects($viewRepAspect, $logErrorAspect);
    };

    return LiteralListView;
});
