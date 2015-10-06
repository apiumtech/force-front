define([
    'shared/BaseView',
    'shared/services/bus/ScrollEventBus',
    'config'
], function(BaseView, ScrollEventBus, config) {
    'use strict';

    function BaseLiteralsView($scope, $model, $presenter) {
        BaseView.call(this, $scope, $model, $presenter);
        this.disposer = null;
        this.data.currentError = null;
        this.isPagerActive = true;
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
    };


    proto.showError = function (msg) {
        this.data.currentError = msg;
    };


    proto.onPageScrolledToBottom = function () {
        if(this.isPagerActive){
            this.event.nextPage();
        }
    };


    proto.onLiteralsRequest = function(data){
        this.isPagerActive = false;
    };


    proto.onLiteralsRequestSuccess = function(result){
        if(result.data.length >= config.pageSize){
            this.isPagerActive = true;
        }
    };

    return BaseLiteralsView;
});