define([
    'config',
    'shared/services/StorageService',
    'underscore'
], function(config, StorageService, _){
    'use strict';

    function PermissionsService(storageService) {
        this.storageService = storageService;
    }

    PermissionsService.prototype._getPermissionsFromStorage = function(){
        return this.storageService.retrieve(config.permissionsStorageKey, true);
    };

    PermissionsService.prototype._parseRawPermissions = function(raw){
        var parsed = {};
        for(var p in raw){
            if( !_.isBoolean(raw[p]) ){
                for(var p2 in raw[p]){
                    parsed[p+"."+p2] = raw[p][p2];
                }
            } else {
                parsed[p] = raw[p];
            }
        }
        return parsed;
    };


    /**
     * Gets the permission value.
     *
     * @param permission Required String with the name of the permission. i.e "sfm.isEnabled"
     * @param defaultValue Optional Boolean value that will be used as default value.
     * @returns Boolean
     */
    PermissionsService.prototype.getPermission = function(permission, defaultValue){
        assertNotNull("permission", permission);
        this.parsedPermissions = this.parsedPermissions || (this.parsedPermissions = this._parseRawPermissions(this._getPermissionsFromStorage()));
        if(permission in this.parsedPermissions){
            return this.parsedPermissions[permission];
        }
        return !!defaultValue;
    };


    PermissionsService.newInstance = function(storageService){
        storageService = storageService || StorageService.newInstance();
        var serv = new PermissionsService(storageService);
        return serv;
    };

    return PermissionsService;
});