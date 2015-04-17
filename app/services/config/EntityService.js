/**
 * Created by joanllenas on 4/8/15.
 */

app.registerService(function () {
    var StorageService = app.getService('services/StorageService');


    /**
     * @constructor
     */
    function EntityService(storage) {
        this.storage = storage;
    }


    EntityService.prototype = Object.create(Object.prototype, {});


    EntityService.STORAGE_KEY = "fmConfigEntities";
    EntityService.COLUMN_TYPE_INT = "num";
    EntityService.COLUMN_TYPE_TEXT = "string";
    EntityService.COLUMN_TYPE_DATE = "date";
    EntityService.COLUMN_DEFAULT_LABEL = "-";
    EntityService.COLUMN_DEFAULT_SORTABLE = true;


    /**
     * Store Entities object from a config object
     *
     * @method storeEntities()
     */
    EntityService.prototype.storeEntities = function(configObj){
        if( !configObj.entities ){
            throw new Error('This Config Object does not have entities');
        }
        this.storage.store(EntityService.STORAGE_KEY, configObj.entities );
    };


    /**
     * Get Entity object By Name
     *
     * @method getEntityByName()
     */
    EntityService.prototype.getEntityByName = function(entityName){
        if(!entityName){
            throw new Error("No entity name was specified");
        }
        var entitiesObj = this.storage.retrieve(EntityService.STORAGE_KEY);
        return entitiesObj[entityName];
    };


    /**
     * Given an entity name, returns a collection of dataTable-compilant columns.
     *
     * @method getEntityColumns()
     */
    EntityService.prototype.getEntityColumns = function(entityName){
        if(!entityName){
            throw new Error("No entity name was specified");
        }

        var requiredField = function(fieldName, fieldValue) {
            assertNotNull(fieldName, fieldValue);
            return fieldValue;
        };

        var resolveColumnType = function(type) {
            return  type === "int"  ? EntityService.COLUMN_TYPE_INT  :
                    type === "text" ? EntityService.COLUMN_TYPE_TEXT :
                    type === "date" ? EntityService.COLUMN_TYPE_DATE :
                    EntityService.COLUMN_TYPE_TEXT;
        };

        // column spec resolver
        var fieldToColumn = function(field) {
            var list = field.list;
            var struct = field.struct;
            return {
                data: requiredField("name", field.name),
                title: list.label || EntityService.COLUMN_DEFAULT_LABEL,
                type: resolveColumnType(struct.type),
                visible: list.isAlwaysVisible ||  list.isDefaultVisible,
                sortable: list.isSortable || EntityService.COLUMN_DEFAULT_SORTABLE,
                isAlwaysVisible: function(){ return list.isAlwaysVisible; }
            };
        };

        var entity = this.getEntityByName(entityName);
        var columns = entity.fields.map(fieldToColumn);
        return columns;
    };

    EntityService.prototype.getEntityFilters = function(entityName){
        if(!entityName){
            throw new Error("No entity name was specified");
        }
        return [];
    };


    /**
     * EntityService factory
     *
     * @method static newInstance
     */
    EntityService.newInstance = function (storage) {
        storage = storage || StorageService.newInstance().getOrElse(throwInstantiateException(StorageService));
        return Some(new EntityService(storage));
    };

    return EntityService;
});