define([
    'app',
    'core/topMenu/TopMenuWeb4View'
], function (app, TopMenuWeb4View) {
    'use strict';

    function TopMenuWeb4Controller($scope, $rootScope) {
        TopMenuWeb4Controller.configureView($scope, $rootScope);
    }

    TopMenuWeb4Controller.configureView = function ($scope, $rootScope) {
        this.view = TopMenuWeb4View.newInstance($scope, $rootScope);
        this.view.show();
    };

    app.register.controller('TopMenuWeb4Controller', ['$scope', '$rootScope', TopMenuWeb4Controller]);

    return TopMenuWeb4Controller;
});
