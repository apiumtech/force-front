describe("ContactFilterView", function(){
    var ContactFilterView = app.getView('views/contact/ContactFilterView');

    function exerciseCreateView(scope, model, presenter){
        scope = scope || {$apply:function(){}};
        return ContactFilterView.newInstance(scope, model, presenter).getOrElse(throwInstantiateException(ContactFilterView));
    }

    it("should call presenter's show method on show()", function () {
        var view = exerciseCreateView(undefined, {}, {show: jasmine.createSpy()});
        view.show();
        expect(view.presenter.show).toHaveBeenCalledWith(view, view.model);
    });
});