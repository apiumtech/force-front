define([
    'shared/BaseView',
    'modules/literals/global/edit-create/LiteralsEditCreatePresenter',
    'modules/literals/global/edit-create/LiteralsEditCreateModel',
    'shared/services/TranslatorService',
    'shared/services/notification/ToastService',
    'underscore'
], function (BaseView, LiteralsEditCreatePresenter, LiteralsEditCreateModel, TranslatorService, ToastService, _) {
    
    function LiteralsEditCreateView($scope, $model, $presenter, $routeParams, $window) {
        BaseView.call(this, $scope, $model, $presenter);
        this.$window = $window;
        this.routeParams = $routeParams;
        this.translator = TranslatorService.newInstance();
        this.toastService = ToastService.getInstance();

        this.data.isLoading = false;
        this.data.currentError = null;
        this.data.literal = null;

        // literal Type
        this.data.literalTypeList = null;
        this.data.selectedLiteralType = null;

        // device Type
        this.data.deviceTypeList = null;
        this.data.selectedDeviceTypes = [];
        this.data.deviceTypeListPrompt = this.translator.translate("Literal.Detail.Form.Select_Device_Type");

        this.configureEvents();
    }

    LiteralsEditCreateView.inherits(BaseView, {});
    var proto = LiteralsEditCreateView.prototype;


    proto.configureEvents = function () {
        this.fn.onInit = this.onInit.bind(this);
        this.fn.onCancel = this.onCancel.bind(this);
        this.fn.onSave = this.onSave.bind(this);
        this.fn.isNew = this.isNew.bind(this);
        this.fn.onToggleDeviceType = this.onToggleDeviceType.bind(this);
        this.fn.isValid = this.isValid.bind(this);

        this.event.isNew = function () {};
        this.event.getLiteralTypeList = function () {};
        this.event.getDeviceTypeList = function () {};
        this.event.getLiteralById = function () {};
        this.event.createLiteral = function () {};
        this.event.updateLiteral = function () {};
    };


    proto.onInit = function () {
        this.data.isLoading = true;
        this.event.getLiteralTypeList();
        this.event.getDeviceTypeList();
    };

    proto.isValid = function (formName) {
        var isValid = this.$scope.$validation.checkValid(formName);
        return isValid;
    };


    proto.onGetLiteralTypeList = function (res) {
        console.log("onGetLiteralTypeList");
        this.data.literalTypeList = res.data;
        this.getLiteralById();
    };


    proto.onGetDeviceTypeListSuccess = function (res) {
        console.log("onGetDeviceTypeListSuccess");
        this.data.deviceTypeList = res.data;
        this.getLiteralById();
    };


    proto.getLiteralById = function () {
        if (this.data.deviceTypeList && this.data.literalTypeList) {
            console.log("getLiteralById");
            this.event.getLiteralById(this.routeParams.literalId);
        }
    };

    proto.onGetLiteralByIdSuccess = function(literal) {
        this.data.isLoading = false;
        this.showForm(literal);
    };


    proto.onCancel = function () {
        this._goBack();
    };

    proto._goBack = function () {
        this.$window.history.go(-1);
    };

    proto.isNew = function () {
        return this.event.isNew(this.data.literal);
    };

    proto.showForm = function (literal) {
        var self = this;
        literal.DeviceTypes.forEach(function(deviceType){
            var deviceTypeFromList = _.findWhere(self.data.deviceTypeList, {Id: deviceType.Id});
            self.onToggleDeviceType(deviceTypeFromList);
        });
        this.data.literal = literal;
    };

    proto.showError = function (err) {
        this.data.isLoading = false;
        this.data.currentError = err;
        var errorMessage = this.translator.translate("Literal.Detail.Form.SaveErrorMessage");
        this.toastService.error(errorMessage);
    };

    proto.onSave = function () {
        this.data.isLoading = true;
        this.data.literal.DeviceTypes = this.data.selectedDeviceTypes;
        if (this.isNew()) {
            this.event.createLiteral(this.data.literal);
        } else {
            this.event.updateLiteral(this.data.literal);
        }
    };

    proto.onSaveSuccess = function () {
        this.data.isLoading = false;
        var successMessage = this.translator.translate("Literal.Detail.Form.SaveSuccessMessage");
        this.toastService.success( successMessage );
        this._goBack();
    };

    proto.onToggleDeviceType = function (deviceType) {
        deviceType.selected = !deviceType.selected;
        if (deviceType.selected) {
            this.data.selectedDeviceTypes.push(deviceType);
        } else {
            var index = this.data.selectedDeviceTypes.indexOf(deviceType);
            this.data.selectedDeviceTypes.splice(index, 1);
        }
        var names = this.data.selectedDeviceTypes.map(function (currentDeviceType) {
            return currentDeviceType.Name;
        });
        this.data.deviceTypeListPrompt = names.length > 0 ? names.join(", ") : this.translator.translate("Literal.Detail.Form.Select_Device_Type");
    };


    LiteralsEditCreateView.newInstance = function (namedParams) {
        var scope = namedParams.scope || {};
        var model = namedParams.model || LiteralsEditCreateModel.newInstance();
        var presenter = namedParams.presenter || LiteralsEditCreatePresenter.newInstance();
        var $window = namedParams.window || window;
        var routeParams = namedParams.routeParams;

        var view = new LiteralsEditCreateView(scope, model, presenter, routeParams, $window);

        return view._injectAspects(namedParams.viewRepAspect, namedParams.logErrorAspect);
    };

    return {newInstance: LiteralsEditCreateView.newInstance};
});
