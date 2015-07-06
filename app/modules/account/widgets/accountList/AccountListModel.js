define([
    'config',
    'shared/services/ajax/AuthAjaxService',
    'shared/services/ajax/FakeAjaxService',
    'shared/services/DataTableDataProvider'
], function (Configuration, AuthAjaxService, FakeAjaxService, DataTableDataProvider) {
    'use strict';

    function AccountListModel(authAjaxService, dataTableDataProvider, fakeAjaxService) {
        this.authAjaxService = authAjaxService || AuthAjaxService._diResolve();
        this.fakeAjaxService = fakeAjaxService || FakeAjaxService._diResolve();
        this.dataTableDataProvider = dataTableDataProvider || DataTableDataProvider.newInstance();
        this.accountsList = [];
        this.recentFilters = {};
        this.recentOrder = {};
    }

    AccountListModel.prototype.toggleFollow = function (record) {
        var params = {
            url: Configuration.api.toggleFollow.format(record.id),
            type: 'post',
            contentType: 'application/json',
            accept: 'application/json'
        };

        return this.authAjaxService.rawAjaxRequest(params);
    };

    AccountListModel.prototype.getLatLongData = function (record) {
        var params = {
            url: Configuration.api.accountGeoLocation.format(record.id),
            type: 'get',
            contentType: 'application/json',
            accept: 'application/json'
        };

        return this.authAjaxService.rawAjaxRequest(params);
    };

    AccountListModel.prototype.loadTableFields = function () {
        return this.dataTableDataProvider.getTableFields();
    };

    AccountListModel.prototype.loadAccountsList = function (option, requestData, settings) {

        var searchData = requestData.customFilter;
        requestData.accountSearch = Object.keys(searchData).map(function (key) {
                return {column: key, value: searchData[key]};
            }
        );

        if (JSON.stringify(this.recentFilters) !== JSON.stringify(requestData.customFilter) ||
            JSON.stringify(this.recentOrder) !== JSON.stringify(requestData.order) ||
            settings.toggleFollow) {
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

        return this.authAjaxService.rawAjaxRequest({
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

        this.accountsList = this.accountsList.concat(responseData.data);

        if (this.accountsList.length === responseData.recordsFiltered)
            option.stopLoading = true;

        var list = self.accountsList;

        responseData.data = list;
        return responseData;
    };

    AccountListModel.prototype.deleteAccount = function(account){
        console.log(account);
        var self = this;
        var params = {
            url: Configuration.api.deleteAccount.format(account.id),
            type: 'delete',
            contentType: 'application/json',
            accept: 'application/json'
        };
        return self.authAjaxService.rawAjaxRequest(params);
    };

    AccountListModel.prototype.remapResponseError = function (error, callback) {
        return error;
    };

    return AccountListModel;
});
