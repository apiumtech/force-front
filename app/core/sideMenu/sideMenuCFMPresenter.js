define([], function () {
	'use strict';
	
	function SideMenuCFMPresenter () {}
		
	SideMenuCFMPresenter.prototype.show = function (view, model) {
		view.event.getUserSections = function () {
			return model.getUserSections();
		}
		
		view.event.getUserDataInfo = function () {
			model.getUserDataInfo().then(
				view.onGetUserDataInfo.bind(view),
				view.onGetUserDataInfoError.bind(view)					
			);
		};
		
		view.event.logout = function () {
			model.logout().then(
				view.onLogout.bind(view),
				view.onLogoutError.bind(view)
			);
		}
	};
	
	SideMenuCFMPresenter.newInstance = function () {
		return new SideMenuCFMPresenter();
	};
	
	return {newInstance: SideMenuCFMPresenter.newInstance};
});