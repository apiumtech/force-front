/**
 * Created by Justin on 2/5/2015.
 */
app.registerModel(function (container) {
    var Q = container.getFunction('q');
    var AjaxService = container.getService("services/ajax/AuthAjaxService");
    var StorageService = container.getService("services/StorageService");
    var Configuration = container.getService("Configuration");
    var _ = container.getFunction("underscore");

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

        var ajaxService = self.ajaxService ;

        var deferred = self.defer();

        ajaxService.rawAjaxRequest(params)
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
        if (!data || !data instanceof Array || data.length <= 0) throw new Error("No data received from server");
        var self = this;
        if (self.currentQuery == 'Environment') {
            var groupedData = _.groupBy(data, function (record) {
                return record.idParent;
            });

            _.each(groupedData, function (value, key) {
                if (key == '-1') { // move all the 2nd level nodes to the 1st one
                    _.each(value, function (record) {

                        if (groupedData['' + record.id + '']) {
                            record.children = groupedData['' + record.id + ''];
                        }
                    });
                } else {
                    _.each(value, function (record) {
                        if (groupedData['' + record.id + '']) {
                            record.children = groupedData['' + record.id + ''];
                        }
                    });
                }
            });

            return groupedData['-1'];
        }
        return data.data;
    };

    SalesAnalyticsFilterModel.prototype.defer = function () {
        var deferred = Q.defer();
        return deferred;
    };

    SalesAnalyticsFilterModel.newInstance = function (ajaxService, storageService) {
        var _ajaxService = ajaxService || AjaxService.newInstance();
        var _storageService = storageService || StorageService.newInstance();

        return new SalesAnalyticsFilterModel(_ajaxService, _storageService);
    };

    return SalesAnalyticsFilterModel;
});