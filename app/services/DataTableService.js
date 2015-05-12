/**
 * Created by Justin on 3/2/2015.
 */
app.registerService(function (container) {
    function DataTableIntegrateImplement(domAccess, dtOptions) {
        return $(domAccess).DataTable(dtOptions);
    }

    function DataTableService(dataTableImpl) {
        this.dtImpl = dataTableImpl;
    }

    DataTableService.prototype.createDatatable = function (dom, options) {
        return this.dtImpl(dom, options);
    };

    DataTableService.newInstance = function (dataTableImpl) {
        var dtImpl = dataTableImpl || DataTableIntegrateImplement;

        return new DataTableService(dtImpl);
    };

    return DataTableService;
});