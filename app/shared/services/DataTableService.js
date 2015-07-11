/**
 * Created by Justin on 3/2/2015.
 */
define([
    'jquery'
], function ($) {
    function DataTableIntegrateImplement(domAccess, dtOptions) {
        return $(domAccess).DataTable(dtOptions);
    }

    function DataTableService(dataTableImpl) {
        this.dtImpl = dataTableImpl || DataTableIntegrateImplement;
    }

    DataTableService.prototype.createDatatable = function (dom, options) {
        this.element = dom;
        return this.dtImpl(dom, options);
    };

    DataTableService.prototype.refreshTable = function(table){

        table['ajax'].reload();
    };

    DataTableService.newInstance = function (dataTableImpl) {
        var dtImpl = dataTableImpl || DataTableIntegrateImplement;

        return new DataTableService(dtImpl);
    };

    return DataTableService;
});