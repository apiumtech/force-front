/**
 * Created by kevin on 10/22/14.
 */

app.registerPresenter(function (container) {

    /**
     * @constructor
     */
    function LiteralPresenter($window) {
        this.$window = $window;
    }


    /**
     * show()
     */
    LiteralPresenter.prototype.show = function (view, model) {
        this.view = view;
        this.model = model;
    };


    /**
     * onSave()
     */
    LiteralPresenter.prototype.updateLiteral = function(literal){
        var view = this.view;
        this.model.changeLiteralDetails(literal).then(
            view.goBack.bind(view),
            view.showError.bind(view)
        );
    };


    /**
     * getLiteralById()
     */
    LiteralPresenter.prototype.getLiteralById = function (id) {
        var view = this.view;
        this.model.getLiteralById( id ).then(
            view.showForm.bind(view),
            view.showError.bind(view)
        );
    };


    /**
     * newInstance()
     */
    LiteralPresenter.newInstance = function ($window) {
        $window = $window || window;
        return Some(new LiteralPresenter($window));
    };

    return {newInstance: LiteralPresenter.newInstance};
});

