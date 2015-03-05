/**
 * Created by trung.dang on 02/12/2015
 */
app.registerModel(function (container) {
    var Configuration = container.getService('Configuration');
    var AjaxService = container.getService("services/AjaxService");
    var Q = container.getFunction('q');

    function AccountFilterModel(ajaxService) {
        this.ajaxService = ajaxService;
        this.availableOwners = null;
        this.availableEnvironments = null;
        this.availableViews = null;
        this.availableAccountTypes = null;
    }

    AccountFilterModel.prototype.getAvailableOwners = function (filter) {
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

    AccountFilterModel.prototype.getAvailableEnvironments = function (filter) {
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

    AccountFilterModel.prototype.getAvailableAccountTypes = function (filter) {
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

    AccountFilterModel.prototype.getAvailableViews = function (filter) {
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
        var _ajaxService = ajaxService || AjaxService.newInstance().getOrElse(throwInstantiateException(AjaxService));
        return Some(new AccountFilterModel(_ajaxService));
    };

    return AccountFilterModel;

});