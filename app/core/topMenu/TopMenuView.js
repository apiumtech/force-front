/**
 * Created by joanllenas on 4/21/15.
 */

define([
    'core/topMenu/TopMenuWeb2View',
    'core/topMenu/TopMenuWeb3View',
    'core/topMenu/TopMenuCFMView'
], function (TopMenuWeb2View, TopMenuWeb3View, TopMenuCFMView) {
    'use strict';

    function TopMenuView ($window) {
        this.$window = $window;

        this.web3Urls = [
            //"localhost",
            //"127.0.0.1",
            //"54.171.216.35"
        ];
        
        this.CFMUrls = [
            "127.0.0.1",
            "cfm.forcemanager.net",
            "cfmpre.forcemanager.net",
            "cfmsta.forcemanager.net"
        ];
    }

    TopMenuView.inherits(Object, {});

    TopMenuView.prototype.inWeb3 = function () {
        var self = this;
        var isWeb3 = this.web3Urls.filter(function (item) {
                var found = self.$window.location.href.indexOf(item) > -1;
                return found;
            }).length > 0;
        return isWeb3;
    };
    
    TopMenuView.prototype.inCFM = function () {
        var self = this;
        var isCFM = this.CFMUrls.filter(function (item) {
            var found = self.$window.location.href.indexOf(item) > -1;
            return found;
        }).length > 0;
        return isCFM;
    }

    TopMenuView.prototype.getViewImpl = function (scope) {
        //return this.inWeb3() ? TopMenuWeb3View.newInstance(scope) : TopMenuWeb2View.newInstance(scope, null, null, this.$window);
        if (this.inWeb3()) {
            return TopMenuWeb3View.newInstance(scope);
        }
        else if (this.inCFM()) {
            return TopMenuCFMView.newInstance(scope, null, null, this.$window);
        }
        else {
            return TopMenuWeb2View.newInstance(scope, null, null, this.$window);
        }
    };


    TopMenuView.newInstance = function ($scope, $window) {
        var scope = $scope || {};
        var proxy = new TopMenuView($window);
        var viewImpl = proxy.getViewImpl(scope);
        return viewImpl;
    };

    return TopMenuView;
});
