define([
    'modules/literals/shared/table/LiteralsTableView',
    'jquery'
], function (LiteralsTableView, $) {
    'use strict';

    function exerciseCreateView(namedParams) {
        namedParams = namedParams || {};
        return LiteralsTableView.newInstance({
            scope: namedParams.scope || mockAngularScope(),
            presenter: namedParams.presenter,
            compile: namedParams.compile,
            dataTableService: namedParams.dataTableService,
            viewRepAspect: false, logErrorAspect: false
        });
    }

    describe('LiteralsTableView', function () {

        describe('configureEvents', function () {
            it('should be called on instantiation', function () {
                spyOn(LiteralsTableView.prototype, 'configureEvents').and.callThrough();
                var sut = exerciseCreateView();
                expect(sut.configureEvents).toHaveBeenCalled();
            });
        });

        describe('onColumnsRequestSuccess', function () {
            it('should fireLiteralsRequest', function () {
                var sut = exerciseCreateView();
                spyOn(sut.event, "fireLiteralsRequest");
                sut.onColumnsRequestSuccess({data: []})
                expect(sut.event.fireLiteralsRequest).toHaveBeenCalled();
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
                var expected = {
                    key: "ColumnName",
                    label: "ColumnName",
                    type: "int",
                    visible: true,
                    sortable: false,
                    available: true,
                    width: '100px'
                };
                expect(sut._createColumnDeclaration("ColumnName", "int")).toEqual(expected);
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
                    {key: 'es-es'},
                    {key: 'en-us'}
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

        xdescribe('deleteLiteralPrompt', function () {
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
                sut.disposer = jasmine.createSpy();
            });
            it("should call event's onDisposing", function () {
                spyOn(sut.event, 'onDisposing');
                sut.onDisposing();
                expect(sut.event.onDisposing).toHaveBeenCalled();
            });
            it("should call scope $on.destroy disposer", function () {
                sut.onDisposing();
                expect(sut.disposer).toHaveBeenCalled();
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

        describe("clearTable", function(){
            it("call clear table", function () {
                var sut = exerciseCreateView();
                sut.data.rows.push("hola");
                sut.clearTable();
                expect(sut.data.rows.length).toBe(0);
            });
        });
        

        describe("_createLanguageColumns", function () {
            it("should resolve html template", function () {
                var sut = exerciseCreateView();
                var data = [{Name:"lang 1"}, {Name:"lang 2"}];
                sut._createLanguageColumns(data);
                expect(sut.languageColumns.length).toBe(2);
            });
        });


        describe('addTooltipsToEllipsisHandler', function () {
            it("should set title attribute when text overflows container", function () {
                var el = $("<div>some text</div>");
                el.offsetWidth = 10;
                el.scrollWidth = 100;
                var sut = exerciseCreateView();
                sut.addTooltipsToEllipsisHandler.call(el);
                expect(el.attr('title')).toBe("some text");
            });
            it("should not set title attribute when text doesn't overflow container", function () {
                var el = $("<div>some text</div>");
                el.offsetWidth = 100;
                el.scrollWidth = 10;
                var sut = exerciseCreateView();
                sut.addTooltipsToEllipsisHandler.call(el);
                expect(el.attr('title')).not.toBe("some text");
            });
        });


    });
});