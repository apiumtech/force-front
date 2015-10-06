define([
	'shared/BaseView'
	,'modules/literals/shared/table/LiteralsTablePresenter'
	,'modules/literals/shared/table/LiteralsTableModel'
	,'shared/services/SimpleTemplateParser'
    ,'jquery'
    ,'underscore'
    ,'shared/services/TranslatorService'
], function(BaseView, LiteralsTablePresenter, LiteralsTableModel, SimpleTemplateParser, $, _, TranslatorService) {
	'use strict';


	function LiteralsTableView(scope, model, presenter, templateParser, sce) {
		BaseView.call(this, scope, model, presenter);
        this.sce = sce;
        this.templateParser = templateParser;
        this.translator = TranslatorService.newInstance();

        this.data.scope = scope;
        this.data.currentError = null;
        this.data.isLoading = false;
        this.data.columns = [];
        this.data.rows = [];
        this.data.sortingState = {
            column: "",
            asc: false,
            desc: false
        };
        this.languageColumns = [];

		this.configureEvents();
	}

	var proto = LiteralsTableView.prototype = Object.create(BaseView.prototype, {});


	proto.configureEvents = function () {
        var self = this;
        //this.fn.deleteLiteralPrompt = this.deleteLiteralPrompt.bind(this);

        self.fn.sortColumnBy = function(column, event){
            console.warn("Sort not implemented");
        };

        self.fn.renderLiteralKeyColumnTemplate = function(row){
            var colTemplate = $(".literalKeyColumnTemplate").html();
            var parsed = self.templateParser.parseTemplate(colTemplate, row);
            return self.sce.trustAsHtml( parsed );
        };

        self.fn.renderImplementationCodeColumn = function (row) {
            var colTemplate = $(".literalImplementationCodeColumnTemplate").html();
            var parsed = self.templateParser.parseTemplate(colTemplate, row);
            return self.sce.trustAsHtml( parsed );
        };

        self.event.onInit = function () {};
        self.event.fireLiteralsDeleteRequest = function () {};
		self.event.fireLiteralsRequest = function () {};
        self.event.onDisposing = function () {};


        this.disposer = this.$scope.$on("$destroy", this.onDisposing.bind(this));
	};


    proto.onDisposing = function () {
        this.event.onDisposing();
        this.disposer();
    };


    /*proto.deleteLiteralPrompt = function (literalId) {
        var msg = this.translator.translate(
            "Literal.List.Table.Delete_Confirm_Message",
            {literalId: literalId}
        );
        if (window.confirm(msg)) {
            this._doDeleteLiteralPrompt(literalId);
        }
    };

    proto._doDeleteLiteralPrompt = function (literalId) {
        this.event.fireLiteralsDeleteRequest(literalId);
    };*/


    proto._createColumnDeclaration = function(key, type) {
        return {
            key: key,
            label: key,
            type: type,
            sortable: false,
            visible: true,
            available: true,
            width: '100px'
        };
    };

    var KEY_COL_WIDTH = 25;
    var IMPL_CODE_COL_WIDTH = 5;

    proto._createLanguageColumns = function (data) {
        var self = this;
        var availableColumnWidth = 100 - (KEY_COL_WIDTH + IMPL_CODE_COL_WIDTH);
        var colWidth = Math.floor(availableColumnWidth / data.length);
        data.forEach(function (lang) {
            var col = self._createColumnDeclaration(lang.Name, "string");
            col.width = colWidth + "%";
            self.languageColumns.push(col);
        });
    };


    proto._createKeyColumn = function() {
        var col = this._createColumnDeclaration("Key", "string");
        col.sortable = false;
        col.width = KEY_COL_WIDTH + "%";
        return col;
    };


    proto._createImplementationColumn = function() {
        var col = this._createColumnDeclaration("ImplementationCode", "int");
        col.key = "ImplementationCode";
        col.label = "<i class='fa ic-flag-filled'></i>";
        col.visible = false;
        col.available = false;
        col.sortable = false;
        col.width = IMPL_CODE_COL_WIDTH + "%";
        return col;
    };


    proto.onColumnsRequestSuccess = function(res) {
        var self = this;
        var data = res.data;

        this._createLanguageColumns(data);
        var KeyColumn = this._createKeyColumn();
        var ImplementationColumn = this._createImplementationColumn();
        var columns = [KeyColumn, ImplementationColumn];
        self.data.columns = columns.concat(this.languageColumns.slice());

        this.event.fireLiteralsRequest();
    };


    proto.onColumnsRequestError = function(err) {
        this.showError(err);
    };


    proto._createTableRow = function (obj) {
        var row = {};
        row.$ref = obj;
        row.Id = obj.Id;
        row.Key = obj.Key;
        row.ImplementationCode = obj.ImplementationCode || 0;
        this.languageColumns.forEach(function (lang) {
            var langData = "";
            if( obj.LanguageValues[lang.key] !== undefined ) {
                langData = obj.LanguageValues[lang.key];
            }
            row[lang.key] = langData;
        });
        return row;
    };


    proto._implementationCodeColumnVisibility = function (data) {
        return data.length > 0 && "ImplementationCode" in data[0].$ref;
    };


    proto.clearTable = function() {
        this.data.rows.splice(0);
    };


    proto.onLiteralsRequest = function() {
        this.data.isLoading = true;
        this.data.currentError = null;
    };


    proto.onLiteralsRequestSuccess = function(res) {
        var self = this;
        self.data.isLoading = false;
        res.data = res.data || [];
        var data = res.data;

        if(res.data.length > 0) {
            data = res.data.map( self._createTableRow.bind(self) );
            var implementationCodeColumnIndex = _.findIndex(self.data.columns, {key: 'ImplementationCode'});
            var implementationCodeColumn = self.data.columns[implementationCodeColumnIndex];
            var isImplementationCodeColumnVisible = self._implementationCodeColumnVisibility(data);
            implementationCodeColumn.available = isImplementationCodeColumnVisible;
            implementationCodeColumn.visible = isImplementationCodeColumnVisible;
        }

        self.data.rows = self.data.rows.concat(data);
        self._addTooltipsToEllipsis();
    };


    /*
     * Adds the title attribute on-demand when text overflows.
     */
    proto.addTooltipsToEllipsisHandler = function() {
        var $this = $(this);
        if(this.offsetWidth < this.scrollWidth && !$this.attr('title')){
            $this.attr('title', $this.text());
        }
    };
    proto._addTooltipsToEllipsis = function() {
        $('#data-table td, #data-table th').bind('mouseenter', self.addTooltipsToEllipsisHandler);
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
        var templateParser = namedParams.templateParser || SimpleTemplateParser.newInstance();
		var view = new LiteralsTableView(scope, model, presenter, templateParser, namedParams.sce);

		return view._injectAspects(namedParams.viewRepAspect, namedParams.logErrorAspect);
	};

	return LiteralsTableView;
});