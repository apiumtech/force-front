define([
    'shared/BaseView',
    'shared/services/TranslatorService',
    'shared/services/notification/ToastService'
], function (BaseView, TranslatorService, ToastService) {

    function BaseLiteralsEditCreateView($scope, $model, $presenter, $routeParams, $window) {
        BaseView.call(this, $scope, $model, $presenter);
        this.$window = $window;
        this.routeParams = $routeParams;
        this.translator = TranslatorService.newInstance();
        this.toastService = ToastService.getInstance();

        this.data.isLoading = false;
        this.data.currentError = null;
        this.data.literal = null;

        this.configureProperties();
        this.configureEvents();
    }

    BaseLiteralsEditCreateView.inherits(BaseView, {});
    var proto = BaseLiteralsEditCreateView.prototype;




    proto.configureProperties = function () {
        throw new Error("Abstract method not implemented");
    };

    proto.configureEvents = function () {
        this.fn.onInit = this.onInit.bind(this);
        this.fn.onCancel = this.onCancel.bind(this);
        this.fn.onSave = this.onSave.bind(this);
        this.fn.isNew = this.isNew.bind(this);
        this.fn.isValid = this.isValid.bind(this);

        this.event.isNew = function () {};
        this.event.getLiteralById = function () {};
        this.event.createLiteral = function () {};
        this.event.updateLiteral = function () {};
    };

    proto.onCancel = function () {
        this._goBack();
    };

    proto.isValid = function (formName) {
        var isValid = this.$scope.$validation.checkValid(formName);
        return isValid;
    };

    proto._goBack = function () {
        this.$window.history.go(-1);
    };

    proto.isNew = function () {
        return this.event.isNew(this.data.literal);
    };

    proto.showError = function (errorMessage) {
        this.data.isLoading = false;
        this.data.currentError = errorMessage;
        this.toastService.error(errorMessage);
    };

    proto.onSaveSuccess = function (successMessage) {
        this.data.isLoading = false;
        this.toastService.success( successMessage );
        this._goBack();
    };




    proto.onInit = function () {
        this.data.isLoading = true;
        throw new Error("Abstract method not implemented");
    };

    proto.getLiteralById = function () {
        this.data.isLoading = true;
        throw new Error("Abstract method not implemented");
    };

    proto.onGetLiteralByIdSuccess = function(literal) {
        this.data.isLoading = false;
        throw new Error("Abstract method not implemented");
    };

    proto.onSave = function () {
        this.data.isLoading = true;
        throw new Error("Abstract method not implemented");
    };



    return BaseLiteralsEditCreateView;
});
