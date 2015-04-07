/**
 * Created by justin on 3/4/15.
 */
app.registerModel(function (container) {
    var Configuration = container.getService('Configuration');
    var AjaxService = container.getService("services/AjaxService");
    var FakeAjaxService = container.getService("services/FakeAjaxService");
    var DataTableDataProvider = container.getService("services/DataTableDataProvider");

    function AccountModel(ajaxService, dataTableDataProvider) {
        this.ajaxService = ajaxService;
        this.fakeAjaxService = FakeAjaxService.newInstance().getOrElse(throwInstantiateException(FakeAjaxService));
        this.dataTableDataProvider = dataTableDataProvider;
    }

    AccountModel.prototype.toggleFollow = function (record) {
        // TODO: replace $loki with the record identifer
        var params = {
            url: Configuration.api.toggleFollow + "/" + record.$loki,
            type: 'post',
            contentType: 'application/json',
            accept: 'application/json'
        };

        return this.ajaxService.rawAjaxRequest(params);
    };

    AccountModel.prototype.getLatLongData = function (record) {
        return this.fakeAjaxService.rawAjaxRequest({
            result: {
                latitude: 41.3970997,
                longitude: 2.1509145
            }
        });
    };

    AccountModel.prototype.loadTableFields = function () {
        return this.dataTableDataProvider.getTableFields();
    };

    AccountModel.newInstance = function (ajaxService, dataTableDataProvider) {
        ajaxService = ajaxService || AjaxService.newInstance().getOrElse(throwInstantiateException(AjaxService));
        dataTableDataProvider = dataTableDataProvider || DataTableDataProvider.newInstance().getOrElse(throwInstantiateException(DataTableDataProvider))

        return Some(new AccountModel(ajaxService, dataTableDataProvider));
    };

    return AccountModel;
});
