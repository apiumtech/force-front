/**
 * Created by joanllenas on 03/31/15.
 */

define([
    'shared/BaseView',
    'modules/contact/ContactPresenter',
    'modules/contact/ContactModel',
    'shared/services/DataTableService'
], function (BaseView, ContactPresenter, ContactModel, DataTableService) {
    'use strict';

    function ContactView($scope, $model, $presenter, dataTableService) {
        BaseView.call(this, $scope, $model, $presenter);

        this.dataTableService = dataTableService;

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
        this.fn.initializeTable = this.initializeTable.bind(this); // contactTable.html > ng-init
        this.fn.createContactClicked = this.openCreateContactPage.bind(this);
        this.fn.isColumnVisible = this.isColumnVisible.bind(this);
        this.fn.isColumnToggleable = this.isColumnToggleable.bind(this);
        this.fn.onToggleColumn = this.onToggleColumn.bind(this);

        // Method stubs, actually implemented in presenter.
        this.event.onFieldsRestoreDefault = function () {
        };
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
        if (this.data.tableColumns && this.data.contacts) {
            var dataTableConfig = {
                data: this.data.contacts,
                columns: this.data.tableColumns
            };
            this.data.table = this.dataTableService.createDatatable("#data-table", dataTableConfig);
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
        return column.visible;
    };


    /**
     * Wether column visibility can be toggled or not
     *
     * @method isColumnToggleable()
     */
    ContactView.prototype.isColumnToggleable = function (column) {
        return !column.isAlwaysVisible();
    };


    /**
     * Toggle Column visibility
     *
     * @method onToggleColumn()
     */
    ContactView.prototype.onToggleColumn = function (column) {
        column.visible = !column.visible;
        var len = this.data.tableColumns.length;
        var i, column;
        for (i = 0; i < len; i++) {
            column = this.data.table.column(i);
            column.visible(this.data.tableColumns[i].visible);
        }
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
    ContactView.newInstance = function ($scope, $model, $presenter, $dataTableService, $viewRepAspect, $logErrorAspect) {

        var scope = $scope || {};
        var model = $model || ContactModel.newInstance();
        var presenter = $presenter || ContactPresenter.newInstance();

        var dataTableService = $dataTableService || DataTableService.newInstance();
        var view = new ContactView(scope, model, presenter, dataTableService);

        return view._injectAspects($viewRepAspect, $logErrorAspect);
    };


    return ContactView;
});