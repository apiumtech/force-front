/**
 * Created by kevin on 10/22/14.
 */

define([
    'app',
    'shared/BaseView',
    'modules/account/AccountPresenter',
    'modules/account/AccountModel',
    'shared/services/GoogleMapService',
    'shared/services/PopoverAdapter',
    'shared/services/DataTableService',
    'config',
    'shared/services/SimpleTemplateParser',
    'underscore',
    'jquery',
    'moment',
    'shared/services/bus/ScrollEventBus',
    'shared/services/ModalDialogAdapter'
], function (app, BaseView, AccountPresenter, AccountModel, GoogleMapService, PopoverAdapter,
             DataTableService, Configuration, SimpleTemplateParser, _, $, moment, ScrollEventBus) {


    function AccountView($scope, $model, $presenter, mapService, dataTableService, templateParser) {
        BaseView.call(this, $scope, $model, $presenter);
        this.popupAdapter = PopoverAdapter.newInstance();
        this.mapService = mapService;
        this.dataTableService = dataTableService;
        this.templateParser = templateParser;
        this.isLoading = false;
        this.data.map = null;
        this.data.mapCanvasCollapsed = false;
        this.data.table = null;
        this.data.accountDetailPage = "#/accounts/{id}";
        this.tableOption = {
            pageSize: Configuration.pageSize,
            currentPage: -1,
            stopLoading: false,
            startFilter: false
        };
        this.$scope.resultCounts = 0;

        this.data.filters = {
            owner: {
                filtering: false,
                values: []
            },
            view: {
                filtering: false,
                value: ""
            },
            environments: {
                filtering: false,
                values: []
            },
            accountType: {
                filtering: false,
                values: []
            },
            query: {
                filtering: false,
                value: ""
            },
            customFilters: {
                values: []
            }
        };

        this.configureEvents();
    }

    AccountView.inherits(BaseView, {
        isLoading: {
            get: function () {
                return this.$scope.isLoading || (this.$scope.isLoading = false);
            },
            set: function (value) {
                this.$scope.isLoading = value;
            }
        }
    });

    AccountView.prototype.configureEvents = function () {

    };

    AccountView.newInstance = function ($scope, $model, $presenter, $mapService, $dataTableService, $templateParser, $viewRepAspect, $logErrorAspect) {

        var scope = $scope || {};
        var model = $model || AccountModel.newInstance();
        var presenter = $presenter || AccountPresenter.newInstance();
        var mapService = $mapService || GoogleMapService.newInstance();
        var dataTableService = $dataTableService || DataTableService.newInstance();
        var templateParser = $templateParser || SimpleTemplateParser.newInstance();

        var view = new AccountView(scope, model, presenter, mapService, dataTableService, templateParser);

        return view._injectAspects($viewRepAspect, $logErrorAspect);
    };

    return AccountView;
});
