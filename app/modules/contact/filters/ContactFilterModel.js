/**
 * Created by joanllenas on 3/31/15.
 */
define([], function(){
    var Configuration = container.getService('Configuration');
    var AjaxService = container.getService("services/AjaxService");
    var DataTableDataProvider = container.getService("services/DataTableDataProvider");

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
