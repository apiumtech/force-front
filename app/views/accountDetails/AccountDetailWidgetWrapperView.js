/**
 * Created by justin on 3/13/15.
 */
app.registerView(function (container) {
    var BaseView = container.getView('views/BaseView');

    function AccountDetailWidgetWrapperView($scope, $element) {
        $scope = $scope || {
            $on: function () {
            }
        };

        BaseView.call(this, $scope);
        this.element = $element || {};

        this.configureEvents.call(this);
    }

    AccountDetailWidgetWrapperView.prototype = Object.create(BaseView.prototype, {
        isExpanded: {
            get: function () {
                return this.$scope.isExpanded || (this.$scope.isExpanded = false);
            },
            set: function (value) {
                this.$scope.isExpanded = value;
            }
        },
        isLoading: {
            get: function () {
                return this.$scope.isLoading || (this.$scope.isLoading = false);
            },
            set: function (value) {
                this.$scope.isLoading = value;
            }
        },
        hasError: {
            get: function () {
                return this.$scope.hasError || (this.$scope.hasError = false);
            },
            set: function (value) {
                this.$scope.hasError = value;
            }
        },
        errorMessage: {
            get: function () {
                return this.$scope.errorMessage || (this.$scope.errorMessage = "");
            },
            set: function (value) {
                this.$scope.errorMessage = value;
            }
        },
        widgetTitle: {
            get: function () {
                return this.$scope.widgetTitle || (this.$scope.widgetTitle = "");
            },
            set: function (value) {
                this.$scope.widgetTitle = value;
            }
        }
    });

    AccountDetailWidgetWrapperView.prototype.configureEvents = function () {
        var self = this;

        self.fn.toggleCollapsePanel = function () {
            self.element.find('.panel-body').slideToggle();
        };

        self.fn.expandPanel = function () {
            self.isExpanded = !self.isExpanded;
        };

        self.fn.reloadPanel = function () {
            self.isLoading = true;
            self.$scope.eventBusChannel.onReloadCompleteSignalReceived(self.onReloadCompleteSignalReceived.bind(self));
            self.$scope.eventBusChannel.sendReloadSignal();
        };

        self.fn.closeWidget = function () {
            self.element.remove();
        };
    };

    AccountDetailWidgetWrapperView.prototype.onReloadCompleteSignalReceived = function () {
        var self = this;
        self.isLoading = false;
    };

    AccountDetailWidgetWrapperView.newInstance = function ($scope, $element, $viewRepaintAspect, $logErrorAspect) {
        var view = new AccountDetailWidgetWrapperView($scope, $element);
        return view._injectAspects($viewRepaintAspect, $logErrorAspect);
    };

    return AccountDetailWidgetWrapperView;
});