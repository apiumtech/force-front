define([
    'shared/BaseView',
    'modules/literal/LiteralPresenter',
    'modules/literal/LiteralModel',
    'shared/services/TranslatorService'
], function (BaseView, LiteralPresenter, LiteralModel, TranslatorService) {
    
    function LiteralView($scope, $model, $presenter, $routeParams, $window) {
        BaseView.call(this, $scope, $model, $presenter);
        this.$window = $window;
        this.routeParams = $routeParams;
        this.translator = TranslatorService.newInstance();

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

    var proto = LiteralView.prototype = Object.create(BaseView.prototype, {});


    proto.configureEvents = function () {
        this.fn.onInit = this._onInit.bind(this);
        this.fn.onCancel = this._onCancel.bind(this);
        this.fn.onSave = this._onSave.bind(this);
        this.fn.isNew = this.isNew.bind(this);
        this.fn.onToggleDeviceType = this.onToggleDeviceType.bind(this);

        this.event.isNew = function () {
        };
    };


    proto._onInit = function () {
        this.presenter.getLiteralTypeList();
        this.presenter.getDeviceTypeList();
    };


    proto.onGetLiteralTypeList = function (data) {
        this.data.literalTypeList = data;
        this.getLiteralById();
    };


    proto.onGetDeviceTypeList = function (data) {
        this.data.deviceTypeList = data;
        this.getLiteralById();
    };


    proto.getLiteralById = function () {
        if (this.data.deviceTypeList && this.data.literalTypeList) {
            this.presenter.getLiteralById(this.routeParams.literalId);
        }
    };


    proto._onCancel = function () {
        this._goBack();
    };

    proto._goBack = function () {
        this.$window.history.back();
    };

    proto.isNew = function () {
        return this.event.isNew(this.data.literal);
    };

    proto.showForm = function (literal) {
        this.data.literal = literal;
    };

    proto.showError = function (err) {
        this.data.currentError = err;
    };

    proto._onSave = function () {
        this.data.literal.DeviceTypes = this.data.selectedDeviceTypes;
        if (this.isNew()) {
            this.presenter.createLiteral(this.data.literal);
        } else {
            this.presenter.updateLiteral(this.data.literal);
        }
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


    LiteralView.newInstance = function (namedParams) {
        var scope = namedParams.scope || {};
        var model = namedParams.model || LiteralModel.newInstance();
        var presenter = namedParams.presenter || LiteralPresenter.newInstance();
        var $window = namedParams.window || window;
        var routeParams = namedParams.routeParams;

        var view = new LiteralView(scope, model, presenter, routeParams, $window);

        return view._injectAspects(namedParams.viewRepAspect, namedParams.logErrorAspect);
    };

    return {newInstance: LiteralView.newInstance};
});
