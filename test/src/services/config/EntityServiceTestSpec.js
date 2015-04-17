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
        var config_stub;
        beforeEach(function(){
            config_stub = {
                entities: {
                    account: {
                        fields: [
                            {
                                name: "id",
                                list: {
                                    label: "Id",
                                    isAlwaysVisible: false,
                                    isDefaultVisible: true
                                },
                                struct: {type: "int"}
                            },
                            {
                                name: "name",
                                list: {
                                    label: "Name",
                                    isAlwaysVisible: false,
                                    isDefaultVisible: true
                                },
                                struct: {type: "text"}
                            }
                        ]
                    }
                }
            };
        });
        it("shoud throw when no entityName is specified", function(){
            expect(sut.getEntityColumns).toThrow();
        });

        it('should retrieve the correct basic entity columns', function(){
            sut.storeEntities(config_stub);
            var columns = sut.getEntityColumns("account");

            var accountFields = config_stub.entities.account.fields;
            expect(columns[0].data).toBe(accountFields[0].name);
            expect(columns[0].title).toBe(accountFields[0].list.label);
            expect(columns[0].type).toBe(EntityService.COLUMN_TYPE_INT);

            expect(columns[1].data).toBe(accountFields[1].name);
            expect(columns[1].title).toBe(accountFields[1].list.label);
            expect(columns[1].type).toBe(EntityService.COLUMN_TYPE_TEXT);
        });

        it('should set column type to "text" when the type is unknown', function(){
            config_stub.entities.account.fields[0].struct.type = "unknownType";
            sut.storeEntities(config_stub);
            var columns = sut.getEntityColumns("account");
            var accountFields = config_stub.entities.account.fields;
            expect(columns[0].type).toBe(EntityService.COLUMN_TYPE_TEXT);
        });

        it('should throw when no name is specified for the entity', function(){
            delete config_stub.entities.account.fields[0].name;
            sut.storeEntities(config_stub);
            expect(
                function(){
                    sut.getEntityColumns("account");
                }
            ).toThrow();
        });

        it('should set a default title when no label provided', function(){
            delete config_stub.entities.account.fields[0].list.label;
            sut.storeEntities(config_stub);
            var cols = sut.getEntityColumns("account");
            expect(cols[0].title).toBe(EntityService.COLUMN_DEFAULT_LABEL);
        });

        describe("column.visible", function(){
            function setupVisibilityAndStore(alwaysVisible, defaultVisible){
                config_stub.entities.account.fields[0].list.isAlwaysVisible = alwaysVisible;
                config_stub.entities.account.fields[0].list.isDefaultVisible = defaultVisible;
                sut.storeEntities(config_stub);
                return sut.getEntityColumns("account");
            }

            it('should always be true when isAlwaysVisible', function(){
                var cols = setupVisibilityAndStore(true, false);
                expect(cols[0].visible).toBe(true);
            });

            it('should be true when isDefaultVisible', function(){
                var cols = setupVisibilityAndStore(false, true);
                expect(cols[0].visible).toBe(true);
            });

            it('should be false when !isDefaultVisible', function(){
                var cols = setupVisibilityAndStore(false, false);
                expect(cols[0].visible).toBe(false);
            });

        });

        it('should resolve isAlwaysVisible() to the same value as the original field.isAlwaysVisible', function(){
            config_stub.entities.account.fields[0].list.isAlwaysVisible = true;
            sut.storeEntities(config_stub);
            var cols = sut.getEntityColumns("account");
            expect(cols[0].isAlwaysVisible()).toBe(true);
        });

    });
});