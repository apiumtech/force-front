define([
    'config',
    'shared/services/ajax/AjaxService',
    'shared/services/AccountService'
], function (Configuration, AjaxService, AccountService) {

    function AccountFilterModel(ajaxService) {
        AccountService.call(this, ajaxService);
    }

    AccountFilterModel.inherits(AccountService, {});

    AccountFilterModel.prototype.loadAvailableFilters = function(filter){
        var self = this;
        var params = {
            url: Configuration.api.getAvailableFields + "?searchQuery=" + filter,
            type: 'get',
            contentType: 'application/json',
            accept: 'application/json'
        };

        return self.ajaxService.rawAjaxRequest(params);
    };

    AccountFilterModel.prototype.decorateAvailableOwners = function (result) {
        var self = this;

        result.forEach(function (record) {
            var existRecord = _.find(self.availableOwners, function (r) {
                return r.id == record.id;
            });

            if (existRecord) {
                record.selected = existRecord.selected;
            }
            else
                record.selected = false;
        });

        this.availableOwners = result;
        return this.availableOwners;
    };

    AccountFilterModel.prototype.decorateAvailableEnvironments = function (result) {
        var self = this;

        result.forEach(function (record) {
            var existRecord = _.find(self.availableEnvironments, function (r) {
                return r.id == record.id;
            });

            if (existRecord) {
                record.selected = existRecord.selected;
            }
            else
                record.selected = false;
        });

        this.availableEnvironments = result;
        return this.availableEnvironments;
    };

    AccountFilterModel.prototype.decorateAvailableAccountTypes = function (result) {
        var self = this;

        result.forEach(function (record) {
            var existRecord = _.find(self.availableAccountTypes, function (r) {
                return r.id == record.id;
            });

            if (existRecord) {
                record.selected = existRecord.selected;
            }
            else
                record.selected = false;
        });

        this.availableAccountTypes = result;
        return this.availableAccountTypes;
    };

    AccountFilterModel.prototype.decorateAvailableViews = function (result) {
        var self = this;

        result.forEach(function (record) {
            var existRecord = _.find(self.availableViews, function (r) {
                return r.id == record.id;
            });

            if (existRecord) {
                record.selected = existRecord.selected;
            }
            else
                record.selected = false;
        });

        this.availableViews = result;
        return this.availableViews;
    };

    AccountFilterModel.newInstance = function (ajaxService) {
        var _ajaxService = ajaxService || AjaxService.newInstance();
        return new AccountFilterModel(_ajaxService);
    };

    return AccountFilterModel;

});