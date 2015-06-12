define([
    'shared/BaseView',
	'modules/literals/global/LiteralsPresenter',
	'modules/literals/global/LiteralsModel',
    'shared/services/bus/ScrollEventBus',
    'jquery'
], function(BaseView, LiteralsPresenter, LiteralsModel, ScrollEventBus, $) {
	'use strict';

	function LiteralsView($scope, $model, $presenter) {
		BaseView.call(this, $scope, $model, $presenter);
        this.disposer = null;
        this.data.currentError = null;
        this.isPagerActive = true;
        this.lastScrollY = 0;
        this.configureEvents();
	}

    LiteralsView.inherits(BaseView, {});
    var proto = LiteralsView.prototype;


    proto.configureEvents = function () {
        this.event.nextPage = function(){};
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

    proto.onLiteralsRequest = function(){
        this.lastScrollY = $(document).scrollTop();
        $('body').css('min-height', $(document).height()+"px");
        this.isPagerActive = false;
    };

    proto.onLiteralsRequestSuccess = function(){
        var self = this;
        setTimeout(function(){
            self.isPagerActive = true;
        }, 1000);
        $('html, body').scrollTop( this.lastScrollY - 15 );

    };

    proto.onPageScrolledToBottom = function () {
        if(this.isPagerActive){
            this.event.nextPage();
        }
    };


    LiteralsView.newInstance = function (namedParams) {
        var scope = namedParams.scope || {};
        var model = namedParams.model || LiteralsModel.newInstance();
        var presenter = namedParams.presenter || LiteralsPresenter.newInstance();
        var view = new LiteralsView(scope, model, presenter);

        return view._injectAspects(namedParams.viewRepAspect, namedParams.logErrorAspect);
    };

	return LiteralsView;
});