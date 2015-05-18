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

    var proto = LiteralView.prototype = Object.create(BaseView.prototype, {});


    proto.configureEvents = function () {
        this.fn.onInit = this._onInit.bind(this);
        this.fn.onCancel = this._onCancel.bind(this);
        this.fn.onSave = this._onSave.bind(this);
        this.fn.isNew = this.isNew.bind(this);
    };

    proto._onInit = function () {
        this.presenter.getLiteralTypeList();
    };

    proto.onGetLiteralTypeList = function(data){
        this.data.literalTypeList = data;
        this.presenter.getLiteralById(this.routeParams.literalId);
    };

    proto._onCancel = function () { this._goBack(); };

    proto._goBack = function () {
        this.$window.history.back();
    };

    proto.isNew = function () { return this.event.isNew(this.data.literal); };

    proto.showForm = function (literal) { this.data.literal = literal; };

    proto.showError = function (err) {
        this.data.currentError = err;
    };

    proto._onSave = function () {
        if( this.isNew() ){
            this.presenter.createLiteral(this.data.literal);
        } else {
            this.presenter.updateLiteral(this.data.literal);
        }
    };


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
