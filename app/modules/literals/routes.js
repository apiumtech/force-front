define([], function () {
	'use strict';
	return {
		register: function ($routeProvider, resolveRoute) {
				$routeProvider

					.when('/literals', resolveRoute('modules/literals/globla/LiteralsController', 'modules/literals/global/literals'))

					//.when('/literals/:literalId/edit', resolveRoute('modules/literals/global/edit/LiteralsEditController', 'modules/literal/edit/literalsEdit'))

					//.when('/literals/create', resolveRoute('modules/literal/edit-create/LiteralController', 'modules/literal/edit-create/literal'))
			;
		}
	};
});