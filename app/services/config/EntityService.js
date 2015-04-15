/**
 * Created by joanllenas on 4/8/15.
 */

app.registerService(function () {
    var StorageService = app.getService('services/StorageService');

    function EntityService(storage) {
        this.storage = storage;
    }

    EntityService.prototype = Object.create(Object.prototype, {});
    EntityService.STORAGE_KEY = "fmConfigEntities";

    EntityService.prototype.storeEntities = function(configObj){
        if( !configObj.entities ){
            throw new Error('This Config Object does not have entities');
        }
        this.storage.store(EntityService.STORAGE_KEY, configObj.entities );
    };

    EntityService.prototype.getEntityByName = function(entityName){
        if(!entityName){
            throw new Error("No entity name was specified");
        }
        var entitiesObj = this.storage.retrieve(EntityService.STORAGE_KEY);
        return entitiesObj[entityName];
    };

    EntityService.prototype.getEntityColumns = function(entityName){
        if(!entityName){
            throw new Error("No entity name was specified");
        }

        // column spec
        var fieldToColumn = function(field){
            return {
                data: field.name,
                title: field.list.label
            };
        };

        var entity = this.getEntityByName(entityName);
        var columns = entity.fields.map(fieldToColumn);
        return columns;
    };

    EntityService.newInstance = function (storage) {
        storage = storage || StorageService.newInstance().getOrElse(throwInstantiateException(StorageService));
        return Some(new EntityService(storage));
    };

    return EntityService;
});