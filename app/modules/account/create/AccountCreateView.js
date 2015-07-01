/**
 * Created by Justin on 3/19/2015.
 */
define([
    'shared/BaseView',
    'shared/services/ModalDialogAdapter',
    'modules/account/edit/AccountEditingModel',
    'modules/account/create/AccountCreatePresenter'
], function (BaseView, ModalDialogAdapter, AccountEditingModel, AccountCreatePresenter) {

    function doNothing() {
    }

    function AccountCreateView($scope, model, presenter) {
        BaseView.call(this, $scope, model, presenter);
        $scope.$modal = $scope.$injector.get("$modal");
        this.modalDialogAdapter = ModalDialogAdapter.newInstance($scope.$modal);
        this.accountData = {
            "id": 1,
            "name": "",
            "avatar": "",
            "contactInfo": {
                "address": "",
                "city": "",
                "state": "",
                "postCode": "",
                "country": "",
                "latitude": 0,
                "longitude": 0,
                "mobile": "",
                "phoneNumber": "",
                "fax": "",
                "validAddress": false,
                "website": "",
                "comment": ""
            },
            "class": "",
            "subtitle": "",
            "description": "",
            "following": false,
            "responsible": null,
            "modified": "",
            "emails": [],
            "accountType": null,
            "environment": null,
            "extra": null
        };

        this.data.isUploading = false;
        this.data.isPosting = false;
    }

    AccountCreateView.inherits(BaseView, {
        accountData: {
            get: function () {
                return this.$scope.accountData;
            },
            set: function (value) {
                this.$scope.accountData = value;
            }
        },
        accountEmail: {
            get: function () {
                return this.$scope.accountEmail;
            },
            set: function (value) {
                this.$scope.accountEmail = value;
            }
        },
        accountOwners: {
            get: function () {
                return this.$scope.accountOwners;
            },
            set: function (value) {
                this.$scope.accountOwners = value;
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
        }
    });

    AccountCreateView.prototype.show = function () {
        BaseView.prototype.show.call(this);
        this.configureEvents();
        this.initAdditionalData();
    };

    AccountCreateView.prototype.initAdditionalData = function () {
        var self = this;
        self.event.onLoadAccountType();
        self.event.onLoadEnvironments();
    };

    AccountCreateView.prototype.configureEvents = function () {
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
            if(self.accountEmail) self.accountData.emails.push({id: 1, email: self.accountEmail});
            self.event.onCreateAccount(self.accountData);
        };

        self.fn.isValid = function (formName) {
            var isValid = self.$scope.$validation.checkValid(formName);
            //TODO: recheck the validation
            isValid = true;
            return isValid;
        };

        self.fn.selectFile = function (files) {
            self.onFilesChanged(files);
        };

        self.fn.chooseOwner = function(){

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

    };

    AccountCreateView.prototype.goBackToPreviousPage = function () {
        window.history.go(-1);
    };

    AccountCreateView.prototype.onAvailableAccountTypeLoaded = function (data) {
        this.data.availableAccountTypes = data;
    };

    AccountCreateView.prototype.onEnvironmentsLoaded = function (data) {
        this.data.availableEnvironments = data;
    };

    AccountCreateView.prototype.onFilesChanged = function (files) {
        if (!files || !files.length) return;
        var self = this;

        self.data.imagesToUpload = files.length;
        self.data.imagesUploaded = 0;
        self.data.isUploading = true;

        for (var i = 0; i < files.length; i++) {
            self.uploadFile(files[i]);
        }
    };

    AccountCreateView.prototype.uploadFile = function (file) {
        var self = this;
        self.event.onUploadFile(file);
    };

    AccountCreateView.prototype.onUploadComplete = function (uploadedFile) {
        this.data.imagesUploaded++;
        this.accountData.imgUrl = uploadedFile.imageUrl;

        if (this.data.imagesUploaded === this.data.imagesToUpload) {
            this.data.isUploading = false;
        }
    };

    AccountCreateView.prototype.onAccountCreated = function (response) {
        var self = this;
        self.data.isPosting = false;

        self.modalDialogAdapter.notify("Create company",
            "<div class='notify success'>" +
            "<span class='ok-tick'><i class='ic-accept'></i></span>" +
            "<p>Well done !</p>" +
            "<p>"+response.message+"</p>" +
            "</div>");
        self.goBackToPreviousPage();
    };

    AccountCreateView.prototype.showError = function (error) {
        var self = this;
        self.data.isPosting = false;
        BaseView.prototype.showError.call(this, error);
    };

    AccountCreateView.newInstance = function (scope, model, presenter, viewRepaintAspect, logErrorAspect) {
        var uploadService = scope.$upload;
        model = model || AccountEditingModel.newInstance(uploadService);
        presenter = presenter || AccountCreatePresenter.newInstance();

        var view = new AccountCreateView(scope, model, presenter);
        return view._injectAspects(viewRepaintAspect, logErrorAspect);
    };

    return AccountCreateView;
});