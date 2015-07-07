/**
 * Created by Justin on 3/19/2015.
 */
define([
    'shared/BaseView',
    'shared/services/ModalDialogAdapter',
    'modules/account/edit/AccountEditingModel',
    'modules/account/edit/AccountEditPresenter',
    'underscore'
], function (BaseView, ModalDialogAdapter, AccountEditingModel, AccountEditPresenter, _) {

    function doNothing() {
    }

    function AccountEditView($scope, model, presenter) {
        BaseView.call(this, $scope, model, presenter);
        this.accountId = $scope.accountId;
        $scope.$modal = $scope.$injector.get("$modal");
        this.modalDialogAdapter = ModalDialogAdapter.newInstance($scope.$modal);
        this.accountData = {
            "following": false,
            "name": "",
            "subtitle": "",
            "avatar": "",
            "class": "",
            "accountType": -1,
            "emails": [],
            "description": "",
            "contactInfo": {
                "validAddress": true,
                "country": "",
                "city": "",
                "region": "",
                "address": "",
                "address2": "",
                "phoneNumber": "",
                "mobile": "",
                "latitude": 0,
                "longitude": 0,
                "website": "http://"
            },
            "comment": ""
        };

        this.data.isUploading = false;
        this.data.isPosting = false;
    }

    AccountEditView.inherits(BaseView, {
        accountData: {
            get: function () {
                return this.$scope.accountData;
            },
            set: function (value) {
                this.$scope.accountData = value;
            }
        },
        currentAccountType: {
            get: function () {
                return this.$scope.currentAccountType;
            },
            set: function (value) {
                this.$scope.currentAccountType = value;
            }
        },
        currentAccountEnv: {
            get: function () {
                return this.$scope.currentAccountEnv;
            },
            set: function (value) {
                this.$scope.currentAccountEnv = value;
            }
        },
        accountClass: {
            get: function () {
                return this.$scope.accountClass;
            },
            set: function (value) {
                this.$scope.accountClass = value;
            }
        }
    });

    AccountEditView.prototype.show = function () {
        BaseView.prototype.show.call(this);
        this.configureEvents();
        this.initAdditionalData();
    };

    AccountEditView.prototype.initAdditionalData = function () {
        var self = this;
        self.event.onLoadAccount(self.accountId);
        self.event.onLoadAccountType();
        self.event.onLoadEnvironments();
    };

    AccountEditView.prototype.onAccountLoaded = function (data) {
        var self = this;
        self.accountData = data.data;
        self.currentAccountType = this.accountData.accountType.id;
        self.currentAccountEnv = this.accountData.environment.id;
    };

    AccountEditView.prototype.configureEvents = function () {
        var self = this;

        self.fn.closeDialog = function (confirmed) {
            if (!confirmed)
                self.modalDialogAdapter.confirm("Close confirmation",
                    "Are you sure want to close this form without saving?",
                    self.goBackToPreviousPage,
                    doNothing,
                    "Yes", "No");
            else self.goBackToPreviousPage();
        };

        self.fn.saveAccount = function () {
            self.data.isPosting = true;
            self.accountData.modified = new Date();
            self.event.onSubmitEditAccount(self.accountId, self.accountData);
        };

        self.fn.isValid = function (formName) {
            var error = Object.keys(self.$scope[formName].$error).map(function(key){
                return {
                    key: self.$scope[formName].$error[key]
                };
            });
            return error.length == 0;
        };

        self.fn.selectFile = function (files) {
            self.onFilesChanged(files);
        };

        self.fn.updateAccountType = function(currentType){
            var selectedType = self.data.availableAccountTypes.filter(function(d){
                return d.id == parseInt(currentType);
            })[0];
            selectedType = angular.copy(selectedType);
            self.accountData.accountType = selectedType;
        };

        self.fn.updateAccountEnv = function(currentEnv){
            var selectedEnv = self.data.availableEnvironments.filter(function(d){
                return d.id == parseInt(currentEnv);
            })[0];
            selectedEnv = angular.copy(selectedEnv);
            self.accountData.environment = selectedEnv;
        };
        self.fn.init = function(){
            self.accountClass = ['A', 'B', 'C', 'D'];
        }
    };

    AccountEditView.prototype.goBackToPreviousPage = function () {
        window.history.go(-1);
    };

    AccountEditView.prototype.onAvailableAccountTypeLoaded = function (data) {
        this.data.availableAccountTypes = data;
    };

    AccountEditView.prototype.onEnvironmentsLoaded = function (data) {
        this.data.availableEnvironments = data;
    };

    AccountEditView.prototype.onFilesChanged = function (files) {
        if (!files || !files.length) return;
        var self = this;

        self.data.imagesToUpload = files.length;
        self.data.imagesUploaded = 0;
        self.data.isUploading = true;

        for (var i = 0; i < files.length; i++) {
            self.uploadFile(files[i]);
        }
    };

    AccountEditView.prototype.uploadFile = function (file) {
        var self = this;
        self.event.onUploadFile(file);
    };

    AccountEditView.prototype.onUploadComplete = function (uploadedFile) {
        this.data.imagesUploaded++;
        this.accountData.avatar = uploadedFile.imageUrl;

        if (this.data.imagesUploaded === this.data.imagesToUpload) {
            this.data.isUploading = false;
        }
    };

    AccountEditView.prototype.onAccountUpdated = function () {
        var self = this;
        self.data.isPosting = false;

        self.modalDialogAdapter.notify("Edit company",
            "<div class='notify success'>" +
            "<span class='ok-tick'><i class='ic-accept'></i></span>" +
            "<p>Well done !</p>" +
            "<p>La empresa Company SL ha sido creada correctamente</p>" +
            "</div>");
        self.goBackToPreviousPage();
    };

    AccountEditView.prototype.showError = function (error) {
        var self = this;
        self.data.isPosting = false;
        BaseView.prototype.showError.call(this, error);
    };

    AccountEditView.newInstance = function (scope, model, presenter, viewRepaintAspect, logErrorAspect) {
        var uploadService = scope.$upload;
        model = model || AccountEditingModel.newInstance(uploadService);
        presenter = presenter || AccountEditPresenter.newInstance();

        var view = new AccountEditView(scope, model, presenter);
        return view._injectAspects(viewRepaintAspect, logErrorAspect);
    };

    return AccountEditView;
});