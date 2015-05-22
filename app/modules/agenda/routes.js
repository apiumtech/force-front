define([], function () {
	'use strict';
	return {
		register: function ($routeProvider, resolveRoute) {
				$routeProvider

						.when('put_your_route_here', resolveRoute('modules/agenda/-your-controller-', 'modules/agenda/-your-html-'))
			;
		}
	};
});