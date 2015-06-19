define([], function(){
    function CustomLiteralsEditCreatePresenter($window) {
        this.$window = $window;
    }

    var proto = CustomLiteralsEditCreatePresenter.prototype;
    
    
    proto.show = function (view, model) {
        view.event.isNew = model.isNew.bind(model);

        view.event.getImplementationList = function () {
            model.getImplementationList().then(
                view.onGetImplementationList.bind(view),
                view.showError.bind(view)
            );
        };

        view.event.getLiteralById = function (id) {
            model.getLiteralById(id).then(
                view.onGetLiteralByIdSuccess.bind(view),
                view.showError.bind(view)
            );
        };

        view.event.updateLiteral = function(literal){
            model.changeLiteralDetails(literal).then(
                function(){ view._goBack(); },
                function(err){ view.showError(err); }
            );
        };

        view.event.createLiteral = function(literal){
            model.createLiteral(literal).then(
                view.onSaveSuccess.bind(view),
                view.showError.bind(view)
            );
        };
    };


    CustomLiteralsEditCreatePresenter.newInstance = function ($window) {
        $window = $window || document.window;
        return new CustomLiteralsEditCreatePresenter($window);
    };

    return {newInstance: CustomLiteralsEditCreatePresenter.newInstance};
});

