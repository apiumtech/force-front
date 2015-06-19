define([
	'shared/BaseView'
	,'modules/literals/shared/table/LiteralsTablePresenter'
	,'modules/literals/shared/table/LiteralsTableModel'
	,'shared/services/DataTableService'
	,'shared/services/SimpleTemplateParser'
    ,'jquery'
    ,'shared/services/TranslatorService'
], function(BaseView, LiteralsTablePresenter, LiteralsTableModel, DataTableService, SimpleTemplateParser, $, TranslatorService) {
	'use strict';


	function LiteralsTableView(scope, model, presenter, compile, dataTableService, templateParser) {
		BaseView.call(this, scope, model, presenter);
        this.compile = compile;
        this.dataTableService = dataTableService;
        this.templateParser = templateParser;
        this.translator = TranslatorService.newInstance();

        this.data.currentError = null;
        this.data.isLoading = false;
        this.languageColumns = [];
        this.table = null;

		this.configureEvents();
	}

	var proto = LiteralsTableView.prototype = Object.create(BaseView.prototype, {});


	proto.configureEvents = function () {
        this.fn.deleteLiteralPrompt = this.deleteLiteralPrompt.bind(this);
		this.event.onInit = function () {};
        this.event.fireLiteralsDeleteRequest = function () {};
		this.event.fireLiteralsRequest = function () {};
        this.event.onDisposing = function () {};

        this.disposer = this.$scope.$on("$destroy", this.onDisposing.bind(this));
	};


    proto.onDisposing = function () {
        this.table.destroy();
        this.event.onDisposing();
        this.disposer();
    };


    proto.clearTable = function () {
        this.table.clear().draw();
    };


    proto.deleteLiteralPrompt = function (literalId) {
        var msg = this.translator.translate(
            "Literal.List.Table.Delete_Confirm_Message",
            {literalId: literalId}
        );
        if (window.confirm(msg)) {
            this._doDeleteLiteralPrompt(literalId);
        }
    };

    proto._doDeleteLiteralPrompt = function (literalId) {
        this.clearTable();
        this.event.fireLiteralsDeleteRequest(literalId);
    };


    proto.renderKeyColumn = function (data, type, row) {
        var colTemplate = $(".literalKeyColumnTemplate").html();
        return this.templateParser.parseTemplate(colTemplate, row);
    };

    proto.renderImplementationCodeColumn = function (data, type, row) {
        var colTemplate = $(".literalImplementationCodeColumnTemplate").html();
        return this.templateParser.parseTemplate(colTemplate, row);
    };


    proto._createColumnDeclaration = function(name, type) {
        return {
            data: name,
            title: name,
            type: type,
            visible: true,
            sortable: true
        };
    };


    proto._createLanguageColumns = function (data) {
        var self = this;
        data.forEach(function (lang) {
            self.languageColumns.push(
                self._createColumnDeclaration(lang.Name, "string")
            );
        });
    };


    proto._createKeyColumn = function() {
        var col = this._createColumnDeclaration("Key", "string");
        col.sortable = false;
        col.width = 175;
        return col;
    };


    proto._createImplementationColumn = function() {
        var col = this._createColumnDeclaration("ImplementationCode", "num");
        col.title = "<i class='fa ic-flag-filled'></i>";
        col.visible = false;
        col.sortable = false;
        return col;
    };


    // Columns Request callbacks
    proto.onColumnsRequestSuccess = function(res) {
        var self = this;
        var data = res.data;

        this._createLanguageColumns(data);
        var KeyColumn = this._createKeyColumn();
        var ImplementationColumn = this._createImplementationColumn();
        var columns = [KeyColumn, ImplementationColumn];
        columns = columns.concat(this.languageColumns.slice());

        var dataTableConfig = {
            data: [],
            paging: false,
            info: false,
            order: [],
            columns: columns,
            columnDefs: [
                {
                    targets: 0,
                    render: self.renderKeyColumn.bind(self),
                    createdCell: function (cell, cellData, rowData, rowIndex, colIndex) {
                        self.compile(cell)(self.$scope);
                    }
                },
                {
                    targets: 1,
                    render: self.renderImplementationCodeColumn.bind(self),
                    createdCell: function (cell, cellData, rowData, rowIndex, colIndex) {
                        self.compile(cell)(self.$scope);
                    }
                }
            ],
            createdRow: function ( row, data, index ) {
                if ( data.ImplementationCode == -1 ) {
                    $('td', row).addClass('highlight');
                    //$('td', row).css('background-color', 'red');
                }
            }
        };

        this.table = this.dataTableService.createDatatable("#data-table", dataTableConfig);
        this.event.fireLiteralsRequest();
    };


    proto.onColumnsRequestError = function(err) {
        this.showError(err);
    };


    proto.onLiteralsRequest = function(res) {
        this.data.isLoading = true;
    };


    proto._createTableRow = function (obj) {
        var row = {};
        row.$ref = obj;
        row.Id = obj.Id;
        row.Key = obj.Key;
        row.ImplementationCode = obj.ImplementationCode || 0;
        this.languageColumns.forEach(function (lang) {
            var langData = "";
            if( obj.LanguageValues[lang.data] !== undefined ) {
                langData = obj.LanguageValues[lang.data];
            }
            row[lang.data] = langData;
        });
        return row;
    };


    proto._implementationCodeColumnVisibility = function (data) {
        return data.length > 0 && "ImplementationCode" in data[0].$ref;
    };


    // Literals Request callbacks
    proto.onLiteralsRequestSuccess = function(res) {
        var self = this;
        this.data.isLoading = false;
        res.data = res.data || [];
        var data = res.data.map( this._createTableRow.bind(this) );
        this.table.column(1).visible(
            this._implementationCodeColumnVisibility(data)
        );
        this.table.rows.add(data).draw();
    };


    proto.onLiteralsRequestError = function(err) {
        this.data.isLoading = false;
        this.showError(err);
    };


    proto.showError = function(err) {
        var msg;
        if(err.name && err.code){
            msg = err.name + "" + err.code;
        } else {
            msg = "Error: " + err.toString();
        }
        this.data.currentError = msg;
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