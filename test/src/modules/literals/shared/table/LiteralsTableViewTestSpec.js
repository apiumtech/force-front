define([
    'modules/literals/shared/table/LiteralsTableView',
    'jquery'
], function (LiteralsTableView, $) {
    'use strict';

    function exerciseCreateView(namedParams) {
        namedParams = namedParams || {};
        return LiteralsTableView.newInstance({
            scope: namedParams.scope || {$on:function(){}},
            presenter: namedParams.presenter,
            compile: namedParams.compile,
            dataTableService: namedParams.dataTableService,
            viewRepAspect: false, logErrorAspect: false
        });
    }

    function mockRowsObject(){
        return {
            add: jasmine.createSpy().and.returnValue({
                draw:function(){}
            })
        };
    }

    function mockColumnObject(){
        return function(){
            return {
                visible: function(){}
            }
        };
    }

    describe('LiteralsTableView', function () {

        describe('configureEvents', function () {
            it('should be called on instantiation', function () {
                spyOn(LiteralsTableView.prototype, 'configureEvents').and.callThrough();
                var sut = exerciseCreateView();
                expect(sut.configureEvents).toHaveBeenCalled();
            });
        });

        describe('renderKeyColumn', function () {
            it('should render key Column', function () {
                var view = exerciseCreateView();
                spyOn(view.templateParser, "parseTemplate");
                var row = {row:"a row"};
                var col = view.renderKeyColumn(null, null, row);
                expect(view.templateParser.parseTemplate).toHaveBeenCalled();
                expect(view.templateParser.parseTemplate.calls.argsFor(0)[1]).toBe(row);
            });
        });

        describe('onColumnsRequestSuccess', function () {
            it('should fireLiteralsRequest', function () {
                var sut = exerciseCreateView();
                spyOn(sut.dataTableService, "createDatatable");
                spyOn(sut.event, "fireLiteralsRequest");
                sut.onColumnsRequestSuccess({data: []})
                expect(sut.event.fireLiteralsRequest).toHaveBeenCalled();
            });
            it("should call dataTableService's createDatatable", function () {
                var sut = exerciseCreateView();
                spyOn(sut.dataTableService, "createDatatable");
                sut.onColumnsRequestSuccess({data: []})
                expect(sut.dataTableService.createDatatable).toHaveBeenCalled();
            });
        });

        describe('onColumnsRequestError', function () {
            it('should call showError', function () {
                var sut = exerciseCreateView();
                spyOn(sut, "showError");
                sut.onColumnsRequestError("some error");
                expect(sut.showError).toHaveBeenCalled();
            });
        });


        describe('onLiteralsRequestSuccess', function () {
            var sut, data;
            beforeEach(function () {
                sut = exerciseCreateView();
                sut.languageColumns = [
                    {data: "es-es"},
                    {data: "en-us"},
                    {data: "ca-es"},
                    {data: "pt-pt"}
                ];
                data = [
                    {
                        Id: "id1", Key: "key1",
                        LanguageValues: {
                            "es-es": "es1",
                            "en-us": "enus1",
                            "ca-es": "caes1"
                        }
                    },
                    {
                        Id: "id2", Key: "key2",
                        LanguageValues: {
                            "es-es": "es2",
                            "en-us": "enus2",
                            "ca-es": "caes2",
                            "pt-pt": "pt2"
                        }
                    }
                ];
                sut.table = {
                    rows: mockRowsObject(),
                    column: mockColumnObject()
                };
            });
            it('should add literals', function () {
                sut.onLiteralsRequestSuccess({data: data});
                expect(sut.table.rows.add).toHaveBeenCalled();
                var add_args = sut.table.rows.add.calls.mostRecent().args[0];
                expect(add_args[0].Id).toBe("id1");
                expect(add_args[1].Key).toBe("key2");
                expect(add_args[0]["es-es"]).toBe("es1");
            });
            it('should fill the language gaps when there are less values than languages', function () {
                sut.onLiteralsRequestSuccess({data: data});
                expect(sut.table.rows.add).toHaveBeenCalled();
                var add_args = sut.table.rows.add.calls.mostRecent().args[0];
                expect(add_args[0]["pt-pt"]).toBeDefined();
                expect(add_args[0]["pt-pt"]).toBe("");
            });
        });

        describe('onLiteralsRequestError', function () {
            it('should call showError', function () {
                var sut = exerciseCreateView();
                spyOn(sut, "showError");
                sut.onLiteralsRequestError("some error");
                expect(sut.showError).toHaveBeenCalled();
            });
        });

        describe('isLoading', function () {
            it("should be false at startup", function () {
                var sut = exerciseCreateView();
                expect(sut.data.isLoading).toBe(false);
            });
            it("should be true onLiteralsRequest", function () {
                var sut = exerciseCreateView();
                sut.onLiteralsRequest();
                expect(sut.data.isLoading).toBe(true);
            });
            it("should be false after onLiteralsRequestSuccess", function () {
                var sut = exerciseCreateView();
                sut.data.isLoading = true;
                sut.table = {
                    rows: mockRowsObject(),
                    column: mockColumnObject()
                };
                sut.onLiteralsRequestSuccess({data:[]});
                expect(sut.data.isLoading).toBe(false);
            });
            it("should be false after onLiteralsRequestError", function () {
                var sut = exerciseCreateView();
                sut.data.isLoading = true;
                sut.onLiteralsRequestError("");
                expect(sut.data.isLoading).toBe(false);
            });
        });

        describe("createColumnDeclaration", function () {
            it("should create the correct column", function () {
                var sut = exerciseCreateView();
                expect(sut._createColumnDeclaration("ColumnName", "num")).toEqual({
                    data: "ColumnName",
                    title: "ColumnName",
                    type: "num",
                    visible: true,
                    sortable: true
                });
            });
        });

        describe("ImplementationCode column", function () {
            it('should be invisible by default', function () {
                var sut = exerciseCreateView();
                var col = sut._createImplementationColumn();
                expect(col.visible).toBe(false);
            });
            it('should be visible when "ImplementationCode" is provided', function () {
                var sut = exerciseCreateView();
                var data = [{$ref:{ImplementationCode:1}}];
                expect(sut._implementationCodeColumnVisibility(data)).toBe(true);
            });
        });

        describe("_createTableRow", function () {
            var rawCol, langCols;
            beforeEach(function () {
                rawCol = {
                    Id: "myId",
                    Key: "myKey",
                    ImplementationCode: 123,
                    LanguageValues: {'es-es':'espanyol', 'en-us':'inglishpitinglish'}
                };
                langCols = [
                    {data: 'es-es'},
                    {data: 'en-us'}
                ];
            });
            it('should create columns correctly', function () {
                var sut = exerciseCreateView();
                sut.languageColumns = langCols;
                var col = sut._createTableRow(rawCol);
                expect(col).toEqual({
                    "$ref": rawCol,
                    Id: "myId",
                    Key: "myKey",
                    ImplementationCode: 123,
                    "es-es": 'espanyol',
                    "en-us": 'inglishpitinglish'
                });
            });
            it('should add ImplementationCode value even if not provided', function () {
                var sut = exerciseCreateView();
                sut.languageColumns = langCols;
                delete rawCol.ImplementationCode;
                var col = sut._createTableRow(rawCol);
                expect(col.ImplementationCode).toBe(0);
            });
        });

        describe('deleteLiteralPrompt', function () {
            var sut;
            beforeEach(function () {
                sut = exerciseCreateView();
                sut.translator = {translate: function(){
                    return "the message";
                }};
            });
            it('should do nothing when not confirmed', function () {
                spyOn(window, "confirm").and.returnValue(false);
                spyOn(sut, "_doDeleteLiteralPrompt");
                sut.deleteLiteralPrompt(44);
                expect(sut._doDeleteLiteralPrompt).not.toHaveBeenCalled();
            });
            it('should call _doDeleteLiteralPrompt when confirmed', function () {
                spyOn(window, "confirm").and.returnValue(true);
                spyOn(sut, "_doDeleteLiteralPrompt");
                sut.deleteLiteralPrompt(44);
                expect(sut._doDeleteLiteralPrompt).toHaveBeenCalledWith(44);
            });

            describe('_doDeleteLiteralPrompt', function () {
                beforeEach(function () {
                    spyOn(sut, "clearTable");
                    spyOn(sut.event, "fireLiteralsDeleteRequest");
                });
                it('should clearTable', function () {
                    sut._doDeleteLiteralPrompt(33);
                    expect(sut.clearTable).toHaveBeenCalled();
                });
                it('should clearTable', function () {
                    sut._doDeleteLiteralPrompt(33);
                    expect(sut.event.fireLiteralsDeleteRequest).toHaveBeenCalledWith(33);
                });
            });

        });

        describe('onDisposing', function () {
            var sut;
            beforeEach(function () {
                sut = exerciseCreateView();
                sut.table = {
                    destroy: jasmine.createSpy()
                };
            });
            it('should destroy table', function () {
                sut.onDisposing();
                expect(sut.table.destroy).toHaveBeenCalled();
            });
            it("should call event's onDisposing", function () {
                spyOn(sut.event, 'onDisposing');
                sut.onDisposing();
                expect(sut.event.onDisposing).toHaveBeenCalled();
            });
        });


        describe('showError', function () {
            it('should show the error string when a string is provided', function () {
                var sut = exerciseCreateView();
                sut.showError("some error");
                expect(sut.data.currentError).toMatch(/some error/);
            });
            it('should show the stringified error object when an error object is provided', function () {
                var sut = exerciseCreateView();
                sut.showError({name:"Some Internal Error", code:"00.11.22.33"});
                expect(sut.data.currentError).toMatch(/Some Internal Error/);
                expect(sut.data.currentError).toMatch(/00\.11\.22\.33/);
            });
        });

    });
});