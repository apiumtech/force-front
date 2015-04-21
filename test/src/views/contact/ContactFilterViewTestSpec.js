describe("ContactFilterView", function(){
    var ContactFilterView = app.getView('views/contact/ContactFilterView');

    function exerciseCreateView(scope, model, presenter){
        scope = scope || {$apply:function(){}};
        return ContactFilterView.newInstance(scope, model, presenter).getOrElse(throwInstantiateException(ContactFilterView));
    }

    it("should call presenter's show method on show()", function () {
        var view = exerciseCreateView();
        spyOn(view.presenter, "show");
        view.show();
        expect(view.presenter.show).toHaveBeenCalledWith(view, view.model);
    });

    it("it should call presenter's loadContactFields on onLoad()", function(){
        var view = exerciseCreateView();
        spyOn(view.presenter, "loadContactFields");
        view.onLoaded();
        expect(view.presenter.loadContactFields).toHaveBeenCalled();
    });
});