describe('LiteralListView', function(){
    var LiteralListView = app.getView('views/literal/LiteralListView');

    function exerciseCreateView(scope){
        return LiteralListView.newInstance(scope);
    }

    it('should configureEvents on instantiation', function(){
        var view = exerciseCreateView({});
        expect(view.fn.deleteLiteralPrompt).toBeDefined();
    });


});