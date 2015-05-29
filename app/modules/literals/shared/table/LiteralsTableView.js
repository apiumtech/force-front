define([
	'shared/BaseView'
	,'modules/literals/shared/table/LiteralsTablePresenter'
	,'modules/literals/shared/table/LiteralsTableModel'
	,'shared/services/DataTableService'
	,'shared/services/SimpleTemplateParser'
], function(BaseView, LiteralsTablePresenter, LiteralsTableModel, DataTableService, SimpleTemplateParser) {
	'use strict';

	function LiteralsTableView(scope, model, presenter, compile, dataTableService, templateParser) {
		BaseView.call(this, scope, model, presenter);
        this.compile = compile;
        this.dataTableService = dataTableService;
        this.templateParser = templateParser;

        this.literals = [];
        this.table = null;

		this.configureEvents();
	}

	var proto = LiteralsTableView.prototype = Object.create(BaseView.prototype, {});


	proto.configureEvents = function () {
		this.event.onInit = function () {};
		this.event.fireLiteralsRequest = function () {};
	};

    proto.renderKeyColumn = function (data, type, row) {
        var colTemplate = $(".literalKeyColumnTemplate").html();
        return this.templateParser.parseTemplate(colTemplate, row);
    };


    // Columns Request callbacks
    proto.onColumnsRequestSuccess = function(res) {
        var self = this;
        var data = res.data;
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
        columns = columns.concat(languages);
        var dataTableConfig = {
            data: this.literals,
            columns: columns,
            columnDefs: [
                {
                    targets: 0,
                    render: self.renderKeyColumn.bind(self),
                    createdCell: function (cell, cellData, rowData, rowIndex, colIndex) {
                        self.$compile(cell)(self.$scope);
                    }
                }
            ]
        };
        this.table = this.dataTableService.createDatatable("#data-table", dataTableConfig);
        this.event.fireLiteralsRequest();
    };
    proto.onColumnsRequestError = function(err) {
        this.data.currentError = err;
    };


    // Literals Request callbacks
    proto.onLiteralsRequestSuccess = function(res) {
        this.literals = this.literals.concat(res.data);
        this.table.draw();
    };
    proto.onLiteralsRequestError = function(err) {
        console.log("onLiteralsRequestError " + err);
        this.data.currentError = err;
    };


	LiteralsTableView.newInstance = function (namedParams) {
		var scope = namedParams.scope || {};
		var model = namedParams.model || LiteralsTableModel.newInstance();
		var presenter = namedParams.presenter || LiteralsTablePresenter.newInstance();
        var dataTableService = namedParams.dataTableService || DataTableService.newInstance();
        var templateParser = namedParams.templateParser || SimpleTemplateParser.newInstance();
		var view = new LiteralsTableView(scope, model, presenter, namedParams.compile, dataTableService, templateParser);

		return view._injectAspects(namedParams.viewRepAspect, namedParams.logErrorAspect);
	};

	return LiteralsTableView;
});