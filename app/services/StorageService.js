/**
 * Created by justin on 1/27/15.
 */
app.registerService(function () {

    function StorageService(storage) {
        this.storage = storage;
    }

    StorageService.prototype = Object.create(Object.prototype, {});

    StorageService.prototype.retrieve = function (storageName) {
        var value = this.storage.getItem(storageName);
        console.log("retrieve "+value);
        try {
            value = JSON.parse(value);
console.log(value);
        } catch (e) {
        }
        return value;
    };

    StorageService.prototype.store = function (storageName, storageValue) {
        var s_Value;
        if (typeof storageValue !== 'string')
            s_Value = JSON.stringify(storageValue);
        else
            s_Value = storageValue;

        this.storage.setItem(storageName, s_Value);
    };

    StorageService.prototype.remove = function (storageName) {
        this.storage.removeItem(storageName);
    };

    StorageService.newInstance = function () {
        if (undefined === window.localStorage)
            return None();

        return Some(new StorageService(window.localStorage));
    };

    return StorageService;
});