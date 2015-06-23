define([
    'config',
    'shared/services/ajax/AjaxService',
    'shared/services/ajax/FakeAjaxService',
    'shared/services/DataTableDataProvider'
], function (Configuration, AjaxService, FakeAjaxService, DataTableDataProvider) {
    'use strict';

    function AccountListModel(ajaxService, dataTableDataProvider, fakeAjaxService) {
        this.ajaxService = ajaxService || new AjaxService();
        this.fakeAjaxService = fakeAjaxService || new FakeAjaxService();
        this.dataTableDataProvider = dataTableDataProvider || DataTableDataProvider.newInstance();
        this.accountsList = [];
        this.recentFilters = {};
        this.recentOrder = {};
    }

    AccountListModel.prototype.toggleFollow = function (record) {
        // TODO: replace $loki with the record identifer
        var params = {
            url: Configuration.api.toggleFollow.format(record.$loki),
            type: 'post',
            contentType: 'application/json',
            accept: 'application/json'
        };

        return this.ajaxService.rawAjaxRequest(params);
    };

    AccountListModel.prototype.getLatLongData = function (record) {
        return this.fakeAjaxService.rawAjaxRequest({
            result: {
                latitude: 41.3970997,
                longitude: 2.1509145
            }
        });
    };

    AccountListModel.prototype.loadTableFields = function () {
        return this.dataTableDataProvider.getTableFields();
    };

    AccountListModel.prototype.loadAccountsList = function (option, requestData, callback, settings) {

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
        }).then(this.remapAccountListData.bind(this, option, requestData, settings), this.remapResponseError.bind(this));
    };

    AccountListModel.prototype.remapAccountListData = function (option, requestData, settings, responseData) {
        var self = this;
        if (option.startFilter)
            option.startFilter = false;

        var mappedResponseData = this.mapAccountListResponseData(responseData.data);
        this.accountsList = this.accountsList.concat(mappedResponseData);

        if (this.accountsList.length === responseData.recordsFiltered)
            option.stopLoading = true;

        var list = self.accountsList;

        responseData.data = list;
        return responseData;
    };

    AccountListModel.prototype.mapAccountListResponseData = function (data) {
        return data.map(function (record) {
            record.id = record.$loki;
            return record;
        });
    };

    AccountListModel.prototype.remapResponseError = function (error, callback) {
        console.log("resp error", error);
        return error;
    };

    return AccountListModel;
});