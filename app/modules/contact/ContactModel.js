/**
 * Created by joanllenas on 3/31/15.
 */
define([
    'config',
    'shared/services/ajax/AjaxService',
    'shared/services/config/EntityService',
    'shared/services/StorageService',
    'q'
], function (Configuration, AjaxService, EntityService, StorageService, Q) {
    'use strict';

    function ContactModel(ajaxService, entityService, storageService) {
        this.authAjaxService = ajaxService;
        this.entityService = entityService;
        this.storageService = storageService;
        this.configuration = Configuration;
    }

    ContactModel.prototype.loadContactFilters = function () {
        var deferred = Q.defer();

        try {
            var filters = this.entityService.getEntityFilters("contact");
            setTimeout(deferred.resolve, 10, filters);
        } catch (err) {
            setTimeout(deferred.reject, 10, "Error loading contacts");
        }

        return deferred.promise;
    };


    ContactModel.prototype.loadContactColumns = function () {
        var deferred = Q.defer();

        try {
            var columns = this.entityService.getEntityColumns("contact");
            setTimeout(deferred.resolve, 10, columns);
        } catch (err) {
            setTimeout(deferred.reject, 10, "Error loading contacts");
        }

        return deferred.promise;
    };


    ContactModel.prototype.loadContacts = function () {

        var params = {
            url: this.configuration.api.getContacts,
            type: 'GET',
            contentType: 'application/json',
            accept: 'application/json',
            dataType: 'json',
            headers: {
                token: this.storageService.retrieve("token")
            }
        };
        return this.authAjaxService.rawAjaxRequest(params);
    };


    ContactModel.newInstance = function (ajaxService, entityService, storageService) {
        ajaxService = ajaxService || AjaxService.newInstance();
        entityService = entityService || EntityService.newInstance();
        storageService = storageService || StorageService.newInstance();

        return new ContactModel(ajaxService, entityService, storageService);
    };

    return ContactModel;
});
