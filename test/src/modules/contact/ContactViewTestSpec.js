/**
 * Created by joanllenas on 3/31/15.
 */
define([
    'modules/contact/ContactView'
], function (ContactView) {
    'use strict';

    describe("ContactView", function () {
        function exerciseCreateView(scope, model, presenter, dataTableService) {
            scope = scope || {};
            return ContactView.newInstance(scope, model, presenter, dataTableService, false, false);
        }

        it("should call presenter's show method on show()", function () {
            var view = exerciseCreateView();
            spyOn(view.presenter, 'show');
            view.show();
            expect(view.presenter.show).toHaveBeenCalledWith(view, view.model);
        });

        it('should configureEvents on instantiation', function () {
            spyOn(ContactView.prototype, 'configureEvents');
            var view = exerciseCreateView();
            expect(view.configureEvents).toHaveBeenCalled();
        });

        it('should loadContactColumns and loadContats on initializeMap()', function () {
            var view = exerciseCreateView();
            spyOn(view.event, 'loadContactColumns');
            spyOn(view.event, 'loadContacts');
            view.initializeTable();
            expect(view.event.loadContactColumns).toHaveBeenCalled();
            expect(view.event.loadContacts).toHaveBeenCalled();
        });

        it('should resolve column visibility', function () {
            var view = exerciseCreateView();
            var column = {
                visible: true
            };
            expect(view.isColumnVisible(column)).toBe(true);
        });

        it('should resolve isColumnToggleable', function () {
            var view = exerciseCreateView();
            var column = {
                isAlwaysVisible: function () {
                    return true;
                }
            };
            expect(view.isColumnToggleable(column)).toBe(false);
        });

        it('should set contacts data on onLoadContactsComplete()', function () {
            var view = exerciseCreateView();
            spyOn(view, "renderTable");
            var contacts = [1, 2, 3, 4, 5];
            view.onLoadContactsComplete(contacts);
            expect(view.data.contacts).toBe(contacts);
        });

        it('should set tableColumns on onLoadContactColumnsComplete()', function () {
            var view = exerciseCreateView();
            spyOn(view, "renderTable");
            var columns = [1, 2, 3, 4, 5];
            view.onLoadContactColumnsComplete(columns);
            expect(view.data.tableColumns).toBe(columns);
        });

        it('should construct the DataTable only when columns and contacts are set', function () {
            var view = exerciseCreateView();
            spyOn(view.dataTableService, "createDatatable");

            view.renderTable();
            expect(view.dataTableService.createDatatable).not.toHaveBeenCalled();

            var contacts = [1, 2, 3, 4, 5];
            view.data.contacts = contacts;
            view.renderTable();
            expect(view.dataTableService.createDatatable).not.toHaveBeenCalled();

            var columns = [6, 7, 8, 9, 10];
            view.data.tableColumns = columns;
            view.renderTable();
            expect(view.dataTableService.createDatatable).toHaveBeenCalled();
        });

        it('should set an error message onLoadContactsError', function () {
            var view = exerciseCreateView();
            view.onLoadContactsError("an error");
            expect(view.data.currentError).toBe("an error");
        });

        it('should toggle column on onToggleColumn()', function () {
            var view = exerciseCreateView();

            view.data.tableColumns = [
                {visible: true},
                {visible: false},
                {visible: true}
            ];

            var internalColumns = view.data.tableColumns.slice();
            view.data.table = {
                internalColumns: internalColumns,
                column: function (i) {
                    return {
                        visible: function (value) {
                            internalColumns[i].visible = value;
                        }
                    };
                }
            };

            expect(view.data.tableColumns[1].visible).toBe(false);
            expect(internalColumns[1].visible).toBe(false);

            view.onToggleColumn(view.data.tableColumns[1]);

            expect(view.data.tableColumns[1].visible).toBe(true);
            expect(internalColumns[1].visible).toBe(true);
        });
    });
});
