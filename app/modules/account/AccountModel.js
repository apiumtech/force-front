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
        this.fakeAjaxService = FakeAjaxService.newInstance();
        this.dataTableDataProvider = dataTableDataProvider;
        this.accountsList = [];
        this.recentFilters = {};
        this.recentOrder = {};
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

        if (JSON.stringify(this.recentFilters) !== JSON.stringify(requestData.customFilter) ||
            JSON.stringify(this.recentOrder) !== JSON.stringify(requestData.order)) {
            this.accountsList = [];
            option.stopLoading = false;
            option.currentPage = 0;
        } else {
            option.currentPage++;
        }

        this.recentFilters = requestData.customFilter;
        this.recentOrder = requestData.order;

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
        if (option.startFilter)
            option.startFilter = false;

        var mappedResponseData = this.mapAccountListResponseData(responseData.data);
        this.accountsList = this.accountsList.concat(mappedResponseData);

        if (this.accountsList.length === responseData.recordsFiltered)
            option.stopLoading = true;

        responseData.data = this.accountsList;
        callback(responseData);
    };

    AccountModel.prototype.mapAccountListResponseData = function (data) {
        return data.map(function (record) {
            record.id = record.$loki;
            return record;
        });
    };

    AccountModel.prototype.remapResponseError = function (error) {
        return error;
    };

    AccountModel.newInstance = function (ajaxService, dataTableDataProvider) {
        ajaxService = ajaxService || AjaxService.newInstance();
        dataTableDataProvider = dataTableDataProvider || DataTableDataProvider.newInstance()

        return new AccountModel(ajaxService, dataTableDataProvider);
    };

    return AccountModel;
});
