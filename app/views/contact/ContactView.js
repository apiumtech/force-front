/**
 * Created by joanllenas on 03/31/15.
 */

app.registerView(function (container) {
    var BaseView = container.getView("views/BaseView");
    var ContactPresenter = container.getPresenter('presenters/contact/ContactPresenter');
    var ContactModel = container.getModel('models/contact/ContactModel');

    var GoogleMapService = container.getService("services/GoogleMapService");
    var DataTableService = container.getService("services/DataTableService");
    var SimpleTemplateParser = container.getService("services/SimpleTemplateParser");


    function ContactView($scope, $model, $presenter, mapService, dataTableService, templateParser) {
        BaseView.call(this, $scope, $model, $presenter);
        this._mapService = mapService;
        this._dataTableService = dataTableService;
        this._templateParser = templateParser;

        this.data.availableColumns = [];

        this.configureEvents();
    }

    ContactView.prototype = Object.create(BaseView.prototype, {});

    ContactView.prototype.configureEvents = function () {
        var self = this;
    };

    ContactView.newInstance = function ($scope, $model, $presenter, $mapService, $dataTableService, $templateParser, $viewRepAspect, $logErrorAspect) {

        var scope = $scope || {};
        var model = $model || ContactModel.newInstance().getOrElse(throwInstantiateException(ContactModel));
        var presenter = $presenter || ContactPresenter.newInstance().getOrElse(throwInstantiateException(ContactPresenter));

        var mapService = $mapService || GoogleMapService.newInstance().getOrElse(throwInstantiateException(GoogleMapService));
        var dataTableService = $dataTableService || DataTableService.newInstance().getOrElse(throwInstantiateException(DataTableService));
        var templateParser = $templateParser || SimpleTemplateParser.newInstance().getOrElse(throwInstantiateException(SimpleTemplateParser));

        var view = new ContactView(scope, model, presenter, mapService, dataTableService, templateParser);

        return view._injectAspects($viewRepAspect, $logErrorAspect);
    };

    return ContactView;
});