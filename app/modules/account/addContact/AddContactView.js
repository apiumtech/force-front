define([
    'app',
    'shared/BaseView',
    'jquery',
    'underscore',
    // @autowired dependencies
    'modules/account/addContact/AddContactPresenter',
    'shared/services/RouteChangedStorage'
], function (app, BaseView, $, _) {
    'use strict';

    function AddContactView(presenter, routeChangedStorage, $locationService) {
        this.$locationService = $locationService;
        this.addContactPresenter = presenter;
        this.routeChangedStorage = routeChangedStorage;
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
            self.$locationService.path(previousRoute)
        };

        self.fn.saveContact = function (continueAfterSaved) {
            self.continueAfterSaved = continueAfterSaved || false;
            self.fn.startNewForm();
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

    app.di.register("addContactView").as(AddContactView);

    return AddContactView;
});