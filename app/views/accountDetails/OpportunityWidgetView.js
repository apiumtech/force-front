/**
 * Created by justin on 3/13/15.
 */
app.registerView(function (container) {
    var BaseView = container.getView('views/BaseView');
    var AccountDetailWidgetEventBus = container.getService('services/bus/AccountDetailWidgetEventBus'),
        OpportunityWidgetModel = container.getModel('models/accountDetails/OpportunityWidgetModel'),
        OpportunityWidgetPresenter = container.getPresenter('presenters/accountDetails/OpportunityWidgetPresenter');

    function OpportunityWidgetView($scope, $element, $model, $presenter) {
        BaseView.call(this, $scope, $model, $presenter);
        this.$element = $element;
    }

    OpportunityWidgetView.prototype = Object.create(BaseView.prototype, {
        accountId: {
            get: function () {
                return this.$scope.accountId;
            },
            set: function (value) {
                this.$scope.accountId = value;
            }
        },
        opportunitiesList: {
            get: function () {
                return this.$scope.opportunitiesList || (this.$scope.opportunitiesList = []);
            },
            set: function (value) {
                this.$scope.opportunitiesList = value;
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

    OpportunityWidgetView.prototype._show = BaseView.prototype.show;
    OpportunityWidgetView.prototype.show = function () {
        this._show();
        this.configureEvents();
    };

    OpportunityWidgetView.prototype.configureEvents = function () {
        var self = this;
        var scope = self.$scope;

        self.eventChannel.onReloadCommandReceived(self.onReloadCommandReceived.bind(self));

        scope.$watch('accountId', self.onAccountIdChanged.bind(self));
        scope.$on("$destroy", self.onDisposing.bind(self));
    };

    OpportunityWidgetView.prototype.onAccountIdChanged = function () {
        var self = this;
        if (self.accountId) {
            self.eventChannel.sendReloadCommand();
        }
    };

    OpportunityWidgetView.prototype.loadOpportunitiesData = function () {
        var self = this;

        self.event.onLoadOpportunities(self.accountId);
    };

    OpportunityWidgetView.prototype.onReloadCommandReceived = function () {
        var self = this;
        self.loadOpportunitiesData();
    };

    OpportunityWidgetView.prototype.onOpportunitiesLoaded = function (data) {
        var self = this;
        self.eventChannel.sendReloadCompleteCommand();
        self.decorateActivityData(data);
    };

    OpportunityWidgetView.prototype.decorateActivityData = function (data) {
        var self = this;
        self.opportunitiesList = data;
    };

    OpportunityWidgetView.prototype.onDisposing = function () {
        var self = this;
        self.eventChannel.unsubscribeReloadCommand();
        self.eventChannel.unsubscribeReloadCompleteCommand();
        self.eventChannel = null;
    };

    OpportunityWidgetView.newInstance = function ($scope, $element, $model, $presenter, $viewRepaintAspect, $logErrorAspect) {
        $model = $model || OpportunityWidgetModel.newInstance().getOrElse(throwInstantiateException(OpportunityWidgetModel));
        $presenter = $presenter || OpportunityWidgetPresenter.newInstance().getOrElse(throwInstantiateException(OpportunityWidgetPresenter));
        var view = new OpportunityWidgetView($scope, $element, $model, $presenter);
        return view._injectAspects($viewRepaintAspect, $logErrorAspect);
    };

    return OpportunityWidgetView;
});