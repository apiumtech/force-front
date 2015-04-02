/**
 * Created by joanllenas on 3/31/15.
 */

describe("ContactView", function () {
    var ContactView = app.getView('views/contact/ContactView');

    function stubMapService(){
        return {
            getLatLngBounds: function(){},
            getLatLng: function(){},
            createMap: function(){},
            bindClickEvent: function(){}
        };
    }

    function stubPresenter(){
        return { show: function(){} };
    }

    function exerciseCreateView(scope, model, presenter, mapService, dataTableService, templateParser) {
        scope = scope || {};
        model = model || {};
        presenter = presenter || stubPresenter();
        mapService = mapService || stubMapService();
        dataTableService = dataTableService || {};
        templateParser = templateParser || {};
        return ContactView.newInstance(scope, model, presenter, mapService, dataTableService, templateParser, false, false).getOrElse(throwInstantiateException(ContactView));
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

    it('should initializeChart on fn.initializeChart()', function () {
        var view = exerciseCreateView();
        spyOn(view, 'initializeChart');
        view.fn.initializeChart();
        expect(view.initializeChart).toHaveBeenCalled();
    });

    it('should openCreateContactPage on createContactClicked', function () {
        var _scope = {fn: {}};
        var view = exerciseCreateView(_scope);
        view.configureEvents();
        spyOn(view, 'openCreateContactPage');
        view.fn.createContactClicked();
        expect(view.openCreateContactPage).toHaveBeenCalled();
    });

});