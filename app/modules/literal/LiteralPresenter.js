
define([], function(){


    function LiteralPresenter($window) {
        this.$window = $window;
    }

    var proto = LiteralPresenter.prototype;
    
    
    proto.show = function (view, model) {
        view.event.isNew = model.isNew.bind(model);

        view.event.getLiteralTypeList = function () {
            model.getLiteralTypeList().then(
                view.onGetLiteralTypeList.bind(view),
                view.showError.bind(view)
            );
        };

        view.event.getDeviceTypeList = function () {
            model.getDeviceTypeList().then(
                view.onGetDeviceTypeList.bind(view),
                view.showError.bind(view)
            );
        };

        view.event.getLiteralById = function (id) {
            model.getLiteralById(id).then(
                view.showForm.bind(view),
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
                view._goBack.bind(view),
                view.showError.bind(view)
            );
        };
    };


    LiteralPresenter.newInstance = function ($window) {
        $window = $window || document.window;
        return new LiteralPresenter($window);
    };

    return {newInstance: LiteralPresenter.newInstance};
});

