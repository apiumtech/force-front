/**
 * Created by joanllenas on 03/31/15.
 */

app.registerView(function (container) {
    var BaseView = container.getView("views/BaseView");
    var ContactPresenter = container.getPresenter('presenters/contact/ContactPresenter');
    var ContactModel = container.getModel('models/contact/ContactModel');
    var GoogleMapService = container.getService("services/GoogleMapService");


    function ContactView($scope, $model, $presenter, mapService) {
        BaseView.call(this, $scope, $model, $presenter);

        this.mapService = mapService;
        this.data.map = null;

        this.data.contactFields = [];
        this.data.contacts = [];

        this.data.infoWindow = null;

        this.configureEvents();
    }

    ContactView.prototype = Object.create(BaseView.prototype, {});

    ContactView.prototype.configureEvents = function () {
        var self = this;

        // contactTable.html > ng-init
        self.fn.initializeMap = function () {
            self.initializeMap();
        };

        // contactTable.html > ng-init
        self.fn.initTable = function () {
        };


        self.fn.createContactClicked = function () {
            self.openCreateContactPage();
        };

        self.fn.isImageHeader = function () {
        };

        self.event.onFieldsRestoreDefault = function () {/*implemented in presenter*/};
        self.event.onToggleColumn = function () {/*implemented in presenter*/};
    };

    ContactView.prototype.initializeMap = function () {
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

    ContactView.prototype.onFieldsRestoreDefault = function () {
        console.log("onFieldsRestoreDefault");
    };

    ContactView.newInstance = function ($scope, $model, $presenter, $mapService, $viewRepAspect, $logErrorAspect) {

        var scope = $scope || {};
        var model = $model || ContactModel.newInstance().getOrElse(throwInstantiateException(ContactModel));
        var presenter = $presenter || ContactPresenter.newInstance().getOrElse(throwInstantiateException(ContactPresenter));

        var mapService = $mapService || GoogleMapService.newInstance().getOrElse(throwInstantiateException(GoogleMapService));
        var view = new ContactView(scope, model, presenter, mapService);

        return view._injectAspects($viewRepAspect, $logErrorAspect);
    };

    return ContactView;
});