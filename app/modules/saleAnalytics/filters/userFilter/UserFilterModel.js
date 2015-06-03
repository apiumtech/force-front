/**
 * Created by Justin on 2/5/2015.
 */

define([
    'shared/services/ajax/AuthAjaxService',
    'q',
    'underscore',
    'config',
    'shared/services/StorageService',
    'shared/services/ArrayHelper'
], function (AjaxService, Q, _, Configuration, StorageService, ArrayHelper) {
    'use strict';

    var ENVIRONMENT = 'Environment', TEAM = 'Hierarqhy';

    function UserFilterModel(ajaxService, storageService) {
        this.ajaxService = ajaxService || new AjaxService();
        this.storageService = storageService || new StorageService();
        this.currentQuery = UserFilterModel.ENVIRONMENT;
        this.arrayHelper = ArrayHelper;
    }

    UserFilterModel.inherits(Object, {});

    UserFilterModel.prototype.addQuery = function (value) {
        this.currentQuery = value;
    };

    UserFilterModel.prototype._getUsers = function () {
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

    UserFilterModel.prototype.getUsers = function () {
        return Q.fcall(this._getUsers.bind(this));
    };

    UserFilterModel.prototype.decorateData = function (data) {
        if (!data || !data instanceof Array || data.length <= 0) throw new Error("No data received from server");
        return this.arrayHelper.makeTree(data, 'idParent', 'id', 'children', -1);
    };

    UserFilterModel.prototype.defer = function () {
        var deferred = Q.defer();
        return deferred;
    };

    UserFilterModel.prototype.getFilteredData = function (data, filter, searchQuery) {
        if (!data || !(data instanceof Array) || data.length <= 0) throw new Error('Invalid data passed');
        if (filter != ENVIRONMENT && filter != TEAM) throw new Error('Invalid filterGroup passed');
        if (!searchQuery) return data;
        var self = this;
        var clonedData = JSON.parse(JSON.stringify(data));
        return self['getFilteredDataFor' + filter](clonedData, searchQuery);
        // TODO: Refactor to use same method
        //return this.arrayHelper.queryTree(clonedData, "children", "name", searchQuery, "id", true, "idParent", "id", -1);
    };

    UserFilterModel.prototype.getFilteredDataForEnvironment = function (data, searchQuery) {
        return this.arrayHelper.queryTree(data, "children", "name", searchQuery, "id", true, "idParent", "id", -1);
    };

    UserFilterModel.prototype.getFilteredDataForHierarqhy = function (data, searchQuery) {
        return this.arrayHelper.queryTree(data, "children", "name", searchQuery, "id", true, "idParent", "id", -1);

    };

    UserFilterModel.ENVIRONMENT = ENVIRONMENT;

    UserFilterModel.TEAM = TEAM;

    return UserFilterModel;
});