/**
 * Created by justin on 3/13/15.
 */
app.registerView(function (container) {
    var BaseView = container.getView('views/BaseView');

    function AccountDetailWidgetWrapperView($scope, $element) {
        $scope = $scope || {
            $on: function () {
            },
            $watch: function () {
            }
        };

        BaseView.call(this, $scope);
        this.element = $element || {};
        this.boundChannelEvent = false;

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
        },
        eventBusChannel: {
            get: function () {
                return this.$scope.eventBusChannel;
            },
            set: function (value) {
                this.$scope.eventBusChannel = value;
            }
        }
    });

    AccountDetailWidgetWrapperView.prototype.configureEvents = function () {
        var self = this,
            scope = this.$scope;

        self.fn.toggleCollapsePanel = function () {
            self.element.find('.panel-body').slideToggle();
        };

        self.fn.expandPanel = function () {
            self.isExpanded = !self.isExpanded;
        };

        self.fn.reloadPanel = function () {
            self.reloadPanel();
        };

        self.fn.closeWidget = function () {
            self.element.remove();
        };

        $('.panel-body', self.element).on('scroll', self.handleScroll.bind(self));
        scope.$watch('eventBusChannel', self.bindEventsToChannel.bind(self));
    };

    AccountDetailWidgetWrapperView.prototype.bindEventsToChannel = function () {
        var self = this;
        if (self.eventBusChannel && !self.boundChannelEvent) {
            self.eventBusChannel.onReloadCommandReceived(self.onReloadCommandReceived.bind(self));
            self.eventBusChannel.onReloadCompleteCommandReceived(self.onReloadCompleteCommandReceived.bind(self));
            self.boundChannelEvent = true;
        }
    };

    AccountDetailWidgetWrapperView.prototype.reloadPanel = function () {
        var self = this;
        self.eventBusChannel.sendReloadCommand(true);
    };

    AccountDetailWidgetWrapperView.prototype.handleScroll = function (event) {
        var offsetHeight = event.target.offsetHeight;
        var scrollTop = event.target.scrollTop;
        var scrollHeight = event.target.scrollHeight;

        if (this.$scope.foreverScroll && scrollTop + offsetHeight >= scrollHeight) {
            this.$scope.foreverScroll();
        }
    };

    AccountDetailWidgetWrapperView.prototype.onReloadCommandReceived = function () {
        var self = this;
        self.isLoading = true;
    };

    AccountDetailWidgetWrapperView.prototype.onReloadCompleteCommandReceived = function () {
        var self = this;
        self.isLoading = false;
    };

    AccountDetailWidgetWrapperView.newInstance = function ($scope, $element, $viewRepaintAspect, $logErrorAspect) {
        var view = new AccountDetailWidgetWrapperView($scope, $element);
        return view._injectAspects($viewRepaintAspect, $logErrorAspect);
    };

    return AccountDetailWidgetWrapperView;
});