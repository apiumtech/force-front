define([
    'app',
    'core/topMenu/TopMenuWeb4View'
], function (app, TopMenuWeb4View) {
    'use strict';

    function TopMenuWeb4Controller($scope) {
        TopMenuWeb4Controller.configureView($scope);
    }

    TopMenuWeb4Controller.configureView = function ($scope) {
        this.view = TopMenuWeb4View.newInstance($scope);
        this.view.show();
    };

    app.register.controller('TopMenuWeb4Controller', ['$scope', TopMenuWeb4Controller]);

    return TopMenuWeb4Controller;
});
