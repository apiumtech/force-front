/**
 * Created by justin on 5/2/15.
 */
define([
    'angular',
    'base/BaseView'
], function (angular, BaseView) {
    'use strict';

    function NavItemView($rootScope, $scope, $location) {
        BaseView.call(this, $scope);
        this.$rootScope = $rootScope;
        this.$location = $location;

        $scope.isChild = false;
        $scope.active = false;

        $scope.hasIcon = angular.isDefined($scope.icon);
        $scope.hasIconCaption = angular.isDefined($scope.iconCaption);
    }

    NavItemView.prototype = Object.create(BaseView.prototype);

    NavItemView.prototype.isActive = function (viewLocation) {
        this.$scope.active = viewLocation === this.$location.path();
        return this.$scope.active;
    };

    NavItemView.prototype.getItemUrl = function (view) {
        var $scope = this.$scope;
        if (angular.isDefined($scope.href)) return $scope.href;
        if (!angular.isDefined(view)) return '';
        return '#' + view;
    };

    NavItemView.prototype.getItemTarget = function () {
        var $scope = this.$scope;
        return angular.isDefined($scope.target) ? $scope.target : '_self';
    };

    return NavItemView;
});