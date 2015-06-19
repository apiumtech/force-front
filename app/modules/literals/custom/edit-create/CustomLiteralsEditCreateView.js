define([
    'modules/literals/shared/edit-create/BaseLiteralsEditCreateView',
    'modules/literals/custom/edit-create/CustomLiteralsEditCreatePresenter',
    'modules/literals/custom/edit-create/CustomLiteralsEditCreateModel',
    'underscore'
], function (BaseLiteralsEditCreateView, CustomLiteralsEditCreatePresenter, CustomLiteralsEditCreateModel, _) {
    
    function CustomLiteralsEditCreateView($scope, $model, $presenter, $routeParams, $window) {
        BaseLiteralsEditCreateView.call(this, $scope, $model, $presenter, $routeParams, $window);
    }

    CustomLiteralsEditCreateView.inherits(BaseLiteralsEditCreateView, {});
    var proto = CustomLiteralsEditCreateView.prototype;




    proto.configureProperties = function () {
        this.data.implementationList = [];
        this.data.selectedImplementation = null;
    };

    proto.configureEvents = function () {
        this.__base__.configureEvents.call(this);

        this.event.getImplementationList = function () {};
    };




    proto.onInit = function () {
        this.data.isLoading = true;
        this.event.getImplementationList();
    };

    // TODO: not used, get rid of it
    proto.onGetImplementationList = function (res) {
        this.data.implementationList = res.data;
        this.event.getLiteralById(this.routeParams.literalId);
    };

    proto.onGetLiteralByIdSuccess = function(literal) {
        this.data.isLoading = false;
        this.showForm(literal);
    };

    proto.onSave = function () {
        this.data.isLoading = true;
        if (this.isNew()) {
            this.event.createLiteral(this.data.literal);
        } else {
            this.event.updateLiteral(this.data.literal);
        }
    };




    proto.showForm = function (literal) {
        this.data.literal = literal;
    };

    proto.showError = function (err) {
        var errorMessage = this.translator.translate("CustomLiteral.Detail.Form.SaveErrorMessage");
        this.__base__.showError.call(this, errorMessage);
    };

    proto.onSaveSuccess = function () {
        var successMessage = this.translator.translate("CustomLiteral.Detail.Form.SaveSuccessMessage");
        this.__base__.onSaveSuccess.call(this, successMessage);
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
