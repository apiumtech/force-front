/**
 * Created by Justin on 2/5/2015.
 */
app.registerModel(function (container) {
    var Q = container.getFunction('q');
    var AjaxService = container.getService("services/AjaxService");
    var StorageService = container.getService("services/StorageService");

    function SalesAnalyticsFilterModel(ajaxService, storageService) {
        this.ajaxService = ajaxService;
        this.storageService = storageService;
        this.queries = {};
    }

    SalesAnalyticsFilterModel.prototype = Object.create(Object.prototype, {});

    SalesAnalyticsFilterModel.prototype.buildQueryString = function () {
        var queries = "";

        for (var prop in this.queries) {
            if (queries !== "") queries += "&";
            queries += prop + "=" + this.queries[prop];
        }

        return queries;
    };

    SalesAnalyticsFilterModel.prototype.addQuery = function (key, value) {
        this.queries[key] = value;
    };

    SalesAnalyticsFilterModel.prototype._getUsers = function () {
        var self = this;

        var url = '/api/users';

        var queriesString = self.buildQueryString();
        if (queriesString) url += "?" + queriesString;

        var params = {
            url: url,
            type: 'get',
            contentType: 'application/json',
            accept: 'application/json'
        };

        var deferred = self.defer();

        self.ajaxService.ajax(params)
            .then(function (data) {
                var formattedData = self.decorateData(data);
                deferred.resolve(formattedData);
            },
            function (error) {
                deferred.reject(error);
            });

        return deferred.promise;
    };

    SalesAnalyticsFilterModel.prototype.getUsers = function () {
        return Q.fcall(this._getUsers.bind(this));
    };

    SalesAnalyticsFilterModel.prototype.decorateData = function (data) {
        return data.data;
    };

    SalesAnalyticsFilterModel.prototype.defer = function () {
        var deferred = Q.defer();
        return deferred;
    };

    SalesAnalyticsFilterModel.newInstance = function (ajaxService, storageService) {
        var _ajaxService = ajaxService || AjaxService.newInstance().getOrElse(throwInstantiateException(AjaxService));
        var _storageService = storageService || StorageService.newInstance().getOrElse(throwInstantiateException(StorageService));

        return Some(new SalesAnalyticsFilterModel(_ajaxService, _storageService));
    };

    return SalesAnalyticsFilterModel;
});