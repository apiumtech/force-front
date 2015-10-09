define([
	'core/sideMenu/SideMenuCFMView'
], function (SideMenuCFMView) {
	'use strict';
	
	function SideMenuView ($window) {
		this.$window = $window;
		
		this.CFMUrls = [
            "127.0.0.1",
            "cfm.forcemanager.net",
            "cfmpre.forcemanager.net",
            "cfmsta.forcemanager.net"
        ];
	};
	
	SideMenuView.inherits(Object, {});
	
	SideMenuView.prototype.inCFM = function () {
        var self = this;
        var isCFM = this.CFMUrls.filter(function (item) {
            var found = self.$window.location.href.indexOf(item) > -1;
            return found;
        }).length > 0;
        return isCFM;
    };
	
	SideMenuView.prototype.getViewImpl = function (scope, window) {
        return SideMenuCFMView.newInstance(scope, null, null, window);
    };
    
    SideMenuView.newInstance = function ($scope, $window) {
        var scope = $scope || {};
        var proxy = new SideMenuView($window);
        var viewImpl = proxy.getViewImpl(scope, $window);
        return viewImpl;
    };

    return SideMenuView;
});