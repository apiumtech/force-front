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

    function AccountCreateView($scope, $modalInstance, model, presenter) {
        BaseView.call(this, $scope, model, presenter);

        this.modalInstance = $modalInstance;
        this.modalDialogAdapter = ModalDialogAdapter.newInstance($scope.$modal).getOrElse(throwInstantiateException(ModalDialogAdapter));

        this.accountData = {
            "following": false,
            "name": "",
            "subtitle": "",
            "imgUrl": "",
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
                "website": ""
            },
            "comment": ""
        };

        this.data.isUploading = false;
    }

    AccountCreateView.prototype = Object.create(BaseView.prototype, {
        accountData: {
            get: function () {
                return this.$scope.accountData;
            },
            set: function (value) {
                this.$scope.accountData = value;
            }
        }
    });

    AccountCreateView.prototype.show = function () {
        BaseView.prototype.show.call(this);
        this.configureEvents();
    };

    AccountCreateView.prototype.configureEvents = function () {
        var self = this;

        self.fn.closeDialog = function () {
            self.modalDialogAdapter.confirm("Close confirmation",
                "Are you sure want to close this dialog without saving?",
                self.modalInstance.dismiss,
                doNothing,
                "Yes", "No");
        };

        self.fn.saveAccount = function () {
            // TODO : save the data then close the dialog
            self.onAccountSaved();
        };

        self.fn.selectFile = function (files) {
            self.onFilesChanged(files);
        };
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

    AccountCreateView.prototype.onAccountSaved = function () {
        var self = this;
        self.modalInstance.close();
    };

    AccountCreateView.newInstance = function (scope, modalInstance, model, presenter, viewRepaintAspect, logErrorAspect) {
        var uploadService = scope.$upload;
        model = model || AccountCreateModel.newInstance(uploadService).getOrElse(throwInstantiateException(AccountCreateModel));
        presenter = presenter || AccountCreatePresenter.newInstance().getOrElse(throwInstantiateException(AccountCreatePresenter));

        var view = new AccountCreateView(scope, modalInstance, model, presenter);
        return view._injectAspects(viewRepaintAspect, logErrorAspect);
    };

    return AccountCreateView;
});