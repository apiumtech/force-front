/**
 * Created by joanllenas on 3/31/15.
 */
app.registerModel(function (container) {
    var Configuration = container.getService('Configuration');
    var AjaxService = container.getService("services/AjaxService");
    var DataTableDataProvider = container.getService("services/DataTableDataProvider");

    function ContactModel(ajaxService, dataTableDataProvider) {
        this.ajaxService = ajaxService;
        this.dataTableDataProvider = dataTableDataProvider;
    }

    ContactModel.prototype.loadTableFields = function () {
        return this.dataTableDataProvider.getTableFields();
    };

    ContactModel.newInstance = function (ajaxService, dataTableDataProvider) {
        ajaxService = ajaxService || AjaxService.newInstance().getOrElse(throwInstantiateException(AjaxService));
        dataTableDataProvider = dataTableDataProvider || DataTableDataProvider.newInstance().getOrElse(throwInstantiateException(DataTableDataProvider))

        return Some(new ContactModel(ajaxService, dataTableDataProvider));
    };

    return ContactModel;
});
