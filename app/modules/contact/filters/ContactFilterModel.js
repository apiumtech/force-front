/**
 * Created by joanllenas on 3/31/15.
 */
define([
    'config',
    'shared/services/ajax/AjaxService',
    'shared/services/DataTableDataProvider'
], function (Configuration, AjaxService, DataTableDataProvider) {
    'use strict';

    function ContactFilterModel(ajaxService, dataTableDataProvider) {
        this.ajaxService = ajaxService;
        this.dataTableDataProvider = dataTableDataProvider;
    }

    ContactFilterModel.prototype.loadTableFields = function () {
        return this.dataTableDataProvider.getTableFields();
    };

    ContactFilterModel.newInstance = function (ajaxService, dataTableDataProvider) {
        ajaxService = ajaxService || AjaxService.newInstance();
        dataTableDataProvider = dataTableDataProvider || DataTableDataProvider.newInstance()

        return new ContactFilterModel(ajaxService, dataTableDataProvider);
    };

    return ContactFilterModel;
});
