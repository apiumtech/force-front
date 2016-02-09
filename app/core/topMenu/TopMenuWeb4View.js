define([
    'shared/BaseView'
], function (BaseView) {
    'use strict';

    function TopMenuWeb4View($scope) {
        BaseView.call(this, $scope);

        this.configureEvents();
    }


    TopMenuWeb4View.inherits(BaseView);

    TopMenuWeb4View.prototype.configureEvents = function () {
        this.fn.getMenuTemplateName = this.getMenuTemplateName.bind(this);
        this.fn.onInit = this.onInit.bind(this);
    };

    TopMenuWeb4View.prototype.onInit = function () {
    };

    TopMenuWeb4View.prototype.getMenuTemplateName = function () {
        return 'topMenuWeb4';
    };

    TopMenuWeb4View.newInstance = function ($scope) {
        var scope = $scope || {};
        var view = new TopMenuWeb4View(scope);

        return view._injectAspects();
    };


    return TopMenuWeb4View;
});