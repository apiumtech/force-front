/**
 * Created by justin on 5/1/15.
 */
define([
    'angular',
    'base/BaseView',
    '$'
], function (angular, BaseView, $) {
    'use strict';

    function NavGroupView($scope, $element) {
        BaseView.call(this, $scope);
        this.$element = $element;
        $scope.active = false;
        $scope.hasIcon = angular.isDefined($scope.icon);
        $scope.hasIconCaption = angular.isDefined($scope.iconCaption);
    }

    NavGroupView.prototype = Object.create(BaseView.prototype);

    NavGroupView.prototype.toggleChild = function () {
        this.$scope.showChild = !this.$scope.showChild;
    };

    NavGroupView.prototype.showChild = function () {
        this.$scope.showChild = true;
    };

    NavGroupView.prototype.checkChildActive = function () {
        return this.$scope.showChild || $('li.active', this.$element).length > 0;
    };

    NavGroupView.prototype.hideChild = function () {
        this.$scope.showChild = false;
    };

    return NavGroupView;
});