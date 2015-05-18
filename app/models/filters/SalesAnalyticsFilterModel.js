/**
 * Created by Justin on 2/5/2015.
 */

app.registerModel(function (container) {
    var Q = container.getFunction('q');
    var AjaxService = container.getService("services/ajax/AuthAjaxService");
    var StorageService = container.getService("services/StorageService");
    var Configuration = container.getService("Configuration");
    var _ = container.getFunction("underscore");

    var ENVIRONMENT = 'Environment', TEAM = 'Hierarqhy';

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

        var ajaxService = self.ajaxService;

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
    SalesAnalyticsFilterModel.prototype.decoratingDataUsingEnvironmentMethod = function (data) {
        var result = [];

        data.forEach(function (dataRecord) {
            var group;
            if (dataRecord.idParent == "-1") {
                group = _.find(result, function (item) {
                    return item.id == dataRecord.id;
                });
                if (group === undefined) {
                    group = {
                        id: dataRecord.id,
                        group: dataRecord.name,
                        children: []
                    };
                    result.push(group);
                }
            } else {
                group = _.find(result, function (item) {
                    return item.id === dataRecord.idParent;
                });
                if (group) {
                    dataRecord.checked = false;
                    group.children.push(dataRecord);
                }
            }
        });

        return result;
    };

    SalesAnalyticsFilterModel.prototype.decoratingDataUsingHierarqhyMethod = function (data) {
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
    };

    SalesAnalyticsFilterModel.prototype.decorateData = function (data) {
        if (!data || !data instanceof Array || data.length <= 0) throw new Error("No data received from server");
        var self = this;

        return self['decoratingDataUsing' + self.currentQuery + 'Method'](data);
    };

    SalesAnalyticsFilterModel.prototype.defer = function () {
        var deferred = Q.defer();
        return deferred;
    };

    SalesAnalyticsFilterModel.prototype.getFilteredData = function (data, filter, searchQuery) {
        if (!data || !(data instanceof Array) || data.length <= 0) throw new Error('Invalid data passed');
        if (filter != ENVIRONMENT && filter != TEAM) throw new Error('Invalid filterGroup passed');
        if (!searchQuery) return data;
        var self = this;
        var clonedData = JSON.parse(JSON.stringify(data));
        return self['getFilteredDataFor' + filter](clonedData, searchQuery);
    };

    SalesAnalyticsFilterModel.prototype.getFilteredDataForEnvironment = function (data, searchQuery) {
        var filteredData = data.map(function (record) {
            if (!record.children) return record;

            // 2nd level
            var filteredChildren = _.filter(record.children, function (child) {
                return child.name.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1;
            });

            record.children = filteredChildren;
            return record;
        });
        return filteredData;
    };

    SalesAnalyticsFilterModel.prototype.getFilteredDataForHierarqhy = function (data, searchQuery) {
        var self = this;
        var outputArr = [];
        function flattenChildren(arr) {
            return arr.reduce(function (flat, toFlatten) {
                if(toFlatten.children){
                    flattenChildren(toFlatten.children);
                }
                if(toFlatten.children || toFlatten.name.indexOf(searchQuery) > -1) {
                    outputArr.push({
                        id: toFlatten.id,
                        name: toFlatten.name,
                        idParent: toFlatten.idParent,
                        checked: toFlatten.checked
                    });
                }
            }, []);
        }

        flattenChildren(data);

        console.log(JSON.stringify(self.decoratingDataUsingHierarqhyMethod(outputArr)));
        return self.decoratingDataUsingHierarqhyMethod(outputArr);

    };

    SalesAnalyticsFilterModel.ENVIRONMENT = ENVIRONMENT;

    SalesAnalyticsFilterModel.TEAM = TEAM;

    SalesAnalyticsFilterModel.newInstance = function (ajaxService, storageService) {
        var _ajaxService = ajaxService || AjaxService.newInstance();
        var _storageService = storageService || StorageService.newInstance();

        return new SalesAnalyticsFilterModel(_ajaxService, _storageService);
    };

    return SalesAnalyticsFilterModel;
});