define([], function(){
    function LiteralsEditCreatePresenter($window) {
        this.$window = $window;
    }

    var proto = LiteralsEditCreatePresenter.prototype;
    
    
    proto.show = function (view, model) {
        view.event.isNew = model.isNew.bind(model);

        view.event.getLiteralTypeList = function () {
            model.getLiteralTypeList().then(
                view.onGetLiteralTypeList.bind(view),
                view.showError.bind(view)
            );
        };

        view.event.getPlatformList = function () {
            model.getPlatformList().then(
                view.onGetPlatformListSuccess.bind(view),
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
                function(){ view.onSaveSuccess(); },
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


    LiteralsEditCreatePresenter.newInstance = function ($window) {
        $window = $window || document.window;
        return new LiteralsEditCreatePresenter($window);
    };

    return {newInstance: LiteralsEditCreatePresenter.newInstance};
});

