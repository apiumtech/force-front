define([
    'shared/BaseView',
    'shared/services/bus/ScrollEventBus',
    'jquery'
], function(BaseView, ScrollEventBus, $) {
    'use strict';

    function BaseLiteralsView($scope, $model, $presenter) {
        BaseView.call(this, $scope, $model, $presenter);
        this.disposer = null;
        this.data.currentError = null;
        this.isPagerActive = true;
        this.lastScrollY = 0;
        this.configureEvents();
    }

    BaseLiteralsView.inherits(BaseView, {});
    var proto = BaseLiteralsView.prototype;


    proto.configureEvents = function () {
        this.event.nextPage = function(){};
        this.event.onDisposing = function(){};
        ScrollEventBus.onScrolledToBottom(this.onPageScrolledToBottom.bind(this));
        this.disposer = this.$scope.$on("$destroy", this.onDisposing.bind(this));
    };


    proto.onDisposing = function () {
        this.event.onDisposing();
        ScrollEventBus.dispose();
        this.disposer();
        this.resetScrollState();
    };


    proto.showError = function (msg) {
        this.data.currentError = msg;
    };

    proto.onPageScrolledToBottom = function () {
        if(this.isPagerActive){
            this.event.nextPage();
        }
    };

    proto.resetScrollState = function () {
        $('body').css('min-height', 0);
        $('html, body').scrollTop( 0 );
    };

    proto.saveScrollState = function () {
        this.lastScrollY = $(document).scrollTop();
        $('body').css('min-height', $(document).height()+"px");
        this.isPagerActive = false;
    };

    proto.setScrollState = function () {
        var self = this;
        setTimeout(function(){
            self.isPagerActive = true;
        }, 1000);
        $('html, body').scrollTop( this.lastScrollY - 15 );
    };

    proto.onLiteralsRequest = function(){
        this.saveScrollState();
    };

    proto.onLiteralsRequestSuccess = function(){
        this.setScrollState();
    };

    return BaseLiteralsView;
});