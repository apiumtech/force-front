/**
 * Created by justin on 3/13/15.
 */

define([
    'shared/BaseView',
    'jquery',
    'modules/widgets/WidgetEventBus'
], function (BaseView, $, SaleAnalyticEventBus) {
    'use strict';

    function WidgetWrapperView($scope, $element) {
        $scope = $scope || {
                $on: function () {
                },
                $watch: function () {
                }
            };

        BaseView.call(this, $scope);
        this.element = $element || {};
        this.boundChannelEvent = false;
        this.saleAnalyticEventBus = SaleAnalyticEventBus.getInstance();
        this.configureEvents.call(this);
    }

    WidgetWrapperView.inherits(BaseView, {
        isExpanded: {
            get: function () {
                return this.$scope.isExpanded || (this.$scope.isExpanded = false);
            },
            set: function (value) {
                this.$scope.isExpanded = value;
            }
        },
        isMinimized: {
            get: function () {
                return this.$scope.isMinimized || (this.$scope.isMinimized = false);
            },
            set: function (value) {
                this.$scope.isMinimized = value;
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
        },
        widgetId: {
            get: function () {
                return this.$scope.widgetId;
            },
            set: function (value) {
                this.$scope.widgetId = value;
            }
        },
        isClosable: {
            get: function () {
                return this.$scope.isClosable || (this.$scope.isClosable = false);
            },
            set: function (value) {
                this.$scope.isClosable = value;
            }
        }
    });

    WidgetWrapperView.prototype.configureEvents = function () {
        var self = this,
            scope = this.$scope;

        self.fn.toggleCollapsePanel = function () {
            self.isMinimized = !self.isMinimized;
            var body = self.element.find('.panel-body');
            body.slideToggle();
            if(self.isMinimized) {
                body.addClass('panel-is-minimized');
            } else {
                body.removeClass('panel-is-minimized');
            }
        };

        self.fn.expandPanel = function () {
            self.isExpanded = !self.isExpanded;
            if (self.isMinimized) {
                self.isMinimized = !self.isMinimized;
                self.element.find('.panel-body').slideToggle();
            }

            // sorry for this patch. I don't understand the "framework" :-)
            if (self.isExpanded) {
                $('body').css('overflow', 'hidden');
            }
            else {
                $('body').css('overflow', '');
            }
            self.eventBusChannel.sendExpandingWidget();
        };

        /*self.fn.reloadPanel = function () {
            self.reloadPanel();
        };*/

        self.fn.closeWidget = function () {
            self.element.remove();
            self.saleAnalyticEventBus.fireRemovingWidget(self.widgetId);
        };

        $('.panel-body', self.element).on('scroll', self.handleScroll.bind(self));
        scope.$watch('eventBusChannel', self.bindEventsToChannel.bind(self));
    };

    WidgetWrapperView.prototype.bindEventsToChannel = function () {
        var self = this;
        if (self.$scope.eventBusChannel && !self.boundChannelEvent) {
            self.$scope.eventBusChannel.onReloadCommandReceived(self.onReloadCommandReceived.bind(self));
            self.$scope.eventBusChannel.onReloadCompleteCommandReceived(self.onReloadCompleteCommandReceived.bind(self));
            self.$scope.boundChannelEvent = true;
            self.$scope.eventBusChannel.sendReloadCommand();
        }
    };

    /*WidgetWrapperView.prototype.reloadPanel = function () {
        var self = this;
        self.eventBusChannel.sendReloadCommand(true);
    };*/

    WidgetWrapperView.prototype.handleScroll = function (event) {
        var offsetHeight = event.target.offsetHeight;
        var scrollTop = event.target.scrollTop;
        var scrollHeight = event.target.scrollHeight;

        if (this.$scope.foreverScroll && scrollTop + offsetHeight >= scrollHeight) {
            this.$scope.foreverScroll();
        }
    };

    WidgetWrapperView.prototype.onReloadCommandReceived = function () {
        var self = this;
        self.$scope.isLoading = true;
    };

    WidgetWrapperView.prototype.onReloadCompleteCommandReceived = function (message) {
        var self = this;
        self.errorMessage = {
            title: "There has been an error",
            message: "Your data will be back soon"
        };
        self.hasError = !!message;
        self.isLoading = false;
    };

    WidgetWrapperView.newInstance = function ($scope, $element, $viewRepaintAspect, $logErrorAspect) {
        var view = new WidgetWrapperView($scope, $element);
        return view._injectAspects($viewRepaintAspect, $logErrorAspect);
    };

    return WidgetWrapperView;
});
