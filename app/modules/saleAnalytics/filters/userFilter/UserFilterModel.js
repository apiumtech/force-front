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
        this.authAjaxService = ajaxService || new AjaxService();
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

        var ajaxService = self.authAjaxService;

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

                try{
                    var formattedData = self.decorateData(data);
                    deferred.resolve(formattedData);
                }catch(err){
                    deferred.reject(err);
                }
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
        if (!data || !(data instanceof Array) || data.length <= 0){
            throw new Error("No data received from server");
        }

        var nonComputableUsers = data.filter(function (node) {
            return node.ComputeInSFM === false;
        });
        this.storageService.store('nonComputableUsers', _.pluck(nonComputableUsers,'Id'), true);

        // Saved User Filter
        var savedUserFilterArray = this.storageService.retrieve('userFilter', true) || [];
        data.forEach(function(item){
            item.visible = true; // needed for the tree to display correctltly
            item.checked = savedUserFilterArray.indexOf(item.Id) > -1;
            var parentFound = false;
            for(var i=0; i<data.length; i++) {
              if(item.ParentId === -1 || data[i].Id === item.ParentId) {
                parentFound = true;
                break;
              }
            }
            item.ParentId = parentFound ? item.ParentId : -1;
        });
        return this.arrayHelper.makeTree(data, 'ParentId', 'Id', 'children', -1);
    };

    UserFilterModel.prototype.defer = function () {
        var deferred = Q.defer();
        return deferred;
    };

    UserFilterModel.prototype.getFilteredData = function (data, filter, searchQuery) {
        if (!data || !(data instanceof Array) || data.length <= 0){
            throw new Error('Invalid data passed');
        }
        if (filter !== ENVIRONMENT && filter !== TEAM){
            throw new Error('Invalid filterGroup passed');
        }
        /*if (!searchQuery){
            return data;
        }*/

        var self = this;
        var clonedData = JSON.parse(JSON.stringify(data));

        //return self['getFilteredDataFor' + filter](clonedData, searchQuery);
        return self.doGetFilteredData(clonedData, searchQuery);

        // TODO: Refactor to use same method
        //return this.arrayHelper.queryTree(clonedData, "children", "Name", searchQuery, "Id", true, "ParentId", "Id", -1);
    };

    UserFilterModel.prototype.doGetFilteredData = function (data, searchQuery) {
        var newArray = this.arrayHelper.clone(data);
        var flattened = this.arrayHelper.flatten(newArray, "children");
        //var flatTree = this.arrayHelper.queryFlatTree(flattened,"children","Name",searchQuery,"Id",true,"ParentId","Id",-1);
        var flatTree = this.arrayHelper.queryFlatTree(flattened,"children","Name",searchQuery,"Name",true,"ParentId","Id",-1);

        flattened.forEach(function(item){
            var index;
            var foundItems = flatTree.filter(function(filtered, idx){
                var found = filtered.Id === item.Id;
                if(found){
                    index = idx;
                }
                return found;
            });
            if(foundItems.length > 1) {
                throw new Error("More than one user with same Id");
            }
            if(foundItems.length === 1) {
                item.visible = true;
                flatTree.splice(index, 1);
            } else {
                item.visible = false;
            }
        });

        return this.arrayHelper.makeTree(
            flattened,
            "ParentId",
            "Id",
            "children",
            -1
        );
    };

    /*UserFilterModel.prototype.getFilteredDataForEnvironment = function (data, searchQuery) {
        return this.arrayHelper.queryTree(
            data,
            "children",
            "Name",
            searchQuery,
            "Id",
            true,
            "ParentId",
            "Id",
            -1
        );
    };

    UserFilterModel.prototype.getFilteredDataForHierarqhy = function (data, searchQuery) {
        return this.arrayHelper.queryTree(
            data,
            "children",
            "Name",
            searchQuery,
            "Id",
            true,
            "ParentId",
            "Id",
            -1
        );

    };*/

    UserFilterModel.ENVIRONMENT = ENVIRONMENT;
    UserFilterModel.TEAM = TEAM;

    return UserFilterModel;
});
