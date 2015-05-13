/**
 * Created by justin on 5/1/15.
 */
define([
    'app',
    'sideBar/NavGroupController'
], function (app) {
    'use strict';

    app.register.directive('navGroup', function () {
        return {
            restrict: 'AE',
            controller: 'NavGroupController',
            transclude: true,
            replace: true,
            scope: {
                icon: '@',
                title: '@',
                iconCaption: '@',
                active: '=?'
            },
            template: '\
				<li>\
					<a href="#" ng-click="$event.preventDefault();toggleChild()">\
						<i data-ng-if="hasIcon" class="{{ icon }}"><em data-ng-if="hasIconCaption"> {{ iconCaption }} </em></i>\
						<span class="menu-item-parent" data-localize="{{ title }}">{{ title }}</span>\
					</a>\
					<ul data-ng-transclude="" ng-class="{show: checkChildActive()}"></ul>\
				</li>'
        };
    });
});