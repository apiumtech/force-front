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
        this.accountsList = [];
    }

    AccountModel.prototype.toggleFollow = function (record) {
        // TODO: replace $loki with the record identifer
        var params = {
            url: Configuration.api.toggleFollow.format(record.$loki),
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

    AccountModel.prototype.loadAccountsList = function (option, requestData, callback, settings) {
        if (option && option.startFilter) {
            this.accountsList = [];
            option.currentPage = 0;
        }

        requestData.length = option.pageSize;
        requestData.start = option.pageSize * option.currentPage;

        return this.ajaxService.rawAjaxRequest({
            url: Configuration.api.dataTableRequest,
            type: "POST",
            contentType: 'application/json',
            accept: 'application/json',
            data: requestData
        }).then(this.remapAccountListData.bind(this, option, requestData, callback, settings), this.remapResponseError.bind(this));
    };

    AccountModel.prototype.remapAccountListData = function (option, requestData, callback, settings, responseData) {
        this.accountsList = this.accountsList.concat(responseData.data);

        responseData.data = this.accountsList;
        callback(responseData);
    };

    AccountModel.prototype.remapResponseError = function (error) {
        return error;
    };

    AccountModel.newInstance = function (ajaxService, dataTableDataProvider) {
        ajaxService = ajaxService || AjaxService.newInstance().getOrElse(throwInstantiateException(AjaxService));
        dataTableDataProvider = dataTableDataProvider || DataTableDataProvider.newInstance().getOrElse(throwInstantiateException(DataTableDataProvider))

        return Some(new AccountModel(ajaxService, dataTableDataProvider));
    };

    return AccountModel;
});
