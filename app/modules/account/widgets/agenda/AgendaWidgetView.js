/**
 * Created by justin on 3/13/15.
 */
define([
    'shared/BaseView',
    'shared/services/bus/AccountDetailWidgetEventBus',
    'modules/account/widgets/agenda/AgendaWidgetPresenter',
    'shared/services/ModalDialogAdapter'
], function (BaseView, AccountDetailWidgetEventBus, AgendaWidgetPresenter, ModalDialogAdapter) {

    function AgendaWidgetView($scope, $element, $presenter, modalDialogAdapter) {
        $presenter = $presenter || new AgendaWidgetPresenter();
        BaseView.call(this, $scope, null, $presenter);
        this.modalDialogAdapter = modalDialogAdapter || new ModalDialogAdapter($scope.$modal);
        this.modalService = $scope.$modal;
        this.$element = $element;
        this.configureEvents();
    }

    AgendaWidgetView.inherits(BaseView, {
        accountId: {
            get: function () {
                return this.$scope.accountId;
            },
            set: function (value) {
                this.$scope.accountId = value;
            }
        },
        agendaList: {
            get: function () {
                return this.$scope.agendaList || (this.$scope.agendaList = []);
            },
            set: function (value) {
                this.$scope.agendaList = value;
            }
        },
        eventChannel: {
            get: function () {
                return this.$scope.eventChannel || (this.$scope.eventChannel = AccountDetailWidgetEventBus.newInstance());
            },
            set: function (value) {
                this.$scope.eventChannel = value;
            }
        }
    });

    AgendaWidgetView.prototype._show = BaseView.prototype.show;
    AgendaWidgetView.prototype.show = function () {
        this._show();
    };

    AgendaWidgetView.prototype.configureEvents = function () {
        var self = this;
        var scope = self.$scope;

        self.eventChannel.onReloadCommandReceived(self.onReloadCommandReceived.bind(self));

        self.fn.addEvent = function(type){
            console.log("should open with", type);
            var paramDialog = self.modalService.open({
                templateUrl: 'app/modules/account/widgets/agenda/addEventDialog/addEventDialog.html',
                backdrop: 'static',
                keyboard: false,
                controller: 'AddEventDialogController',
                resolve: {
                    eventType: function () {
                        return type
                    }
                }
            });

            paramDialog.result.then(self.event.onAddEvent.bind(self), function () {
            });
        };

        scope.$watch('accountId', self.onAccountIdChanged.bind(self));
        scope.$on("$destroy", self.onDisposing.bind(self));
    };

    AgendaWidgetView.prototype.onEventAdded = function(event){
        var self = this;
        self.eventChannel.sendReloadCommand();
        var message = self.generateSuccessMessage("Event " + event.title + " has been created successfully");
        self.modalDialogAdapter.notify('', message);
    };

    AgendaWidgetView.prototype.onAccountIdChanged = function () {
        var self = this;
        if (self.accountId) {
            self.eventChannel.sendReloadCommand();
        }
    };

    AgendaWidgetView.prototype.loadAgendaData = function () {
        var self = this;

        self.event.onLoadAgenda(self.accountId);
    };

    AgendaWidgetView.prototype.onReloadCommandReceived = function () {
        var self = this;
        self.loadAgendaData();
    };

    AgendaWidgetView.prototype.onAgendaLoaded = function (data) {
        var self = this;
        self.eventChannel.sendReloadCompleteCommand();
        self.decorateActivityData(data);
    };

    AgendaWidgetView.prototype.decorateActivityData = function (data) {
        var self = this;
        self.agendaList = data;
    };

    AgendaWidgetView.prototype.onDisposing = function () {
        var self = this;
        self.eventChannel.unsubscribeReloadCommand();
        self.eventChannel.unsubscribeReloadCompleteCommand();
        self.eventChannel = null;
    };

    AgendaWidgetView.newInstance = function ($scope, $element, $presenter, $viewRepaintAspect, $logErrorAspect) {
        var view = new AgendaWidgetView($scope, $element);
        return view._injectAspects($viewRepaintAspect, $logErrorAspect);
    };

    return AgendaWidgetView;
});