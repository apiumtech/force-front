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

    function AddContactView(presenter, routeChangedStorage, $locationService, notificationService) {
        //@autowired
        this.$locationService = $locationService;
        this.addContactPresenter = presenter;
        this.routeChangedStorage = routeChangedStorage;
        this.notificationService = notificationService;

        BaseView.call(this, {}, null, this.addContactPresenter);

        this.continueAfterSaved = false;
    }

    AddContactView.inherits(BaseView, {
        presenter: {
            get: function () {
                return this.addContactPresenter;
            },
            set: function (value) {
                this.addContactPresenter = value;
            }
        },
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
            var previousRoute = self.routeChangedStorage.getPreviousRoute();
            self.$locationService.path(previousRoute);
        };

        self.fn.saveContact = function (continueAfterSaved) {
            self.continueAfterSaved = continueAfterSaved || false;
            self.event.onSaveContact(self.accountId, self.contactData);
        };

        self.fn.isFormValidated = function (formName) {
            return self.$scope[formName].$valid;
        };

        self.fn.pageInitialized = function () {
            self.fn.startNewForm();
        };

        self.fn.resetForm = function () {
            $("form#CreateContact")[0].reset();

            _.each(self.$scope.CreateContact, function (value, key) {
                if (value && value.$touched)
                    value.$touched = false;
            });
        };

        self.fn.startNewForm = function () {
            self.continueAfterSaved = false;
            self.contactData = {
                Gender: -1,
                ImageUrl: "",
                FirstName: "",
                LastName: "",
                AccountId: self.$scope.accountId,
                Role: "",
                SkypeName: "",
                PhoneNumber: "",
                OtherPhone: "",
                Email: "",
                Address: "",
                UseCompanyAddress: false,
                UseCompanyGeolocalization: false
            };
            self.fn.resetForm();
        };
    };

    AddContactView.prototype.onSaveContactSuccess = function (contactData) {
        var self = this;
        this.notificationService.pushMessage('contact_from_account_' + self.accountId, contactData);
        if (self.continueAfterSaved) {
            self.fn.startNewForm();
        } else {
            self.fn.goBack();
        }
    };

    app.di.register("addContactView").as(AddContactView);

    return AddContactView;
});