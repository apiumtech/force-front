/**
 * Created by justin on 3/9/15.
 */
define([
    'shared/BaseView',
    'modules/account/details/AccountDetailsModel',
    'modules/account/details/AccountDetailsPresenter',
    'shared/services/GoogleMapService',
    'shared/services/PopoverAdapter',
    'shared/services/ModalDialogAdapter',
    'jquery'
], function (BaseView, AccountDetailsModel, AccountDetailsPresenter, GoogleMapService, PopoverAdapter, ModalDialogAdapter, $) {

    function AccountDetailsView(scope, modalService, model, presenter, mapService, popoverAdapter) {
        BaseView.call(this, scope, model, presenter);
        this.modalDialogAdapter = ModalDialogAdapter.newInstance(modalService);
        this.mapService = mapService;
        this.popoverAdapter = popoverAdapter;
        this.configureEvents(this);
    }

    AccountDetailsView.prototype = Object.create(BaseView.prototype, {
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

        self.fn.openEditDialog = function () {
            self.openEditDialog();
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
    };

    AccountDetailsView.prototype._show = BaseView.prototype.show;
    AccountDetailsView.prototype.show = function () {
        var self = this;
        BaseView.prototype.show.call(this);
        self.fn.loadAccountData();
    };

    AccountDetailsView.prototype.openEditDialog = function () {
        var self = this;

        self.modalDialogAdapter.createDialog(
            '/templates/accountDetails/accountEdit.html',
            'AccountEditController',
            null,
            {
                accountId: function () {
                    return self.accountId;
                }
            },
            self.onEditAccountSubmit.bind(self),
            self.onEditAccountDismissed.bind(self));
    };

    AccountDetailsView.prototype.onEditAccountSubmit = function (accountId) {
        alert("Edit dialog closed with account Id: " + accountId);
    };

    AccountDetailsView.prototype.onEditAccountDismissed = function () {

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
        self.updateMap(data.contactInfo.latitude, data.contactInfo.longitude, data.name);
    };

    AccountDetailsView.prototype.updateMap = function (lat, long, accountName) {
        var self = this;
        var latLng = self.mapService.getLatLng(lat, long);

        var marker = self.mapService.createMarker({
            position: latLng,
            title: accountName
        });
        marker.setMap(self.data.map);
        self.data.map.setCenter(latLng);
    };

    AccountDetailsView.prototype.onFollowToggled = function () {
        var self = this;
        self.fn.loadAccountData();
    };

    AccountDetailsView.prototype.onAccountUpdated = function () {
        var self = this;
        self.fn.loadAccountData();
    };

    AccountDetailsView.newInstance = function (scope, modalService, model, presenter, mapService, popoverAdapter, $viewRepAspect, $logErrorAspect) {
        assertNotNull('modalService', modalService);

        model = model || AccountDetailsModel.newInstance();
        presenter = presenter || AccountDetailsPresenter.newInstance();
        mapService = mapService || GoogleMapService.newInstance();
        popoverAdapter = popoverAdapter || PopoverAdapter.newInstance();

        var view = new AccountDetailsView(scope, modalService, model, presenter, mapService, popoverAdapter);

        return view._injectAspects($viewRepAspect, $logErrorAspect);
    };

    return AccountDetailsView;
});