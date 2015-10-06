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

        // Platform
        this.data.platformList = null;
        this.data.selectedPlatforms = [];
        this.data.platformListPrompt = this.translator.translate("Literal.Detail.Form.Select_Platform");
    };

    proto.configureEvents = function () {
        this.__base__.configureEvents.call(this);

        this.fn.onTogglePlatform = this.onTogglePlatform.bind(this);

        this.event.getLiteralTypeList = function () {};
        this.event.getPlatformList = function () {};
    };




    proto.onInit = function () {
        this.data.isLoading = true;
        this.event.getLiteralTypeList();
        this.event.getPlatformList();
    };

    proto.getLiteralById = function () {
        if (this.data.platformList && this.data.literalTypeList) {
            this.event.getLiteralById(this.routeParams.literalId);
        }
    };

    proto.onGetLiteralByIdSuccess = function(literal) {
        this.data.isLoading = false;
        this.showForm(literal);
    };

    proto.onSave = function () {
        this.data.isLoading = true;
        this.data.literal.Platforms = this.data.selectedPlatforms;
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


    proto.onGetPlatformListSuccess = function (res) {
        this.data.platformList = res.data;
        this.getLiteralById();
    };

    proto.showForm = function (literal) {
        var self = this;
        literal.Platforms.forEach(function(platform){
            var platformFromList = _.findWhere(self.data.platformList, {Id: platform.Id});
            self.onTogglePlatform(platformFromList);
        });
        this.data.literal = literal;
    };

    proto.onTogglePlatform = function (platform) {
        platform.selected = !platform.selected;
        if (platform.selected) {
            this.data.selectedPlatforms.push(platform);
        } else {
            var index = this.data.selectedPlatforms.indexOf(platform);
            this.data.selectedPlatforms.splice(index, 1);
        }
        var names = this.data.selectedPlatforms.map(function (currentPlatform) {
            return currentPlatform.Name;
        });
        this.data.platformListPrompt = names.length > 0 ? names.join(", ") : this.translator.translate("Literal.Detail.Form.Select_Platform");
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
