/**
 * Created by justin on 3/13/15.
 */
app.registerView(function (container) {
    var BaseView = container.getView('views/BaseView');
    var WidgetEventBus = container.getService('services/bus/WidgetEventBus');

    function ActivityWidgetView($scope, $element, $model, $presenter) {
        BaseView.call(this, $scope, $element, $model, $presenter);
        this.configureEvents();
    }

    ActivityWidgetView.prototype = Object.create(BaseView.prototype, {
        accountId: {
            get: function () {
                return this.$scope.accountId;
            },
            set: function (value) {
                this.$scope.accountId = value;
            }
        },
        eventChannel: {
            get: function () {
                return this.$scope.eventChannel || ( this.$scope.eventChannel = WidgetEventBus.newInstance("activityWidget").getOrElse(throwInstantiateException(WidgetEventBus)));
            },
            set: function (value) {
                this.$scope.eventChannel = value;
            }
        }
    });

    ActivityWidgetView.prototype.configureEvents = function () {
        var self = this;
        var scope = self.$scope;

        self.eventChannel.onReloadSignalReceived(self.onReloadCommandReceived.bind(self));

        self.fn.loadActivityData = function (accountId) {
            console.log(accountId);
        };

        scope.$watch('accountId', self.onAccountIdChanged.bind(self));
    };

    ActivityWidgetView.prototype.onAccountIdChanged = function () {
        var self = this;
        if (self.accountId)
            self.fn.loadActivityData(self.accountId);
    };

    ActivityWidgetView.prototype.onReloadCommandReceived = function () {
        var self = this;

        setTimeout(self.onActivityLoaded.bind(self), 5000);
    };

    ActivityWidgetView.prototype.onActivityLoaded = function () {
        var self = this;
        self.eventChannel.sendReloadCompleteSignal();
    };

    ActivityWidgetView.newInstance = function ($scope, $element, $model, $presenter, $logErrorAspect) {
        var view = new ActivityWidgetView($scope, $element, $model, $presenter);
        return view._injectAspects(false, $logErrorAspect);
    };

    return ActivityWidgetView;
});