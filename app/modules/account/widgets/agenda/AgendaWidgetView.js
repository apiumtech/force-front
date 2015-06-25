/**
 * Created by justin on 3/13/15.
 */
define([
    'shared/BaseView',
    'shared/services/bus/AccountDetailWidgetEventBus',
    'modules/account/widgets/agenda/AgendaWidgetPresenter',
    'shared/services/ModalDialogAdapter',
    'shared/services/FullCalendarService',
    'moment'
], function (BaseView, AccountDetailWidgetEventBus, AgendaWidgetPresenter, ModalDialogAdapter, FullCalendarService, moment) {

    function AgendaWidgetView($scope, $element, $presenter, modalDialogAdapter, calendarService) {
        $presenter = $presenter || new AgendaWidgetPresenter();
        BaseView.call(this, $scope, null, $presenter);
        this.modalDialogAdapter = modalDialogAdapter || new ModalDialogAdapter($scope.$modal);
        this.modalService = $scope.$modal;
        this.$element = $element;
        this.calendarService = calendarService || new FullCalendarService();
        this.selectedView = 'month';
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
                return this.$scope.agendaList;
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
        },
        selectedView: {
            get: function () {
                return this.$scope.selectedView;
            },
            set: function (value) {
                this.$scope.selectedView = value;
            }
        },
        currentDate: {
            get: function () {
                return this.$scope.currentDate;
            },
            set: function (value) {
                this.$scope.currentDate = value;
            }
        },
        selectedEvent: {
            get: function () {
                return this.$scope.selectedEvent;
            },
            set: function (value) {
                this.$scope.selectedEvent = value;
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

        self.fn.initCalendar = function () {
            var calendar = self.$element.find("#agenda-calendar");
            self.calendarService.initCalendar(calendar, true, true, 450);
            self.loadEvents();
        };

        self.fn.changeView = function () {
            self.calendarService.changeView(self.selectedView);
            self.updateCurrentDate();
        };

        self.fn.prev = function () {
            self.calendarService.prev();
            self.updateCurrentDate();
        };

        self.fn.next = function () {
            self.calendarService.next();
            self.updateCurrentDate();
        };

        self.fn.deleteEvent = function (event, title, message) {
            title = title || "Delete event";
            message = message || "Are you sure want to delete the event <b>" + event.title + "</b>?";
            self.modalDialogAdapter.confirm(title,
                message,
                self.event.onDeleteEvent.bind(self, event),
                doNothing,
                "Accept", "No, thanks");
        };

        $(document).bind('click', self.handleClickEvent.bind(self));

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

    AgendaWidgetView.prototype.onReloadCommandReceived = function () {
        var self = this;
        self.loadEvents();
    };

    AgendaWidgetView.prototype.onEventDeleted = function(event){
        var self = this;
        self.eventChannel.sendReloadCommand();
        var message = self.generateSuccessMessage("Event " + event.title + " has been deleted successfully");
        self.modalDialogAdapter.notify('', message);
    };

    AgendaWidgetView.prototype.handleClickEvent = function (event) {
        var self = this;
        $('.tooltip').hide();
        var target = $(event.target);
        var parents = target.parents();
        var expectedParent = null;
        for (var i = 0; i < parents.length; i++) {
            var p = parents[i];
            if ($(p).hasClass('agenda-event')) {
                expectedParent  = p;
                break;
            }
        };
        if (!expectedParent) return;
        self.selectEvent($(expectedParent).data('eventData'), target);
    };

    AgendaWidgetView.prototype.selectEvent = function(event, eventElement){
        var self = this;
        var position = eventElement.offset();
        var time = moment(event.start).format('MMMM Do YYYY, HH:mm');
        time += " - ";
        time += moment(event.end).format('HH:mm');

        self.selectedEvent = event;
        self.selectedEvent.time = time;

        $('#tooltip').css({
            top: position.top,
            left: position.left + 35
        }).appendTo("body").fadeIn(200);

        $('#tooltip').show();
    };

    AgendaWidgetView.prototype.updateCurrentDate = function () {
        var self = this;
        var moment = self.calendarService.getDate();
        switch (self.selectedView) {
            case 'agendaDay':
                self.currentDate = moment.format('MMMM Do YYYY');
                break;
            case 'agendaWeek':
                self.currentDate = moment.startOf('week').format('MMMM Do YYYY') + " - " + moment.endOf('week').format('MMMM Do YYYY');
                break;
            default:
                self.currentDate = moment.format('MMMM YYYY');
                break;
        }

        console.log("current date", self.currentDate);
    };

    AgendaWidgetView.prototype.loadEvents = function () {
        var self = this;
        console.log("start loading");
        self.event.onLoadEvents();
    };

    AgendaWidgetView.prototype.onEventsLoaded = function (events) {
        var self = this;
        console.log("finished loading", events);
        self.eventChannel.sendReloadCompleteCommand();
        self.events = events;
        self.calendarService.render(self.events);
        self.updateCurrentDate();
    };

    AgendaWidgetView.prototype.showError = function(error){
        console.error(error);
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