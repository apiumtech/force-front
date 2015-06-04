define([
    'modules/literals/shared/table/LiteralsTableView',
    'jquery'
], function (LiteralsTableView, $) {
    'use strict';

    function exerciseCreateView(namedParams) {
        namedParams = namedParams || {};
        return LiteralsTableView.newInstance({
            scope: namedParams.scope,
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
                expect(sut.event.onInit).toBeDefined();
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
            it('should set currentError', function () {
                var sut = exerciseCreateView();
                sut.onColumnsRequestError("some error");
                expect(sut.data.currentError).toBe("some error");
            });
        });


        describe('onLiteralsRequestSuccess', function () {
            var sut, data;
            beforeEach(function () {
                sut = exerciseCreateView();
                sut.languages = [
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
                sut.table = {rows: {
                    add: jasmine.createSpy().and.returnValue({
                        draw:function(){}
                    })
                }};
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
            it('should set currentError', function () {
                var sut = exerciseCreateView();
                sut.onLiteralsRequestError("some error");
                expect(sut.data.currentError).toBe("some error");
            });
        });

    });
});