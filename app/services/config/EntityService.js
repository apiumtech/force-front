/**
 * Created by joanllenas on 4/8/15.
 */

app.registerService(function () {
    var StorageService = app.getService('services/StorageService');

    function EntityService(storage) {
        this.storage = storage;
    }

    EntityService.prototype = Object.create(Object.prototype, {});
    EntityService.CONFIG_KEY = "fmConfig";

    EntityService.prototype.getEntityByName = function(entityName){
        var config = this.storage.retrieve(EntityService.CONFIG_KEY);
        return config.entities[entityName];
    };

    EntityService.newInstance = function (storage) {
        storage = storage || StorageService.newInstance().getOrElse(throwInstantiateException(StorageService));
        return Some(new EntityService(storage));
    };

    return EntityService;
});