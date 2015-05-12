
app.registerView(function (container) {
    var BaseView = container.getView("views/BaseView");
    var LiteralListPresenter = container.getPresenter('presenters/literal/LiteralListPresenter');
    var LiteralListModel = container.getModel('models/literal/LiteralListModel');
    var DataTableService = container.getService("services/DataTableService");


    /**
     * LiteralListView
     *
     * @constructor
     */
    function LiteralListView($scope, $model, $presenter, dataTableService) {
        BaseView.call(this, $scope, $model, $presenter);

        this.dataTableService = dataTableService;
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

        // Events defined in Presenter
        this.event.onInit = function () {
        };
        this.event.onSearchTextFilterChanged = function () {
        };
    };


    LiteralListView.prototype.showError = function (error) {
        console.error(error);
        this.data.currentError = error;
    };

    LiteralListView.prototype.showTableData = function (data) {

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
            sortable: true
        }];
        columns = columns.concat(languages);


        var requestRow = function(obj){
            var row = {};
            row.$ref = obj;
            row.Key = obj.Key;
            languages.forEach(function(lang, index){
                row[lang.data] = obj.LanguageValues[index].Value;
            });
            return row;
        };
        var cont = 0;
        console.log(data.length);
        data = data.map(function(row){
            cont++;
            return requestRow(row);
        });
        console.log("cont", cont);

        var dataTableConfig = {
            data: data,
            columns: columns,
            deferRender: true,
            pageLength: 50,
            pagingType: "full_numbers"
        };
        this.data.table = this.dataTableService.createDatatable("#data-table", dataTableConfig);
    };


    LiteralListView.newInstance = function ($scope, $model, $presenter, $dataTableService, $viewRepAspect, $logErrorAspect) {
        var scope = $scope || {};
        var model = $model || LiteralListModel.newInstance();
        var presenter = $presenter || LiteralListPresenter.newInstance();
        var dataTableService = $dataTableService || DataTableService.newInstance();

        var view = new LiteralListView(scope, model, presenter, dataTableService);

        return view._injectAspects($viewRepAspect, $logErrorAspect);
    };

    return {newInstance: LiteralListView.newInstance};
});
