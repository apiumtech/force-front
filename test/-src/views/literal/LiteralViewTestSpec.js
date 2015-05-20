describe('LiteralView', function(){
    var LiteralView = app.getView('views/literal/LiteralView');

    function exerciseCreateView(scope){
        scope = scope || {};
        return LiteralView.newInstance(scope);
    }

    it('should configureEvents on instantiation', function(){
        var view = exerciseCreateView();
        expect(view.fn.onInit).toBeDefined();
    });

});