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
        this.mapService = mapService;
        this.dataTableService = dataTableService;
        this.templateParser = templateParser;

        this.data.availableColumns = [];

        this.configureEvents();
    }

    ContactView.prototype = Object.create(BaseView.prototype, {});

    ContactView.prototype.configureEvents = function () {
        var self = this;
        self.data.map = null;

        self.fn.createContactClicked = function () {
            self.openCreateContactPage();
        };

        self.fn.initializeChart = function () {
            self.initializeChart();
        };
    };

    ContactView.prototype.initializeChart = function () {
        var self = this;
        var mapOptions = {
            zoom: 8,
            center: self.mapService.getLatLng(-34.397, 150.644)
        };
        self.data.map = self.mapService.createMap($('#map-canvas')[0], mapOptions);
        self.data.latlngbounds = self.mapService.getLatLngBounds();
        self.mapService.bindClickEvent(self.data.map, self.closeInfoWindowInMap.bind(self));
    };

    ContactView.prototype.closeInfoWindowInMap = function () {
        var self = this;

        if (self.data.infoWindow) {
            self.data.infoWindow.close();
        }
    };

    ContactView.prototype.openCreateContactPage = function () {
        // TODO: open create contact page
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