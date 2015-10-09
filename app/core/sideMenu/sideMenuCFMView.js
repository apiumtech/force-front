define([
	'shared/BaseView',
	'shared/AppsAdapter',
	'core/sideMenu/SideMenuCFMModel',
	'core/sideMenu/SideMenuCFMPresenter',
	'jquery'
], function (BaseView, AppsAdapter, SideMenuCFMModel, SideMenuCFMPresenter, $) {
	'use strict';
	
	function SideMenuCFMView($scope, $model, $presenter, $window) {
		BaseView.call(this, $scope, $model, $presenter);
		this.$window = $window;
		
		this.configureData();
		this.configureEvents();
	};
	
	SideMenuCFMView.inherits(BaseView);
	
	SideMenuCFMView.prototype.configureData = function () {
		this.data.currentErorr = "";
		this.data.userSections = [];
	};
	
	SideMenuCFMView.prototype.configureEvents = function () {
		this.fn.getSideMenuTemplateName = this.getSideMenuTemplateName.bind(this);
		this.fn.onInit = this.onInit.bind(this);
		this.fn.adjustLinkToParentFolder = this.adjustLinkToParentFolder.bind(this);
		// this.fn.doPorofileMenuAction = this.doProfileMenuAction.bind(this);
		this.fn.checkIfActiveMenu = this.checkIfActiveMenu.bind(this);
		
		this.event.getUserDataInfo = function () {};
		this.event.getUserSections = function () {};
	};
	
	SideMenuCFMView.prototype.onInit = function () {
		$('.content').addClass('with-cfm-menu');
		$('#page-container').removeClass('page-without-sidebar');
		$('#page-container').addClass('page-sidebar-fixed');
		this.event.getUserDataInfo();
	};
	
	SideMenuCFMView.prototype.onGetUserDataInfo = function () {
		this.data.userSections = this.event.getUserSections();
		this.$scope.$digest();
		AppsAdapter.initSideBar();
	};
	
	SideMenuCFMView.prototype.onGetUserDataInfoError = function (error) {
		this.data.currentError = error;
	};
	
	// SideMenuCFMView.prototype.doProfileMenuAction = function (id, linkToGo, target) {
	// 	console.log(id, linkToGo, target);
	// };
	
    SideMenuCFMView.prototype.adjustLinkToParentFolder = function (url) {
        if (url === undefined) return '';
		else if (url.indexOf('web3/index.html#') > -1 ) {
			return url;
		}
        else return '/web/views/specific/' + url;
    };
	
	SideMenuCFMView.prototype.getSideMenuTemplateName = function () {
		return 'sideMenuCFM';
	};
	
	SideMenuCFMView.prototype.checkIfActiveMenu = function (menu) {
		var whereIAm = this.$window.location.href.split('#')[1];
		// if (whereIAm[0] === '/') whereIAm = whereIAm.slice(1);
		return whereIAm.indexOf(menu.toLowerCase()) > -1;
	};
	
	SideMenuCFMView.newInstance = function ($scope, $model, $presenter, $window, $viewRepAspect, $logErrorAspect) {
		var scope = $scope || {};
		var model = $model || SideMenuCFMModel.newInstance();
		var presenter = $presenter || SideMenuCFMPresenter.newInstance();
		$window = $window || document.window;
		var view = new SideMenuCFMView(scope, model, presenter, $window);
		
		return view._injectAspects($viewRepAspect, $logErrorAspect);
	};
	
	return {newInstance: SideMenuCFMView.newInstance};
});