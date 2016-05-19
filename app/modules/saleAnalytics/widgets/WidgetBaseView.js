/**
 * Created by justin on 12/22/14.
 */
define([
    'shared/BaseView',
    'meld',
    'modules/saleAnalytics/eventBus/SalesAnalyticsFilterChannel',
    'shared/services/TranslatorService',
    'jquery',
    // TODO: This is deprecated
    'modules/saleAnalytics/eventBus/WidgetEventBus'
], function (BaseView, meld, SalesAnalyticsFilterChannel, TranslatorService, $, /*TODO: this is deprecated*/WidgetEventBus) {
    'use strict';

    function WidgetBaseView(scope, element, presenter) {
        BaseView.call(this, scope, null, presenter);
        this.translator = TranslatorService.newInstance();
        this.element = element || {};
        this.filterChannel = SalesAnalyticsFilterChannel.newInstance("WidgetDecoratedPage");

        var self = this;
        this.event.onDateFilterApplied = function (filterValue) {
            //throw new Error("NotImplementedException");
        };
        this.event.onUsersFilterApplied = function (filterValue) {
            //throw new Error("NotImplementedException");
        };

        self.fn.reloadPanel = function () {
            self.sendReloadCommandToChannel();
        };

        this.data.serverError = false;

        this.channelInitialized = false;

        // TODO: This is deprecated
        scope.$watch('widget', this.initializeWidgetChannel.bind(this));
        scope.$on('$destroy', this.unbindEventChannelEventListeners.bind(this));


        meld.after(self, 'onReloadWidgetSuccess', function () {
            self._onReloadWidgetSuccess.call(self);
            self.applyWidgetDescription();
        });
    }


    WidgetBaseView.inherits(BaseView, {
        widget: {
            get: function () {
                return this.$scope.widget;
            },
            set: function (value) {
                this.$scope.widget = value;
            }
        }
    });

    WidgetBaseView.prototype.applyWidgetDescription = function () {
        $('.row.panel-description .well > div').readmore({
            collapsedHeight: 20,
            speed: 1000,
            moreLink: '<a class="show-more-link" href="#">'+ this.translator.translate('action_show_more') +'</a>',
            lessLink: '<a class="show-more-link" href="#">'+ this.translator.translate('action_close') +'</a>'
        });
    };

    WidgetBaseView.prototype.resizeHandling = function () {
        var self = this;
        var resizeInterval;
        $(window).resize(function(){
            clearTimeout(resizeInterval);
            resizeInterval = setTimeout( self.reDraw.bind(self), 250+Math.random()*100 );
        });
        self.$scope.$on('destroy', function () {
            $(window).unbind('resize', self.reDraw.bind(self));
        });
    };

    WidgetBaseView.prototype.initializeWidgetChannel = function () {
        if (this.widget && !this.channelInitialized) {
            this.channelInitialized = true;
            this.presenter.widgetEventChannel = this._getWidgetChannelInstance(this.widget.widgetType + "||" + this.widget.widgetId);
        }
    };

    WidgetBaseView.prototype.sendReloadCommandToChannel = function () {
        this.eventChannel.sendReloadCommand();
    };

    WidgetBaseView.prototype.unbindEventChannelEventListeners = function () {
      try{
        this.eventChannel.unsubscribeReloadCommand();
        this.eventChannel.unsubscribeReloadCompleteCommand();
      }catch(err){}
    };

    WidgetBaseView.prototype.onReloadCommandReceived = function () {
        this.data.serverError = false;
        this.event.onReloading();
    };

    WidgetBaseView.prototype.__show = BaseView.prototype.show;
    WidgetBaseView.prototype.show = function () {
        this.__show.call(this);

        var self = this;

        self.filterChannel.onDateFilterApplySignalReceived(function (filterValue) {
            self.event.onDateFilterApplied(filterValue);
        });

        self.filterChannel.onUserFilterApplySignalReceived(function (filterValue) {
            self.event.onUsersFilterApplied(filterValue);
        });
    };

    WidgetBaseView.prototype._getWidgetChannelInstance = function (widgetName) {
        return WidgetEventBus.newInstance(widgetName);
    };

    // abstract method
    WidgetBaseView.prototype.onReloadWidgetSuccess = function () {
        throw new Error("NotImplementedException");
    };

    WidgetBaseView.prototype._onReloadWidgetSuccess = function () {
        this.eventChannel.sendReloadCompleteCommand();
    };

    WidgetBaseView.prototype.onReloadWidgetError = function (error) {
        var self = this;
        var errorTitle = self.translator.translate("Errors.GeneralServerError.Title");
        var errorMessage = self.translator.translate("Errors.GeneralServerError.Message");
        this.data.serverError = true;
        this.data.serverErrorTitle = errorTitle;
        this.data.serverErrorMessage = errorMessage;

        self.eventChannel.sendReloadCompleteCommand(errorMessage);
    };

    return WidgetBaseView;
});
