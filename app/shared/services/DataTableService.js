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
        console.log("DTS", options);
        var returnedData;
        try {
            returnedData = this.dtImpl(dom, options);
        }
        catch(e){
            console.log("ERROR",e);
        }
        return returnedData;
    };

    DataTableService.newInstance = function (dataTableImpl) {
        var dtImpl = dataTableImpl || DataTableIntegrateImplement;

        return new DataTableService(dtImpl);
    };

    return DataTableService;
});