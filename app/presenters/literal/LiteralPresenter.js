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
            view._goBack.bind(view),
            view.showError.bind(view)
        );
    };


    proto.createLiteral = function(literal){
        var view = this.view;
        thisreateLiterallDetails(literal).then(
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

