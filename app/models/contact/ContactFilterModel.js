/**
 * Created by joanllenas on 3/31/15.
 */
app.registerModel(function (container) {
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
        ajaxService = ajaxService || AjaxService.newInstance().getOrElse(throwInstantiateException(AjaxService));
        dataTableDataProvider = dataTableDataProvider || DataTableDataProvider.newInstance().getOrElse(throwInstantiateException(DataTableDataProvider))

        return Some(new ContactFilterModel(ajaxService, dataTableDataProvider));
    };

    return ContactFilterModel;
});
