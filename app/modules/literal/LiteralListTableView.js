define([
    'shared/BaseView',
    'modules/literal/LiteralListTablePresenter',
    'shared/services/DataTableService',
    'shared/services/SimpleTemplateParser',
    'shared/services/TranslatorService'
], function (BaseView, LiteralListTablePresenter, DataTableService, SimpleTemplateParser, TranslatorService) {
    'use strict';

    function LiteralListView($scope, $model, $presenter, $compile, dataTableService, templateParser) {
        BaseView.call(this, $scope, $model, $presenter);

        this.$compile = $compile;
        this.dataTableService = dataTableService;
        this.templateParser = templateParser;
        this.translator = TranslatorService.newInstance();

        this.configureEvents();
    }

    var proto = LiteralListTableView.prototype = Object.create(BaseView.prototype, {});

    proto.configureEvents = function() {
        this.event.onDelete = function(){};
        this.event.onGetList = function(){};
        this.event.onInit = function(){};
        this.event.onSearch = function(){};
    };

    LiteralListTableView.newInstance = function(namedParams) {
        var scope = namedParams.scope || {};
        var presenter = namedParams.presenter || LiteralListTablePresenter.newInstance();
        var dataTableService = namedParams.dataTableService || DataTableService.newInstance();
        var templateParser = namedParams.templateParser || SimpleTemplateParser.newInstance();
        var view = new LiteralListView(scope, {}, presenter, namedParams.compile, dataTableService, templateParser);
        return view._injectAspects(namedParams.viewRepAspect, namedParams.logErrorAspect);
    };
});
