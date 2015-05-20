describe('LiteralListPresenter', function() {
    var LiteralListPresenter = app.getView('presenters/literal/LiteralListPresenter');

    function exerciseCreatePresenter() {
        return LiteralListPresenter.newInstance().getOrElse(throwInstantiateException(LiteralListPresenter));
    }

    it('should reaload literals after successful onDelete liteal', function(){
        var presenter = exerciseCreatePresenter();
        var view = {event:{}, showError: function(){}};
        var model = { deleteLiteral: exerciseFakeOkPromise };
        presenter.show(view, model);
        spyOn(presenter, "getLiteralList");

        presenter.onDelete(1);

        expect(presenter.getLiteralList).toHaveBeenCalled();
    });
});