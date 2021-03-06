/**
 * Created by joanllenas on 4/8/15.
 */

define([
    'shared/services/config/EntityService',
    'shared/services/StorageService'
], function (EntityService, StorageService) {
    'use strict';
    describe("EntityService", function () {

        var sut, storage, config_stub;
        beforeEach(function () {
            storage = StorageService.newInstance();
            sut = EntityService.newInstance(storage);

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
                                    isSortable: false,
                                    isDefaultFilter: true,
                                    isFilter: true
                                },
                                struct: {type: "int"}
                            },
                            {
                                name: "name",
                                list: {
                                    label: "Name",
                                    isAlwaysVisible: false,
                                    isDefaultVisible: true,
                                    isSortable: true,
                                    isDefaultFilter: false,
                                    isFilter: false
                                },
                                struct: {type: "text"}
                            }
                        ]
                    }
                }
            };
        });

        afterEach(function () {
            window.localStorage.clear();
        });


        describe('storeEntities()', function () {
            it('should throw when no entities defined', function () {
                var no_entities_configObject = {};
                expect(sut.storeEntities.bind(sut, no_entities_configObject)).toThrow();
            });
            it('should store entities when defined', function () {
                var config_with_entities = {
                    entities: "ok!"
                };
                sut.storeEntities(config_with_entities);
                expect(storage.retrieve(EntityService.STORAGE_KEY)).toBe("ok!")
            });
        });


        describe('getEntityByName()', function () {
            it("shoud throw when no entityName is specified", function () {
                expect(sut.getEntityByName).toThrow();
            });
            it('should retrieve the correct entity', function () {
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


        describe('getEntityColumns()', function () {
            it('should retrieve the columns', function () {
                sut.storeEntities(config_stub);
                var columns = sut.getEntityColumns("account");
                expect(columns.length).toBe(2);
            });

            it("shoud throw when no entityName is specified", function () {
                expect(sut.getEntityColumns).toThrow();
            });

            describe("column type", function () {
                function assignTypeAndReturnColumns(type) {
                    config_stub.entities.account.fields[0].struct.type = type;
                    sut.storeEntities(config_stub);
                    return sut.getEntityColumns("account");
                }

                it('should default to ' + EntityService.COLUMN_TYPE_TEXT + ' when the type is unknown', function () {
                    var columns = assignTypeAndReturnColumns("unknownType");
                    expect(columns[0].type).toBe(EntityService.COLUMN_TYPE_TEXT);
                });
                it('should be ' + EntityService.COLUMN_TYPE_TEXT + ' when string is provided', function () {
                    var columns = assignTypeAndReturnColumns("string");
                    expect(columns[0].type).toBe(EntityService.COLUMN_TYPE_TEXT);
                });
                it("should be " + EntityService.COLUMN_TYPE_INT + " when int is provided", function () {
                    var columns = assignTypeAndReturnColumns("int");
                    expect(columns[0].type).toBe(EntityService.COLUMN_TYPE_INT);
                });
                it("should be " + EntityService.COLUMN_TYPE_DATE + " when date is provided", function () {
                    var columns = assignTypeAndReturnColumns("date");
                    expect(columns[0].type).toBe(EntityService.COLUMN_TYPE_DATE);
                });

            });

            it('should retrieve the correct basic entity columns', function () {
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

            it('should set a default title when no label provided', function () {
                delete config_stub.entities.account.fields[0].list.label;
                sut.storeEntities(config_stub);
                var cols = sut.getEntityColumns("account");
                expect(cols[0].title).toBe(EntityService.COLUMN_DEFAULT_LABEL);
            });

            describe("column.visible", function () {
                function setupVisibilityAndStore(alwaysVisible, defaultVisible) {
                    config_stub.entities.account.fields[0].list.isAlwaysVisible = alwaysVisible;
                    config_stub.entities.account.fields[0].list.isDefaultVisible = defaultVisible;
                    sut.storeEntities(config_stub);
                    return sut.getEntityColumns("account");
                }

                it('should always be true when isAlwaysVisible', function () {
                    var cols = setupVisibilityAndStore(true, false);
                    expect(cols[0].visible).toBe(true);
                });

                it('should be true when isDefaultVisible', function () {
                    var cols = setupVisibilityAndStore(false, true);
                    expect(cols[0].visible).toBe(true);
                });

                it('should be false when !isDefaultVisible', function () {
                    var cols = setupVisibilityAndStore(false, false);
                    expect(cols[0].visible).toBe(false);
                });

            });

            it('should resolve isAlwaysVisible() to the same value as the original field.isAlwaysVisible', function () {
                config_stub.entities.account.fields[0].list.isAlwaysVisible = true;
                sut.storeEntities(config_stub);
                var cols = sut.getEntityColumns("account");
                expect(cols[0].isAlwaysVisible()).toBe(true);
            });

            describe('sortable', function () {
                it('should be true when isSortable is true', function () {
                    config_stub.entities.account.fields[0].list.isSortable = true;
                    sut.storeEntities(config_stub);
                    var cols = sut.getEntityColumns("account");
                    expect(cols[0].sortable).toBe(true);
                });

                it('should have the default value when isSortable is not set', function () {
                    delete config_stub.entities.account.fields[0].list.isSortable;
                    sut.storeEntities(config_stub);
                    var cols = sut.getEntityColumns("account");
                    expect(cols[0].sortable).toBe(EntityService.COLUMN_DEFAULT_SORTABLE);
                });
            });

        });// END getEntityColumns

        describe("getEntityFilters", function () {

            it('should be defined', function () {
                expect(sut.getEntityFilters).toBeDefined();
            });

            it('throw when no entityName is provided', function () {
                expect(sut.getEntityFilters).toThrow();
            });

            it('should retrieve a collection of only filters', function () {
                sut.storeEntities(config_stub);
                var filters = sut.getEntityFilters("account");
                expect(filters.length).toBe(1);
            });

            it('should parse the correct filter', function () {
                sut.storeEntities(config_stub);
                var filters = sut.getEntityFilters("account");

                var entity_field_0 = config_stub.entities.account.fields[0];
                var filter_0 = filters[0];
                expect(filter_0.name).toBe(entity_field_0.name);
                expect(filter_0.title).toBe(entity_field_0.list.label);
                expect(filter_0.type).toBe(entity_field_0.struct.type);
                expect(filter_0.visible).toBe(entity_field_0.list.isDefaultVisible);
            });
        })
    });

});