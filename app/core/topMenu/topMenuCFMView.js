define([
	'shared/BaseView',
	'core/topMenu/TopMenuCFMModel',
	'core/topMenu/TopMenuCFMPresenter',
	'jquery'
], function (BaseView, TopMenuCFMModel, TopMenuCFMPresenter, $) {
	'use strict';
	
	function TopMenuCFMView($scope, $model, $presenter, $window) {
		BaseView.call(this, $scope, $model, $presenter);
		this.$window = $window;
		
		this.configureData();
		this.configureEvents();
	};
	
	TopMenuCFMView.inherits(BaseView);
	
	TopMenuCFMView.prototype.configureData = function () {
		this.data.currentError = "";
        this.data.userSections = []; // userSections.sections
        this.data.userData = null; // userData
	};
	
	TopMenuCFMView.prototype.configureEvents = function () {
		this.fn.getMenuTemplateName = this.getMenuTemplateName.bind(this);
        this.fn.onInit = this.onInit.bind(this);
        this.fn.adjustLinkToParentFolder = this.adjustLinkToParentFolder.bind(this);
        // this.fn.doProfileMenuAction = this.doProfileMenuAction.bind(this);
		this.fn.onLogout = this.onLogout.bind(this);

        this.event.getUserDataInfo = function () {};
        this.event.getUserSections = function () {};
        this.event.getUserData = function () {};
        this.event.logout = function () {};
	};
	
	TopMenuCFMView.prototype.onInit = function () {
		$('.content').addClass('with-cfm-menu');
		this.event.getUserDataInfo();
	};
	
	TopMenuCFMView.prototype.onLogout = function () {
		//this.event.logout();
		this.$window.location.href = "/Login.aspx";
	};
	
	TopMenuCFMView.prototype.onLogoutError = function (error) {
		this.data.currentError = error;
	};
	
	TopMenuCFMView.prototype.onGetUserDataInfo = function () {
		this.data.userSections = this.event.getUserSections();
        this.data.userData = this.event.getUserData();
	};
	
	TopMenuCFMView.prototype.onGetUserDataInfoError = function (error) {
		this.data.currentError = error;
	};
	
	/*TopMenuCFMView.prototype.doProfileMenuAction = function (id, linkToGo, target) {
		if (id === 'logout') {
			this.event.logout();
		} else {
            if (target === '_blank') {
                this.$window.open(linkToGo, target);
            } else {
                this.$window.location.href = linkToGo;
            }
        }
	};*/
	
	TopMenuCFMView.prototype.adjustLinkToParentFolder = function (url) {
        return "../views/" + url;
    };
	
	TopMenuCFMView.prototype.getMenuTemplateName = function () {
		return 'topMenuCFM';
	};
	
	TopMenuCFMView.newInstance = function ($scope, $model, $presenter, $window, $viewRepAspect, $logErrorAspect) {
		var scope = $scope || {};
		var model = $model || TopMenuCFMModel.newInstance();
		var presenter = $presenter || TopMenuCFMPresenter.newInstance();
		$window = $window || document.window;
		var view = new TopMenuCFMView(scope, model, presenter, $window);
		
		return view._injectAspects($viewRepAspect, $logErrorAspect);
	};
	
	return {newInstance: TopMenuCFMView.newInstance};
});