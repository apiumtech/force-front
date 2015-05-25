define([
    'modules/literal/LiteralListView'
], function (LiteralListView) {
    'use strict';

    describe('LiteralListView', function () {

        function exerciseCreateView(scope, model, presenter) {
            var compileFake = function () {
                return function () {};
            };
            return LiteralListView.newInstance({
                    scope:scope, model:model, presenter:presenter, compiler:compileFake,
                    viewRepAspect:false, logErrorAspect:false
            });
        }

        it('should configureEvents on instantiation', function () {
            var view = exerciseCreateView();
            expect(view.fn.deleteLiteralPrompt).toBeDefined();
        });

        it('should ask for confirmation on deleteLiteral', function () {
            var view = exerciseCreateView();
            spyOn(window, 'confirm');
            var literalId = 1;
            view.deleteLiteralPrompt(literalId);
            expect(window.confirm).toHaveBeenCalled();
        });

        it('should createColumns onGetLanguageList', function () {
            var view = exerciseCreateView();
            expect(view.data.tableColumns).toBe(null);
            view.onGetLanguageList([]);
            expect(view.data.tableColumns).not.toBe(null);
        });

        it('should getLiteralList on onGetLanguageList', function () {
            var view = exerciseCreateView();
            spyOn(view.event, "getLiteralList");
            view.onGetLanguageList([]);
            expect(view.event.getLiteralList).toHaveBeenCalled();
        });

        it('should create columns on createColumns', function () {
            var view = exerciseCreateView();
            view.createColumns([{Name: "es-es"}]);
            expect(view.data.tableColumns.length).toBe(2);
            expect(view.data.tableColumns[0].title).toBe("Key");
            expect(view.data.tableColumns[1].title).toBe("es-es");
        });

        it('should create dataTable on showTableData', function () {
            var view = exerciseCreateView();
            spyOn(view.dataTableService, "createDatatable");
            expect(view.data.table).toBe(null);

            view.showTableData([{
                LanguageValues: [{Key: "es-es", Value: "the value"}],
                Id: "1",
                Key: "the_key"
            }]);

            expect(view.data.table).not.toBe(null);
            expect(view.dataTableService.createDatatable).toHaveBeenCalled();
        });

        it('should render key Column on renderKeyColumn', function () {
            var view = exerciseCreateView();
            spyOn(view.templateParser, "parseTemplate");
            var html = "<div class='literalKeyColumnTemplate'></div>";
            $("body").append(html);
            var col = view.renderKeyColumn();
            expect(view.templateParser.parseTemplate).toHaveBeenCalled();
        });

    });
});
