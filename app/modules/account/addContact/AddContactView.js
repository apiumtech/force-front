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
            self.event.onSaveContact(self.contactData);
            //self.fn.startNewForm();
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

        self.fn.startNewForm = function () {
            self.continueAfterSaved = false;
            self.contactData = {
                Gender: "female",
                ImageUrl: "",
                FirstName: "",
                LastName: "",
                AccountId: self.$scope.accountId,
                Role: "",
                SkypeName: "",
                PhoneNumber: "",
                OtherPhone: "",
                Email: "",
                Address: {
                    Street: "",
                    City: "",
                    State:"",
                    Country:"",
                    PostCode:"",
                    Comments:""
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

    AddContactView.prototype.onAccountDataLoaded = function(accountData){
        var self = this;
        self.fn.startNewForm();
        self.accountData = accountData;
    };

    AddContactView.prototype.onContactSaved = function(response){
        var self = this;
        if(self.continueAfterSaved)
            self.fn.startNewForm();
        else{

        }
    };

    app.di.register("addContactView").as(AddContactView);

    return AddContactView;
});