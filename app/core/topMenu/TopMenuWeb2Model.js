/**
 * Created by joanllenas on 4/21/15.
 */

define([
    'shared/services/ajax/AjaxService',
    'shared/services/StorageService',
    'config',
    'q'
], function (AjaxService, StorageService, Configuration, Q) {
    'use strict';

    function TopMenuWeb2Model(ajaxService, storageService, configuration) {
        this.authAjaxService = ajaxService;
        this.storageService = storageService;
        this.configuration = configuration;
    }

    TopMenuWeb2Model.USER_DATA_KEY = "fm2UserData";


    TopMenuWeb2Model.prototype.getUserSections = function () {
        var userData = this.storageService.retrieve(TopMenuWeb2Model.USER_DATA_KEY);
        return userData.userSections.sections;
    };

    TopMenuWeb2Model.prototype.getUserOptions = function () {
        var userData = this.storageService.retrieve(TopMenuWeb2Model.USER_DATA_KEY);
        return userData.userOptions.menuItems;
    };

    TopMenuWeb2Model.prototype.getUserData = function () {
        var userData = this.storageService.retrieve(TopMenuWeb2Model.USER_DATA_KEY);
        return userData.userData;
    };

    TopMenuWeb2Model.prototype.getUserNotifications = function () {
        var userData = this.storageService.retrieve(TopMenuWeb2Model.USER_DATA_KEY);
        return userData.unreadNotifications;
    };


    TopMenuWeb2Model.prototype.logout = function () {
        var self = this;

        var params = {
            url: this.configuration.api.logout,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            method: "POST"
        };

        return this.authAjaxService.rawAjaxRequest(params);
    };


    TopMenuWeb2Model.prototype.getUserDataInfo = function () {
        var self = this;
        var deferred = Q.defer();

        var params = {
            url: this.configuration.api.getUserDataInfo,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            method: "POST"
        };

        this.authAjaxService.rawAjaxRequest(params).then(
            function (data) {
                var userData = JSON.parse(data.d);
                self.storeUserData(userData);
                deferred.resolve();
            }
        );

        return deferred.promise;
    };


    TopMenuWeb2Model.prototype.storeUserData = function (userData) {
        this.storageService.store(TopMenuWeb2Model.USER_DATA_KEY, userData);
    };


    TopMenuWeb2Model.newInstance = function (ajaxService, storageService, configuration) {
        ajaxService = ajaxService || AjaxService.newInstance();
        storageService = storageService || StorageService.newInstance();
        configuration = configuration || Configuration;

        return new TopMenuWeb2Model(ajaxService, storageService, configuration);
    };


    return TopMenuWeb2Model;
});
