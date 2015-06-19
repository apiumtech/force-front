define([
    'modules/literals/shared/edit-create/BaseLiteralsEditCreateView',
    'modules/literals/global/edit-create/LiteralsEditCreatePresenter',
    'modules/literals/global/edit-create/LiteralsEditCreateModel',
    'underscore'
], function (BaseLiteralsEditCreateView, LiteralsEditCreatePresenter, LiteralsEditCreateModel, _) {
    
    function LiteralsEditCreateView($scope, $model, $presenter, $routeParams, $window) {
        BaseLiteralsEditCreateView.call(this, $scope, $model, $presenter, $routeParams, $window);
    }

    LiteralsEditCreateView.inherits(BaseLiteralsEditCreateView, {});
    var proto = LiteralsEditCreateView.prototype;




    proto.configureProperties = function () {
        // literal Type
        this.data.literalTypeList = null;
        this.data.selectedLiteralType = null;

        // device Type
        this.data.deviceTypeList = null;
        this.data.selectedDeviceTypes = [];
        this.data.deviceTypeListPrompt = this.translator.translate("Literal.Detail.Form.Select_Device_Type");
    };

    proto.configureEvents = function () {
        this.__base__.configureEvents.call(this);

        this.fn.onToggleDeviceType = this.onToggleDeviceType.bind(this);

        this.event.getLiteralTypeList = function () {};
        this.event.getDeviceTypeList = function () {};
    };




    proto.onInit = function () {
        this.data.isLoading = true;
        this.event.getLiteralTypeList();
        this.event.getDeviceTypeList();
    };

    proto.getLiteralById = function () {
        if (this.data.deviceTypeList && this.data.literalTypeList) {
            this.event.getLiteralById(this.routeParams.literalId);
        }
    };

    proto.onGetLiteralByIdSuccess = function(literal) {
        this.data.isLoading = false;
        this.showForm(literal);
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




    proto.onGetLiteralTypeList = function (res) {
        this.data.literalTypeList = res.data;
        this.getLiteralById();
    };


    proto.onGetDeviceTypeListSuccess = function (res) {
        this.data.deviceTypeList = res.data;
        this.getLiteralById();
    };

    proto.showForm = function (literal) {
        var self = this;
        literal.DeviceTypes.forEach(function(deviceType){
            var deviceTypeFromList = _.findWhere(self.data.deviceTypeList, {Id: deviceType.Id});
            self.onToggleDeviceType(deviceTypeFromList);
        });
        this.data.literal = literal;
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

    proto.showError = function (err) {
        var errorMessage = this.translator.translate("Literal.Detail.Form.SaveErrorMessage");
        this.__base__.showError.call(this, errorMessage);
    };

    proto.onSaveSuccess = function () {
        var successMessage = this.translator.translate("Literal.Detail.Form.SaveSuccessMessage");
        this.__base__.onSaveSuccess.call(this, successMessage);
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
