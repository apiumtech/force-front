/**
 * Created by justin on 3/13/15.
 */
app.registerView(function (container) {
    var BaseView = container.getView('views/BaseView');
    var AccountDetailWidgetEventBus = container.getService('services/bus/AccountDetailWidgetEventBus'),
        AgendaWidgetModel = container.getModel('models/accountDetails/AgendaWidgetModel'),
        AgendaWidgetPresenter = container.getPresenter('presenters/accountDetails/AgendaWidgetPresenter');

    function AgendaWidgetView($scope, $element, $model, $presenter) {
        BaseView.call(this, $scope, $model, $presenter);
        this.$element = $element;
    }

    AgendaWidgetView.prototype = Object.create(BaseView.prototype, {
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
                return this.$scope.eventChannel || ( this.$scope.eventChannel = AccountDetailWidgetEventBus.newInstance().getOrElse(throwInstantiateException(AccountDetailWidgetEventBus)));
            },
            set: function (value) {
                this.$scope.eventChannel = value;
            }
        }
    });

    AgendaWidgetView.prototype._show = BaseView.prototype.show;
    AgendaWidgetView.prototype.show = function () {
        this._show();
        this.configureEvents();
    };

    AgendaWidgetView.prototype.configureEvents = function () {
        var self = this;
        var scope = self.$scope;

        self.eventChannel.onReloadCommandReceived(self.onReloadCommandReceived.bind(self));

        scope.$watch('accountId', self.onAccountIdChanged.bind(self));
        scope.$on("$destroy", self.onDisposing.bind(self));
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

    AgendaWidgetView.newInstance = function ($scope, $element, $model, $presenter, $viewRepaintAspect, $logErrorAspect) {
        $model = $model || AgendaWidgetModel.newInstance().getOrElse(throwInstantiateException(AgendaWidgetModel));
        $presenter = $presenter || AgendaWidgetPresenter.newInstance().getOrElse(throwInstantiateException(AgendaWidgetPresenter));
        var view = new AgendaWidgetView($scope, $element, $model, $presenter);
        return view._injectAspects($viewRepaintAspect, $logErrorAspect);
    };

    return AgendaWidgetView;
});