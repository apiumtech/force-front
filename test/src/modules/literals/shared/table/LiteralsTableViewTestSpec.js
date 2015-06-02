define([
    'modules/literals/shared/table/LiteralsTableView'
], function (LiteralsTableView) {
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


        xdescribe('onLiteralsRequestSuccess', function () {
            var sut;
            beforeEach(function () {
                sut = exerciseCreateView();
                sut.languages = [
                    {data: "es-es"},
                    {data: "en-us"},
                    {data: "ca-es"},
                    {data: "pt-pt"}
                ];

                $("<div id='data-table'></div>").appendTo('body');
                sut.table = sut.dataTableService.createDatatable("#data-table", {});
            });
            it('should add literals', function () {
                var data = [
                    {
                        Id: "id1",
                        Key: "key1",
                        LanguageValues: [
                            {Value: "es1"},
                            {Value: "enus1"},
                            {Value: "caes1"},
                            {Value: "pt1"}
                        ]
                    },
                    {
                        Id: "id2",
                        Key: "key2",
                        LanguageValues: [
                            {Value: "es2"},
                            {Value: "enus2"},
                            {Value: "caes2"},
                            {Value: "pt2"}
                        ]
                    }
                ];

                spyOn(sut.table.rows, "add");
                sut.onLiteralsRequestSuccess({data: data});

                expect(sut.table.rows.add).toHaveBeenCalled();
                var add_args = sut.table.rows.add.calls.mostRecent().args;
                expect(add_args[0].Id).toBe("id1");
                expect(add_args[1].Key).toBe("key2");
                expect(add_args[1].LanguageValues[3]).toBe({Value:"pt2"});
            });
            /*it('should fill the language gaps when there are less values than languages', function () {
                var data = [
                    {
                        Id: "id1",
                        Key: "key1",
                        LanguageValues: [
                            {Value: "es1"},
                            {Value: "enus1"}
                        ]
                    }
                ];

                spyOn(sut.table.rows, "add");
                sut.onLiteralsRequestSuccess({data: data});

                var add_args = sut.table.rows.add.calls.mostRecent().args;
                expect(add_args[0].LanguageValues[3]).toBe({Value:"pt2"});
            });*/
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