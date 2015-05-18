/**
 * Created by joanllenas 5/14/15
 */

app.registerPresenter(function (container) {


    function LiteralPresenter($window) {
        this.$window = $window;
    }

    var proto = LiteralPresenter.prototype;
    
    
    proto.show = function (view, model) {
        this.view = view;
        this.model = model;

        view.event.isNew = model.isNew.bind(model);
    };


    proto.getLiteralTypeList = function () {
        var view = this.view;
        this.model.getLiteralTypeList().then(
            view.onGetLiteralTypeList.bind(view),
            view.showError.bind(view)
        );
    };


    proto.getLiteralById = function (id) {
        var view = this.view;
        this.model.getLiteralById( id ).then(
            view.showForm.bind(view),
            view.showError.bind(view)
        );
    };


    proto.updateLiteral = function(literal){
        var view = this.view;
        this.model.changeLiteralDetails(literal).then(
            function(){
                view._goBack();
            },
            function(err){
                view.showError(err);
            }
        );
    };


    proto.createLiteral = function(literal){
        var view = this.view;
        this.model.createLiteral(literal).then(
            view._goBack.bind(view),
            view.showError.bind(view)
        );
    };


    LiteralPresenter.newInstance = function ($window) {
        $window = $window || window;
        return Some(new LiteralPresenter($window));
    };

    return {newInstance: LiteralPresenter.newInstance};
});

