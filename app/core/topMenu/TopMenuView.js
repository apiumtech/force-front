/**
 * Created by joanllenas on 4/21/15.
 */

define([
    'core/topMenu/TopMenuWeb2View',
    'core/topMenu/TopMenuWeb3View'
], function (TopMenuWeb2View, TopMenuWeb3View) {
    'use strict';

    function TopMenuView($window) {
        this.$window = $window;

        this.web3Urls = [
            /*"localhost",
            "127.0.0.1",
            "54.171.216.35"*/
        ];
    }

    TopMenuView.prototype = Object.create(Object.prototype, {});

    TopMenuView.prototype.inWeb3 = function () {
        var self = this;
        var isWeb3 = this.web3Urls.filter(function (item) {
                var found = self.$window.location.href.indexOf(item) > -1;
                return found;
            }).length > 0;
        return isWeb3;
    };

    TopMenuView.prototype.getViewImpl = function (scope) {
        return this.inWeb3() ? TopMenuWeb3View.newInstance(scope) : TopMenuWeb2View.newInstance(scope, null, null, this.$window);
    };


    TopMenuView.newInstance = function ($scope, $window) {
        var scope = $scope || {};
        var proxy = new TopMenuView($window);
        var viewImpl = proxy.getViewImpl(scope);
        return viewImpl;
    };

    return TopMenuView;
});
