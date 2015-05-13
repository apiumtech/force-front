/**
 * Created by kevin on 10/22/14.
 */

app.registerView(function (container) {
    var BaseView = container.getView("views/BaseView");
    var LiteralPresenter = container.getPresenter('presenters/literal/LiteralPresenter');
    var LiteralModel = container.getModel('models/literal/LiteralModel');


    function LiteralView($routeParams, $scope, $model, $presenter, $window) {
        BaseView.call(this, $scope, $model, $presenter);

        this.$window = $window;
        this.routeParams = $routeParams;
        this.data.currentError = null;

        this.configureEvents();
    }


    /**
     * Extend BaseView
     */
    LiteralView.prototype = Object.create(BaseView.prototype, {});


    /**
     * configureEvents()
     */
    LiteralView.prototype.configureEvents = function () {
        this.fn.onInit = this.onInit.bind(this);
        this.fn.isNew = this.isNew.bind(this);
        this.fn.onCancel = this.onCancel.bind(this);
        this.fn.onSave = this.onSave.bind(this);
    };


    /**
     * onInit()
     */
    LiteralView.prototype.onInit = function () {
        this.presenter.getLiteralById(this.routeParams.literalId);
    };


    /**
     * onCancel()
     */
    LiteralView.prototype.onCancel = function () {
        this.goBack();
    };


    /**
     * goBack()
     */
    LiteralView.prototype.goBack = function () {
        this.$window.history.back();
    };


    /**
     * onSave()
     */
    LiteralView.prototype.onSave = function () {
        if( this.isNew() ){
            this.presenter.createLiteral(this.data.literal);
        } else {
            this.presenter.updateLiteral(this.data.literal);
        }
    };

    /**
     * showForm()
     */
    LiteralView.prototype.showForm = function (literal) {
        this.data.literal = literal;
    };


    /**
     * isNew()
     */
    LiteralView.prototype.isNew = function () {
        return !this.data.literal || this.data.literal.Id === null;
    };


    /**
     * showForm()
     */
    LiteralView.prototype.showError = function (err) {
        console.error(err);
        this.data.currentError = err;
    };


    /**
     * newInstance()
     */
    LiteralView.newInstance = function ($routeParams, $scope, $model, $presenter, $window, $viewRepAspect, $logErrorAspect) {
        var scope = $scope || {};
        var routeParams = $routeParams;
        var model = $model || LiteralModel.newInstance().getOrElse(throwInstantiateException(LiteralModel));
        var presenter = $presenter || LiteralPresenter.newInstance().getOrElse(throwInstantiateException(LiteralPresenter));
        $window = $window || window;

        var view = new LiteralView(routeParams, scope, model, presenter, $window);

        return view._injectAspects($viewRepAspect, $logErrorAspect);
    };

    return LiteralView;
});
