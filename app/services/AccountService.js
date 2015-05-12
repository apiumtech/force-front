/**
 * Created by justin on 3/9/15.
 */

app.registerService(function (container) {
    var Configuration = container.getService('Configuration');
    var AjaxService = container.getService("services/AjaxService");
    var Q = container.getFunction('q');

    function AccountService(ajaxService) {
        this.ajaxService = ajaxService;
        this.availableOwners = null;
        this.availableEnvironments = null;
        this.availableViews = null;
        this.availableAccountTypes = null;
    }

    AccountService.prototype.getAccount = function (id) {
        return this.ajaxService.rawAjaxRequest({
            url: Configuration.api.getAccount.format(id),
            type: 'get',
            contentType: 'application/json',
            accept: 'application/json'
        });
    };

    AccountService.prototype.updateAccount = function (id, model) {
        var self = this;
        var params = {
            url: Configuration.api.updateAccount.format(id),
            type: 'put',
            contentType: 'application/json',
            accept: 'application/json',
            data: model
        };

        return self.ajaxService.rawAjaxRequest(params);
    };

    AccountService.prototype.createAccount = function (model) {
        var self = this;
        var params = {
            url: Configuration.api.createAccount,
            type: 'post',
            contentType: 'application/json',
            accept: 'application/json',
            data: model
        };

        return self.ajaxService.rawAjaxRequest(params);
    };

    AccountService.prototype.getAvailableOwners = function (filter) {
        var query = "";
        if (filter) {
            query += "?query=" + filter;
        }

        var params = {
            url: Configuration.api.getAvailableOwners + query,
            type: 'get',
            contentType: 'application/json',
            accept: 'application/json'
        };

        return this.ajaxService.rawAjaxRequest(params).then(this.decorateAvailableOwners.bind(this));
    };

    AccountService.prototype.decorateAvailableOwners = function (result) {
        this.availableOwners = result;
        return this.availableOwners;
    };

    AccountService.prototype.getAvailableEnvironments = function (filter) {
        var query = "";
        if (filter) {
            query += "?query=" + filter;
        }

        var params = {
            url: Configuration.api.getAvailableEnvironments + query,
            type: 'get',
            contentType: 'application/json',
            accept: 'application/json'
        };

        return this.ajaxService.rawAjaxRequest(params).then(this.decorateAvailableEnvironments.bind(this));
    };

    AccountService.prototype.decorateAvailableEnvironments = function (result) {
        this.availableEnvironments = result;
        return this.availableEnvironments;
    };

    AccountService.prototype.getAvailableAccountTypes = function (filter) {
        var query = "";
        if (filter) {
            query += "?query=" + filter;
        }

        var params = {
            url: Configuration.api.getAvailableAccountTypes + query,
            type: 'get',
            contentType: 'application/json',
            accept: 'application/json'
        };

        return this.ajaxService.rawAjaxRequest(params).then(this.decorateAvailableAccountTypes.bind(this));
    };

    AccountService.prototype.decorateAvailableAccountTypes = function (result) {
        this.availableAccountTypes = result;
        return this.availableAccountTypes;
    };

    AccountService.prototype.getAvailableViews = function (filter) {
        var query = "";
        if (filter) {
            query += "?query=" + filter;
        }

        var params = {
            url: Configuration.api.getAvailableViews + query,
            type: 'get',
            contentType: 'application/json',
            accept: 'application/json'
        };

        return this.ajaxService.rawAjaxRequest(params).then(this.decorateAvailableViews.bind(this));
    };

    AccountService.prototype.decorateAvailableViews = function (result) {
        this.availableViews = result;
        return this.availableViews;
    };

    AccountService.newInstance = function (ajaxService) {
        var _ajaxService = ajaxService || AjaxService.newInstance();
        return new AccountService(_ajaxService);
    };

    return AccountService;

});