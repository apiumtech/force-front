/**
 * Created by joanllenas on 3/31/15.
 */

describe("ContactView", function () {
    var ContactView = app.getView('views/contact/ContactView');

    function exerciseCreateView(scope, model, presenter, mapService, dataTableService) {
        scope = scope || {};
        return ContactView.newInstance(scope, model, presenter, mapService, dataTableService, false, false).getOrElse(throwInstantiateException(ContactView));
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

    it('should initialize Map on initializeMap()', function () {
        var view = exerciseCreateView();
        spyOn(view.mapService, "bindClickEvent");
        view.initializeMap();
        expect(view.data.map).not.toBe(null);
        expect(view.data.latlngbounds).not.toBe(null);
        expect(view.mapService.bindClickEvent).toHaveBeenCalled();
    });

    it('should toggle map visibility on toggleShowMap()', function () {
        var view = exerciseCreateView();
        var currentState = view.data.mapCanvasCollapsed;
        view.toggleShowMap();
        expect(view.data.mapCanvasCollapsed).toBe(!currentState);
    });

    it('should resolve column visibility', function () {
        var view = exerciseCreateView();
        var column = {
            isVisible: true
        };
        expect(view.isColumnVisible(column)).toBe(true);
    });

    it('should set contacts data on onLoadContactsComplete()', function () {
        var view = exerciseCreateView();
        spyOn(view, "renderTable");
        var contacts = [1,2,3,4,5];
        view.onLoadContactsComplete(contacts);
        expect(view.data.contacts).toBe(contacts);
    });

    it('should set tableColumns on onLoadContactColumnsComplete()', function () {
        var view = exerciseCreateView();
        spyOn(view, "renderTable");
        var columns = [1,2,3,4,5];
        view.onLoadContactColumnsComplete(columns);
        expect(view.data.tableColumns).toBe(columns);
    });

    it('should construct the DataTable only when columns and contacts are set', function () {
        var view = exerciseCreateView();
        spyOn(view.dataTableService, "createDatatable");

        view.renderTable();
        expect(view.dataTableService.createDatatable).not.toHaveBeenCalled();

        var contacts = [1,2,3,4,5];
        view.data.contacts = contacts;
        view.renderTable();
        expect(view.dataTableService.createDatatable).not.toHaveBeenCalled();

        var columns = [6,7,8,9,10];
        view.data.tableColumns = columns;
        view.renderTable();
        expect(view.dataTableService.createDatatable).toHaveBeenCalled();
    });
});