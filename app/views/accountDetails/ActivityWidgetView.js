/**
 * Created by justin on 3/13/15.
 */
app.registerView(function (container) {
    var BaseView = container.getView('views/BaseView');
    var WidgetEventBus = container.getService('services/bus/WidgetEventBus'),
        ActivityWidgetModel = container.getModel('models/accountDetails/ActivityWidgetModel'),
        ActivityWidgetPresenter = container.getPresenter('presenters/accountDetails/ActivityWidgetPresenter'),
        DateTimeDecoratorService = container.getService('services/DateTimeDecoratorService');

    function ActivityWidgetView($scope, $element, $model, $presenter) {
        BaseView.call(this, $scope, $model, $presenter);
        this.$element = $element;
        this.currentPage = -1;
        this.isLastPage = false;
        this.nextPage = false;
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

    ActivityWidgetView.prototype._show = BaseView.prototype.show;
    ActivityWidgetView.prototype.show = function () {
        this._show();
        this.configureEvents();
    };

    ActivityWidgetView.prototype.configureEvents = function () {
        var self = this;
        var scope = self.$scope;

        self.eventChannel.onReloadSignalReceived(self.onReloadCommandReceived.bind(self));

        self.fn.requestNextPage = function () {
            if (self.isLastPage) return;

            self.nextPage = true;
            self.eventChannel.sendReloadSignal();
        };

        scope.$watch('accountId', self.onAccountIdChanged.bind(self));
    };

    ActivityWidgetView.prototype.onAccountIdChanged = function () {
        var self = this;
        if (self.accountId) {
            self.nextPage = true;
            self.eventChannel.sendReloadSignal();
        }
    };

    ActivityWidgetView.prototype.loadActivityData = function () {
        var self = this;

        if (self.nextPage) {
            self.currentPage = self.currentPage + 1;
            self.nextPage = false;
        }

        self.event.onLoadActivity(self.accountId, self.currentPage);
    };

    ActivityWidgetView.prototype.onReloadCommandReceived = function () {
        var self = this;
        self.loadActivityData();
    };

    ActivityWidgetView.prototype.onActivityLoaded = function (data) {
        var self = this;
        self.eventChannel.sendReloadCompleteSignal();
        self.data = data;
        if (!data.length) {
            self.isLastPage = true;
        }
    };

    ActivityWidgetView.newInstance = function ($scope, $element, $model, $presenter, $viewRepaintAspect, $logErrorAspect) {
        $model = $model || ActivityWidgetModel.newInstance().getOrElse(throwInstantiateException(ActivityWidgetModel));
        $presenter = $presenter || ActivityWidgetPresenter.newInstance().getOrElse(throwInstantiateException(ActivityWidgetPresenter));
        var view = new ActivityWidgetView($scope, $element, $model, $presenter);
        return view._injectAspects($viewRepaintAspect, $logErrorAspect);
    };

    return ActivityWidgetView;
});