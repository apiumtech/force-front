define([
    'shared/BaseView',
    'modules/literals/custom/edit-create/CustomLiteralsEditCreatePresenter',
    'modules/literals/custom/edit-create/CustomLiteralsEditCreateModel',
    'underscore'
], function (BaseView, CustomLiteralsEditCreatePresenter, CustomLiteralsEditCreateModel, _) {
    
    function CustomLiteralsEditCreateView($scope, $model, $presenter, $routeParams, $window) {
        BaseView.call(this, $scope, $model, $presenter);
        this.$window = $window;
        this.routeParams = $routeParams;

        this.data.currentError = null;
        this.data.literal = null;
        this.data.isLoading = false;

        // implementation code
        this.data.implementationList = [];
        this.data.selectedImplementation = null;

        this.configureEvents();
    }

    CustomLiteralsEditCreateView.inherits(BaseView, {});
    var proto = CustomLiteralsEditCreateView.prototype;


    proto.configureEvents = function () {
        this.fn.onInit = this._onInit.bind(this);
        this.fn.onCancel = this._onCancel.bind(this);
        this.fn.onSave = this._onSave.bind(this);
        this.fn.isNew = this.isNew.bind(this);


        this.event.isNew = function () {};
        this.event.getImplementationList = function () {};
        this.event.getLiteralById = function () {};
        this.event.createLiteral = function () {};
        this.event.updateLiteral = function () {};
    };


    proto._onInit = function () {
        this.event.getImplementationList();
    };


    proto.onGetImplementationList = function (res) {
        this.data.implementationList = res.data;
        this.event.getLiteralById(this.routeParams.literalId);
    };


    proto._onCancel = function () {
        this._goBack();
    };

    proto._goBack = function () {
        this.$window.history.go(-1);
    };

    proto.isNew = function () {
        return this.event.isNew(this.data.literal);
    };

    proto.showForm = function (literal) {
        this.data.literal = literal;
    };

    proto.showError = function (err) {
        this.data.isLoading = false;
        this.data.currentError = err;
        var errorMessage = this.translator.translate("Literal.Detail.Form.SaveErrorMessage");
        this.toastService.error(errorMessage);
    };

    proto._onSave = function () {
        if (this.isNew()) {
            this.event.createLiteral(this.data.literal);
        } else {
            this.event.updateLiteral(this.data.literal);
        }
    };


    CustomLiteralsEditCreateView.newInstance = function (namedParams) {
        var scope = namedParams.scope || {};
        var model = namedParams.model || CustomLiteralsEditCreateModel.newInstance();
        var presenter = namedParams.presenter || CustomLiteralsEditCreatePresenter.newInstance();
        var $window = namedParams.window || window;
        var routeParams = namedParams.routeParams;

        var view = new CustomLiteralsEditCreateView(scope, model, presenter, routeParams, $window);

        return view._injectAspects(namedParams.viewRepAspect, namedParams.logErrorAspect);
    };

    return {newInstance: CustomLiteralsEditCreateView.newInstance};
});
