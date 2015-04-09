/**
 * Created by Justin on 3/19/2015.
 */
app.registerView(function (container) {
    var BaseView = container.getView("views/BaseView");
    var ModalDialogAdapter = container.getService('services/ModalDialogAdapter');
    var AccountCreateModel = container.getModel("models/accountDetails/AccountCreateModel");
    var AccountCreatePresenter = container.getPresenter("presenters/accountDetails/AccountCreatePresenter");

    function doNothing() {
    }

    function AccountEditView($scope, model, presenter) {
        BaseView.call(this, $scope, model, presenter);
        console.log($scope.accountId);
        $scope.$modal = $scope.$injector.get("$modal");
        this.modalDialogAdapter = ModalDialogAdapter.newInstance($scope.$modal).getOrElse(throwInstantiateException(ModalDialogAdapter));
        this.accountData = {
            "following": false,
            "name": "",
            "subtitle": "",
            "imgUrl": "",
            "class": "",
            "accountType": -1,
            "emails": "",
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

    AccountEditView.prototype = Object.create(BaseView.prototype, {
        accountData: {
            get: function () {
                return this.$scope.accountData;
            },
            set: function (value) {
                this.$scope.accountData = value;
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
        self.event.onLoadAccountType();
        self.event.onLoadEnvironments();
    };

    AccountEditView.prototype.configureEvents = function () {
        var self = this;

        self.fn.closeDialog = function (confirmed) {
            if (!confirmed)
                self.modalDialogAdapter.confirm("Close confirmation",
                    "Are you sure want to close this dialog without saving?",
                    self.goBackToPreviousPage,
                    doNothing,
                    "Yes", "No");
            else self.goBackToPreviousPage();
        };

        self.fn.saveAccount = function () {
            self.data.isPosting = true;
            self.event.onCreateAccount(self.accountData);
        };

        self.fn.isValid = function (formName) {
            var isValid = self.$scope.$validation.checkValid(formName);
            return isValid;
        };

        self.fn.selectFile = function (files) {
            self.onFilesChanged(files);
        };
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
        this.accountData.imgUrl = uploadedFile.imageUrl;

        if (this.data.imagesUploaded === this.data.imagesToUpload) {
            this.data.isUploading = false;
        }
    };

    AccountEditView.prototype.onAccountCreated = function () {
        var self = this;
        self.data.isPosting = false;
        self.goBackToPreviousPage();
    };

    AccountEditView.prototype.showError = function (error) {
        var self = this;
        self.data.isPosting = false;
        BaseView.prototype.showError.call(this, error);
    };

    AccountEditView.newInstance = function (scope, model, presenter, viewRepaintAspect, logErrorAspect) {
        var uploadService = scope.$upload;
        model = model || AccountCreateModel.newInstance(uploadService).getOrElse(throwInstantiateException(AccountCreateModel));
        presenter = presenter || AccountCreatePresenter.newInstance().getOrElse(throwInstantiateException(AccountCreatePresenter));

        var view = new AccountEditView(scope, model, presenter);
        return view._injectAspects(viewRepaintAspect, logErrorAspect);
    };

    return AccountEditView;
});