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
                                    isDefaultVisible: true,
                                    isSortable: false
                                },
                                struct: {type: "int"}
                            },
                            {
                                name: "name",
                                list: {
                                    label: "Name",
                                    isAlwaysVisible: false,
                                    isDefaultVisible: true,
                                    isSortable: true
                                },
                                struct: {type: "text"}
                            }
                        ]
                    }
                }
            };
        });

        it('should retrieve the columns', function(){
            sut.storeEntities(config_stub);
            var columns = sut.getEntityColumns("account");
            expect(columns.length).toBe(2);
        });

        it("shoud throw when no entityName is specified", function(){
            expect(sut.getEntityColumns).toThrow();
        });

        describe("column type", function(){
            function assignTypeAndReturnColumns(type){
                config_stub.entities.account.fields[0].struct.type = type;
                sut.storeEntities(config_stub);
                return sut.getEntityColumns("account");
            }
            it('should default to '+ EntityService.COLUMN_TYPE_TEXT +' when the type is unknown', function(){
                var columns = assignTypeAndReturnColumns("unknownType");
                expect(columns[0].type).toBe(EntityService.COLUMN_TYPE_TEXT);
            });
            it('should be '+ EntityService.COLUMN_TYPE_TEXT +' when string is provided', function(){
                var columns = assignTypeAndReturnColumns("string");
                expect(columns[0].type).toBe(EntityService.COLUMN_TYPE_TEXT);
            });
            it("should be "+ EntityService.COLUMN_TYPE_INT +" when int is provided", function(){
                var columns = assignTypeAndReturnColumns("int");
                expect(columns[0].type).toBe(EntityService.COLUMN_TYPE_INT);
            });
            it("should be "+ EntityService.COLUMN_TYPE_DATE +" when date is provided", function(){
                var columns = assignTypeAndReturnColumns("date");
                expect(columns[0].type).toBe(EntityService.COLUMN_TYPE_DATE);
            });

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

        describe('sortable', function(){
            it('should be true when isSortable is true', function(){
                config_stub.entities.account.fields[0].list.isSortable = true;
                sut.storeEntities(config_stub);
                var cols = sut.getEntityColumns("account");
                expect(cols[0].sortable).toBe(true);
            });

            it('should have the default value when isSortable is not set', function(){
                delete config_stub.entities.account.fields[0].list.isSortable;
                sut.storeEntities(config_stub);
                var cols = sut.getEntityColumns("account");
                expect(cols[0].sortable).toBe(EntityService.COLUMN_DEFAULT_SORTABLE);
            });
        });

    });// END getEntityColumns

    describe("getEntityFilters", function(){

        it('should be defined', function(){
            expect(sut.getEntityFilters).toBeDefined();
        });

        it('throw when no entityName is provided', function(){
            expect(sut.getEntityFilters).toThrow();
        });

        xit('should retrieve a collection of filters', function(){

        });
    })
});