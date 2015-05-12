app.registerView(function (container) {
    var BaseView = container.getView("views/BaseView");
    var LiteralListPresenter = container.getPresenter('presenters/literal/LiteralListPresenter');
    var LiteralModel = container.getModel('models/literal/LiteralModel');
    var DataTableService = container.getService("services/DataTableService");
    var SimpleTemplateParser = container.getService("services/SimpleTemplateParser");


    /**
     * LiteralListView
     *
     * @constructor
     */
    function LiteralListView($scope, $model, $presenter, dataTableService, templateParser) {
        BaseView.call(this, $scope, $model, $presenter);

        this.dataTableService = dataTableService;
        this.templateParser = templateParser;
        this.data.tableColumns = null;
        this.data.literals = null;
        this.data.table = null;

        this.data.currentError = null;

        this.configureEvents();
    }


    /**
     * Extend BaseView
     */
    LiteralListView.prototype = Object.create(BaseView.prototype, {});


    /**
     * Configure Events
     *
     * @method configureEvents()
     */
    LiteralListView.prototype.configureEvents = function () {

        this.fn.deleteLiteralPrompt = this.deleteLiteralPrompt.bind(this);

        // Events defined in Presenter
        this.event.onInit = function () {};
        this.event.onSearchTextFilterChanged = function () {};
    };


    /**
     * Literal deletion prompt
     *
     * @method deleteLiteralPrompt()
     */
    LiteralListView.prototype.deleteLiteralPrompt = function (literalId) {
        alert("Literal Id: " + literalId);
    };


    /**
     * Renders the table with the retrieved data
     *
     * @method showTableData()
     */
    LiteralListView.prototype.showTableData = function (data) {

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

        var columns = [{
            data: "Key",
            title: "Key",
            type: "string",
            visible: true,
            sortable: false
        }];
        columns = columns.concat(languages);


        var requestRow = function(obj){
            var row = {};
            row.$ref = obj;
            row.Id = obj.Id;
            row.Key = obj.Key;
            languages.forEach(function(lang, index){
                row[lang.data] = obj.LanguageValues[index].Value;
            });
            return row;
        };

        data = data.map(function(row){
            return requestRow(row);
        });

        var dataTableConfig = {
            data: data,
            columns: columns,
            columnDefs: [
                {
                    targets: 0,
                    render: self.renderKeyColumn.bind(self)
                }
            ],
            deferRender: true,
            pageLength: 50,
            pagingType: "full_numbers"
        };
        this.data.table = this.dataTableService.createDatatable("#data-table", dataTableConfig);
    };


    /**
     * Renders the Key column with the provided template
     *
     * @method renderKeyColumn()
     */
    LiteralListView.prototype.renderKeyColumn = function (data, type, row) {
        var self = this
        var colTemplate = $(".literalKeyColumnTemplate").html();
        return self.templateParser.parseTemplate(colTemplate, row);
    };


    /**
     * Error displaying
     *
     * @method showError()
     */
    LiteralListView.prototype.showError = function (error) {
        console.error(error);
        this.data.currentError = error;
    };


    /**
     * Static module factory
     *
     * @method newInstance()
     */
    LiteralListView.newInstance = function ($scope, $model, $presenter, $dataTableService, $templateParser, $viewRepAspect, $logErrorAspect) {
        var scope = $scope || {};
        var model = $model || LiteralModel.newInstance().getOrElse(throwInstantiateException(LiteralModel));
        var presenter = $presenter || LiteralListPresenter.newInstance().getOrElse(throwInstantiateException(LiteralListPresenter));
        var dataTableService = $dataTableService || DataTableService.newInstance();
        var templateParser = $templateParser || SimpleTemplateParser.newInstance();

        var view = new LiteralListView(scope, model, presenter, dataTableService, templateParser);

        return view._injectAspects($viewRepAspect, $logErrorAspect);
    };

    return {newInstance: LiteralListView.newInstance};
});
