/**
 * Created by Justin on 2/5/2015.
 */
app.registerModel(function (container) {
    var Q = container.getFunction('q');
    var AjaxService = container.getService("services/ajax/AuthAjaxService");
    var StorageService = container.getService("services/StorageService");
    var Configuration = container.getService("Configuration");

    function SalesAnalyticsFilterModel(ajaxService, storageService) {
        this.ajaxService = ajaxService;
        this.storageService = storageService;
        this.currentQuery = 'Environment';
    }

    SalesAnalyticsFilterModel.prototype = Object.create(Object.prototype, {});

    SalesAnalyticsFilterModel.prototype.addQuery = function (value) {
        this.currentQuery = value;
    };

    SalesAnalyticsFilterModel.prototype._getUsers = function () {
        var self = this;

        var url = Configuration.api.userTreeFiltersApi.format(self.currentQuery);

        var params = {
            url: url,
            type: 'get',
            contentType: 'application/json',
            accept: 'application/json'
        };

        var deferred = self.defer();

        self.ajaxService.rawAjaxRequest(params)
            .then(function (data) {
                if (typeof data === 'string') {
                    try {
                        data = JSON.parse(data);
                    } catch (e) {
                        deferred.reject(e);
                    }
                }

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