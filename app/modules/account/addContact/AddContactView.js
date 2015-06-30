define([
    'app',
    'shared/BaseView',
    'jquery',
    'underscore',
    // @autowired dependencies
    'modules/account/addContact/AddContactPresenter',
    'shared/services/RouteChangedStorage',
    'shared/services/notification/NotificationService'
], function (app, BaseView, $, _) {
    'use strict';

    function AddContactView(addContactPresenter, $locationService, notificationService) {
        //@autowired
        this.$locationService = $locationService;
        this.addContactPresenter = addContactPresenter;
        this.notificationService = notificationService;

        BaseView.call(this, {}, null, this.addContactPresenter);

        this.continueAfterSaved = false;
        this.isPosting = false;
    }

    AddContactView.inherits(BaseView, {
        contactData: {
            get: function () {
                return this.$scope.contactData;
            },
            set: function (value) {
                this.$scope.contactData = value;
            }
        },
        accountId: {
            get: function () {
                return this.$scope.accountId;
            },
            set: function (value) {
                this.$scope.accountId = value;
            }
        },
        accountData: {
            get: function () {
                return this.$scope.accountData;
            },
            set: function (value) {
                this.$scope.accountData = value;
            }
        },
        isPosting: {
            get: function () {
                return this.$scope.isPosting;
            },
            set: function (value) {
                this.$scope.isPosting = value;
            }
        },
        isUploading: {
            get: function () {
                return this.$scope.isUploading;
            },
            set: function (value) {
                this.$scope.isUploading = value;
            }
        }
    });

    AddContactView.prototype.show = function () {
        this.__base__.show.call(this);
        var self = this;

        self.configureEvents();
    };

    AddContactView.prototype.configureEvents = function () {
        var self = this;

        self.fn.goBack = function () {
            self.$locationService.path('/accounts/' + self.accountId);
        };

        self.fn.saveContact = function (continueAfterSaved) {
            self.isPosting = true;
            self.continueAfterSaved = continueAfterSaved || false;
            self.event.onSaveContact(self.accountId, self.contactData);
        };

        self.fn.isFormValidated = function (formName) {
            return self.$scope[formName].$valid;
        };

        self.fn.pageInitialized = function () {
            self.event.getAccountData(self.accountId);
        };

        self.fn.resetForm = function () {
            $("form#CreateContact")[0].reset();

            _.each(self.$scope.CreateContact, function (value, key) {
                if (value && value.$touched)
                    value.$touched = false;
            });
        };

        self.fn.selectFile = function (files) {
            self.onFilesChanged(files);
        };

        self.fn.startNewForm = function () {
            self.continueAfterSaved = false;
            self.contactData = {
                Gender: "Female",
                ImageUrl: "",
                FirstName: "",
                LastName: "",
                AccountId: self.accountId,
                Role: "",
                SkypeName: "",
                PhoneNumber: "",
                OtherPhone: "",
                Email: "",
                Address: {
                    Street: "",
                    City: "",
                    State: "",
                    Country: "",
                    PostCode: "",
                    Comments: ""
                },
                AddressType: "other",

                UseOtherAddress: true,
                UseCompanyAddress: false,
                UseCompanyGeolocalization: false,
                Extra: {
                    Field1: ""
                }
            };
            self.fn.resetForm();
        };

    };

    AddContactView.prototype.onFilesChanged = function(files){
        if (!files || !files.length) return;
        var self = this;

        self.imagesToUpload = files.length;
        self.imagesUploaded = 0;
        self.isUploading = true;

        for (var i = 0; i < files.length; i++) {
            self.uploadFile(files[i]);
        }
    };

    AddContactView.prototype.uploadFile = function(file){
        var self = this;
        self.event.onUploadFile(file);
    };

    AddContactView.prototype.onUploadComplete = function (uploadedFile) {
        this.imagesUploaded++;
        this.contactData.ImageUrl = uploadedFile.imageUrl;

        if (this.imagesUploaded === this.imagesToUpload) {
            this.isUploading = false;
        }
    };

    AddContactView.prototype.onAccountDataLoaded = function (accountData) {
        var self = this;
        self.fn.startNewForm();
        self.accountData = accountData;
    };

    AddContactView.prototype.onSaveContactSuccess = function (contactData) {
        var self = this;
        self.isPosting = false;
        this.notificationService.pushMessage('contact_from_account_' + self.accountId, contactData);
        if (self.continueAfterSaved) {
            self.fn.startNewForm();
        } else {
            self.fn.goBack();
        }
    };

    AddContactView.prototype.showError = function (error) {
        this.__base__.showError.call(this, error);
        this.isPosting = false;
    };

    AddContactView.contractName = 'addContactView';

    app.di.register(AddContactView.contractName).as(AddContactView);

    return AddContactView;
});