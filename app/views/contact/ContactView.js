/**
 * Created by joanllenas on 03/31/15.
 */

app.registerView(function (container) {
    var BaseView = container.getView("views/BaseView");
    var ContactPresenter = container.getPresenter('presenters/contact/ContactPresenter');
    var ContactModel = container.getModel('models/contact/ContactModel');
    var GoogleMapService = container.getService("services/GoogleMapService");
    var DataTableService = container.getService("services/DataTableService");


    /**
     * ContactView
     *
     * @constructor
     */
    function ContactView($scope, $model, $presenter, mapService, dataTableService) {
        BaseView.call(this, $scope, $model, $presenter);

        this.dataTableService = dataTableService;
        this.mapService = mapService;

        this.data.map = null;
        this.data.latlngbounds = null;
        this.data.mapInfoWindow = null;
        this.data.mapCanvasCollapsed = true;

        this.data.tableColumns = null;
        this.data.contacts = null;
        this.data.table = null;

        this.data.currentError = null;

        this.configureEvents();
    }


    /**
     * Extend BaseView
     */
    ContactView.prototype = Object.create(BaseView.prototype, {});


    /**
     * Configure Events
     *
     * @method configureEvents()
     */
    ContactView.prototype.configureEvents = function () {
        this.fn.initializeMap = this.initializeMap.bind(this); // contactTable.html > ng-init
        this.fn.initializeTable = this.initializeTable.bind(this); // contactTable.html > ng-init
        this.fn.createContactClicked = this.openCreateContactPage.bind(this);
        this.fn.isColumnVisible = this.isColumnVisible.bind(this);
        this.fn.toggleShowMap = this.toggleShowMap.bind(this);

        // Method stubs, actually implemented in presenter.
        this.event.onFieldsRestoreDefault = function () {};
        this.event.onToggleColumn = function () {};
    };


    /**
     * Initialize Map.
     *
     * @method initializeMap()
     */
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


    /**
     * Initialize Table.
     *
     * @method initializeTable()
     */
    ContactView.prototype.initializeTable = function () {
        this.presenter.loadContactColumns();
        this.presenter.loadContacts();
    };

    ContactView.prototype.onLoadContactColumnsComplete = function (columns) {
        this.data.tableColumns = columns;
        this.renderTable();
    };

    ContactView.prototype.onLoadContactsComplete = function (contacts) {
        this.data.contacts = contacts;
        this.renderTable();
    };

    ContactView.prototype.onLoadContactsError = function (error) {
        this.showError(error);
    };

    ContactView.prototype.renderTable = function () {
        if( this.data.tableColumns && this.data.contacts ){
            var dataTableConfig = {
                data: this.data.contacts,
                columns: this.data.tableColumns
            };
            this.data.table = this.dataTableService.createDatatable("#data-table", dataTableConfig);
        }
    };


    /**
     * Toggle Show Map
     *
     * @method toggleShowMap()
     */
    ContactView.prototype.toggleShowMap = function () {
        this.data.mapCanvasCollapsed = !this.data.mapCanvasCollapsed;
    };


    /**
     * Close InfoWindow in Map.
     *
     * @method closeInfoWindowInMap()
     */
    ContactView.prototype.closeInfoWindowInMap = function () {
        var self = this;

        if (self.data.mapInfoWindow) {
            self.data.mapInfoWindow.close();
        }
    };


    /**
     * Open the Contact creation page.
     *
     * @method openCreateContactPage()
     */
    ContactView.prototype.openCreateContactPage = function () {
    };


    /**
     * Wether column is visible or not.
     *
     * @method isColumnVisible()
     */
    ContactView.prototype.isColumnVisible = function (column) {
        return column.isVisible;
    };


    /**
     * All errors display through this function
     *
     * @method showError()
     * @param error (string) The error message
     */
    ContactView.prototype.showError = function (msg) {
        this.data.currentError = msg;
    };


    /**
     * ContactView factory
     *
     * @method static newInstance()
     */
    ContactView.newInstance = function ($scope, $model, $presenter, $mapService, $dataTableService, $viewRepAspect, $logErrorAspect) {

        var scope = $scope || {};
        var model = $model || ContactModel.newInstance().getOrElse(throwInstantiateException(ContactModel));
        var presenter = $presenter || ContactPresenter.newInstance().getOrElse(throwInstantiateException(ContactPresenter));

        var mapService = $mapService || GoogleMapService.newInstance().getOrElse(throwInstantiateException(GoogleMapService));
        var dataTableService = $dataTableService || DataTableService.newInstance().getOrElse(throwInstantiateException(DataTableService));
        var view = new ContactView(scope, model, presenter, mapService, dataTableService);

        return view._injectAspects($viewRepAspect, $logErrorAspect);
    };


    return ContactView;
});