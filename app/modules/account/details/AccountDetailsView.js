/**
 * Created by justin on 3/9/15.
 */
define([
    'app',
    'shared/BaseView',
    'modules/account/details/AccountDetailsPresenter',
    'shared/services/GoogleMapService',
    'shared/services/PopoverAdapter',
    'shared/services/ModalDialogAdapter',
    'jquery',
    'shared/services/AwaitHelper',
    'shared/services/notification/NotificationService'
], function (app, BaseView, AccountDetailsPresenter, GoogleMapService, PopoverAdapter, ModalDialogAdapter, $, AwaitHelper, NotificationService) {

    function AccountDetailsView(scope, element, presenter, mapService, popoverAdapter, modalAdapter, notificationService) {
        presenter = presenter || new AccountDetailsPresenter();
        BaseView.call(this, scope, null, presenter);
        this.notificationService = app.di.resolve('notificationService');
        this.modalDialogAdapter = modalAdapter || ModalDialogAdapter.newInstance(scope.$modal);
        this.mapService = mapService || GoogleMapService.newInstance();
        this.popoverAdapter = popoverAdapter || PopoverAdapter.newInstance();
        this.awaitHelper = AwaitHelper.newInstance();
        this.modalService = scope.$modal;
        this.scope = scope;
        this.element = element;
        this.configureEvents(this);
    }

    AccountDetailsView.inherits(BaseView, {
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
        relatedContact: {
            get: function () {
                return this.$scope.relatedContact;
            },
            set: function (value) {
                this.$scope.relatedContact = value;
            }
        },
        relatedContacts: {
            get: function () {
                return this.$scope.relatedContacts || (this.$scope.relatedContacts = {});
            },
            set: function (value) {
                this.$scope.relatedContacts = value;
            }
        }
    });

    AccountDetailsView.prototype.configureEvents = function () {
        var self = this;
        self.fn.editingEmails = {};

        self.fn.loadAccountData = function () {
            self.event.onLoadAccount();
        };

        self.fn.initMap = function () {
            var mapOptions = {
                zoom: 8,
                center: self.mapService.getLatLng(41.39479, 2.1487679)
            };
            self.data.map = self.mapService.createMap($('#map-canvas')[0], mapOptions);
        };

        self.fn.isEditingEmail = function ($index) {
            return !!self.fn.editingEmails["" + $index];
        };

        self.fn.startEditEmail = function ($index, email) {
            self.fn.editingEmails["" + $index] = email;
        };

        self.fn.finishEditingEmail = function ($index) {
            self.event.onUpdateEmail(self.accountData);
            delete self.fn.editingEmails["" + $index];
        };

        self.fn.cancelEditingEmail = function ($index) {
            delete self.fn.editingEmails["" + $index];
            self.fn.loadAccountData();
        };

        self.fn.toggleFollow = function () {
            self.event.onToggleFollow();
        };

        self.fn.createPopover = function ($event, relatedContactId) {
            var target = $event.target.closest('.popover-contact-info');
            self.event.onRelateContactRequest(relatedContactId, function (data) {
                self.relatedContact = data;
                self.popoverAdapter.createPopover(target, self.getPopoverTemplate(), self.getPopoverContentTemplate());
            });
        };

        self.fn.showPopover = function ($event) {
            var target = $event.target.closest('.popover-contact-info');
            if ($(target).siblings('div.popover').length) return;

            if ($("div.popover").length) {
                self.popoverAdapter.closePopover($('div.popover'));
            }

            self.popoverAdapter.openPopover(target);
            $event.stopPropagation();
        };

        self.fn.bindDocumentDomEvents = function () {
            $(document).on("click", function (e) {
                if (!$('.popover').find(e.target).length && !$(e.target).is('a.popover-contact-info') && !$(e.target).closest('a.popover-contact-info').length) {
                    self.popoverAdapter.closePopover($('div.popover'));
                }
            });

            $(document).on('click', '.close-pop-over', function (e) {
                self.popoverAdapter.closePopover('div.popover');
            });
        };

        self.fn.deleteAccount = function (title, message) {
            title = title || "Delete account";
            message = message || "Are you sure want to delete the account <b>" + self.accountData.name + "</b>?";
            self.modalDialogAdapter.confirm(title,
                message,
                self.handleDeleteRequest.bind(self),
                doNothing,
                "Accept", "No, thanks");
        };

        self.fn.addCompany = function () {

            var paramDialog = self.modalService.open({
                templateUrl: 'app/modules/account/details/addCompanyDialog/addCompanyDialog.html',
                backdrop: 'static',
                keyboard: false,
                controller: 'AddCompanyDialogController',
                resolve: {
                    accountName: function () {
                        return self.accountData.name
                    }
                }
            });

            paramDialog.result.then(self.handleAddCompanyRequest.bind(self), function () {
            });
        };

    };

    AccountDetailsView.prototype.handleAddCompanyRequest = function (data) {
        var self = this;
        self.event.onSaveRelatedCompany(self.accountId, data.relatedCompany, self.onRelatedCompanySaved.bind(self));
    };

    AccountDetailsView.prototype.appendCompany = function (company) {
        var self = this;

        relatedCompanyWrapper = $(".relatedCompanies");

        if(!relatedCompanyWrapper.length) return;

        var okTick = $("<span class='ok-tick pull-right'><i class='ic-accept'></i></span>");
        var newCompany = $("<p>" + company.name + "</p>");
        newCompany.append(okTick);

        relatedCompanyWrapper.append(newCompany);
        newCompany.addClass('animated fadeIn success-flash');

        self.removeEffects(newCompany, okTick);
    };

    AccountDetailsView.prototype.appendContact = function (contact) {
        var self = this;

        var relatedContactWrapper = $(".relatedContacts");

        if(!relatedContactWrapper.length) return;

        var okTick = $("<span class='ok-tick pull-right'><i class='ic-accept'></i></span>");
        var newContact = $('' +
        '<p>' +
        '   <a href="#/accounts/' + contact.id + '">' + contact.FirstName + " " + contact.LastName + '</a>' +
        '   <a class="popover-contact-info" ng-mouseover="fn.createPopover($event, ' + contact.id + ')">' +
        '       <span class="ic-info" ng-click="fn.showPopover($event)"></span>' +
        '   </a>' +
        '</p>');
        newContact.append(okTick);

        relatedContactWrapper.append(newContact);
        newContact.addClass('animated fadeIn success-flash');

        $('html, body').animate({
            scrollTop: relatedContactWrapper.offset().top
        }, 500);
        self.removeEffects(newContact, okTick);
    };

    AccountDetailsView.prototype.removeEffects = function (element, okTick) {
        var self = this;
        self.awaitHelper.await(function () {
            element.addClass("bg-fade");
            okTick.remove();
            self.awaitHelper.await(function () {
                element.removeClass('animated fadeIn success-flash');
            }, 1000);
        }, 3500);
    };

    AccountDetailsView.prototype.onRelatedCompanySaved = function (response) {
        var self = this;
        var message = self.generateSuccessMessage("The company has been added successfully");
        self.modalDialogAdapter.notify('', message, {}, self.appendCompany.bind(self, response.relatedCompany));
    };

    AccountDetailsView.prototype._show = BaseView.prototype.show;
    AccountDetailsView.prototype.show = function () {
        var self = this;
        BaseView.prototype.show.call(this);
        self.fn.loadAccountData();
    };

    AccountDetailsView.prototype.getPopoverTemplate = function () {
        return $('#popover_template').html();
    };

    AccountDetailsView.prototype.getPopoverContentTemplate = function () {
        return $('#popover_content_template').html();
    };

    AccountDetailsView.prototype.onAccountLoaded = function (data) {
        var errorMsg = "Error while loading data from server";
        if (!data) throw new Error(errorMsg);

        var self = this;
        self.accountData = data;
        self.watchElement = setInterval(self.detectElementCreated.bind(self),100);
        self.updateMap(data.contactInfo.latitude, data.contactInfo.longitude, data.name);
    };

    AccountDetailsView.prototype.detectElementCreated = function(){
        var self = this;
        if($('.relatedContacts').length > 0){
            self.loadNewCreatedContactIfAny();
            clearInterval(self.watchElement);
        };
    };

    AccountDetailsView.prototype.loadNewCreatedContactIfAny = function () {
        var self = this;
        console.log("loaded");
        var contacts = self.notificationService.getMessages('contact_from_account_' + self.accountId);
        console.log("loaded with", contacts);
        if (!contacts || !contacts.length)
            return;
        contacts.forEach(function (contact) {
            self.appendContact(contact.message.data);
        });
    };

    AccountDetailsView.prototype.updateMap = function (lat, long, accountName) {
        var self = this;
        var latLng = self.mapService.getLatLng(lat, long);

        var marker = self.mapService.createMarker({
            position: latLng,
            title: accountName
        });
        marker.setMap(self.data.map);
        //
        //
        //
        this.data.map.setCenter(latLng);
    };

    AccountDetailsView.prototype.onFollowToggled = function () {
        var self = this;
        self.fn.loadAccountData();
    };

    AccountDetailsView.prototype.onAccountUpdated = function () {
        var self = this;
        self.fn.loadAccountData();
    };

    AccountDetailsView.prototype.handleDeleteRequest = function () {
        var self = this;
        if (!self.accountId) throw new Error('AccountID is undefined');
        self.event.onDeleteAccount(self.accountId, self.onAccountDeleted.bind(self));
        self.$scope.location = "/accounts";
    };

    AccountDetailsView.prototype.onAccountDeleted = function () {
        var self = this;
        var message = self.generateSuccessMessage("The account has been deleted successfully");
        self.modalDialogAdapter.notify('', message);
        self.redirectToAccountList();
    };

    AccountDetailsView.prototype.redirectToAccountList = function () {
        window.location.href = "/#/accounts/";
    };

    AccountDetailsView.newInstance = function (scope, element, mapService, popoverAdapter, $viewRepAspect, $logErrorAspect) {

        var view = new AccountDetailsView(scope, element);

        return view._injectAspects($viewRepAspect, $logErrorAspect);
    };

    return AccountDetailsView;
});