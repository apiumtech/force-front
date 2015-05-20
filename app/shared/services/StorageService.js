/**
 * Created by justin on 1/27/15.
 */
define([], function () {

    function StorageService(storage) {
        this.storage = storage;
    }

    StorageService.prototype = Object.create(Object.prototype, {});

    StorageService.prototype.retrieve = function (storageName) {
        var value = this.storage.getItem(storageName);
        try {
            value = JSON.parse(value);
        } catch (e) {

        }
        return value;
    };

    StorageService.prototype.store = function (storageName, storageValue) {
        var s_Value = (typeof storageValue !== 'string')
            ? JSON.stringify(storageValue) : storageValue;

        this.storage.setItem(storageName, s_Value);
    };

    StorageService.prototype.remove = function (storageName) {
        this.storage.removeItem(storageName);
    };

    StorageService.newInstance = function () {
        if (undefined === window.localStorage)
            throw new Error("Local Storage is not available");

        return new StorageService(window.localStorage);
    };

    return StorageService;
});