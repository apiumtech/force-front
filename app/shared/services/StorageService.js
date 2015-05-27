/**
 * Created by justin on 1/27/15.
 */
define([], function () {

    function StorageService(storage, sessionStorage) {
        this.storage = storage || window.localStorage;
        this.sessionStorage = sessionStorage || window.sessionStorage;
    }

    StorageService.prototype = Object.create(Object.prototype, {});

    StorageService.prototype.retrieve = function (storageName, retrieveFromSession) {
        var value = this.getStorage(retrieveFromSession).getItem(storageName);
        try {
            value = JSON.parse(value);
        } catch (e) {

        }
        return value;
    };

    StorageService.prototype.store = function (storageName, storageValue, storeInSession) {
        var s_Value = (typeof storageValue !== 'string')
            ? JSON.stringify(storageValue) : storageValue;

        this.getStorage(storeInSession).setItem(storageName, s_Value);
    };

    StorageService.prototype.getStorage = function (isSessionStorage) {
        return isSessionStorage ? this.sessionStorage : this.storage;
    };

    StorageService.prototype.remove = function (storageName, removeFromSession) {
        this.getStorage(removeFromSession).removeItem(storageName);
    };

    StorageService.prototype.clear = function (clearFromSession) {
        this.getStorage(clearFromSession).clear();
    };

    StorageService.newInstance = function () {
        if (undefined === window.localStorage) {
            throw new Error("Local Storage is not available");
        }

        return new StorageService(window.localStorage, window.sessionStorage);
    };

    return StorageService;
});