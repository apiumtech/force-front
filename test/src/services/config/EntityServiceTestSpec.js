/**
 * Created by joanllenas on 4/8/15.
 */

describe("EntityService", function () {
    var EntityService = app.getService('services/config/EntityService');
    var StorageService = app.getService("services/StorageService");

    var sut, storage;
    beforeEach(function () {
        storage = StorageService.newInstance().getOrElse(throwInstantiateException(StorageService));
        sut = EntityService.newInstance(storage).getOrElse(throwInstantiateException(EntityService));
    });

    afterEach(function(){
        window.localStorage.clear();
    });


    describe('storeEntities()', function(){
        it('should throw when no entities defined', function(){
            var no_entities_configObject = {};
            expect( sut.storeEntities.bind(sut, no_entities_configObject) ).toThrow();
        });

        it('should store entities when defined', function(){
            var config_with_entities = {
                entities: "ok!"
            };
            sut.storeEntities(config_with_entities);
            expect(storage.retrieve(EntityService.STORAGE_KEY)).toBe("ok!")
        });
    });


    describe('getEntityByName()', function(){
        it("shoud throw when no entityName is specified", function(){
            expect(sut.getEntityByName).toThrow();
        });

        it('should retrieve the correct entity', function(){
            var accountEntity = "ok entity";
            var config_stub = {
                entities: {
                    account: accountEntity
                }
            };
            sut.storeEntities(config_stub);
            var entity = sut.getEntityByName("account");
            expect(entity).toBe(accountEntity);
        });
    });

    describe('getEntityColumns()', function(){
        it("shoud throw when no entityName is specified", function(){
            expect(sut.getEntityColumns).toThrow();
        });

        it('should retrieve the correct entity columns', function(){
            var config_stub = {
                entities: {
                    account: {
                        fields: [
                            {
                                name: "id",
                                list: {label: "Id"},
                                struct: {type: "int"}
                            },
                            {
                                name: "name",
                                list: {label: "Name"},
                                struct: {type: "text"}
                            },
                            {
                                name: "sdfgds",
                                list: {label: "sadsfa"},
                                struct: {type: "unknownType"}
                            }
                        ]
                    }
                }
            };

            sut.storeEntities(config_stub);
            var columns = sut.getEntityColumns("account");

            var accountFields = config_stub.entities.account.fields;
            expect(columns[0].data).toBe(accountFields[0].name);
            expect(columns[0].title).toBe(accountFields[0].list.label);
            expect(columns[0].type).toBe(EntityService.COLUMN_TYPE_INT);

            expect(columns[1].data).toBe(accountFields[1].name);
            expect(columns[1].title).toBe(accountFields[1].list.label);
            expect(columns[1].type).toBe(EntityService.COLUMN_TYPE_TEXT);

            expect(columns[2].type).toBe(EntityService.COLUMN_TYPE_TEXT);
        });
    });
});