describe("ContactFilterView", function(){
    var ContactFilterView = app.getView('views/contact/ContactFilterView');

    function exerciseCreateView(scope, model, presenter){
        scope = scope || {$apply:function(){}};
        return ContactFilterView.newInstance(scope, model, presenter);
    }

    it("should call presenter's show method on show()", function () {
        var view = exerciseCreateView();
        spyOn(view.presenter, "show");
        view.show();
        expect(view.presenter.show).toHaveBeenCalledWith(view, view.model);
    });

    it("it should call presenter's loadContactFields on _onLoaded()", function(){
        var view = exerciseCreateView();
        spyOn(view.presenter, "loadContactFilters");
        view._onLoaded();
        expect(view.presenter.loadContactFilters).toHaveBeenCalled();
    });
});