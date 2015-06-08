define([], function () {
	'use strict';
	return {
		register: function ($routeProvider, resolveRoute) {
				$routeProvider

					.when('/literals', resolveRoute('modules/literals/global/LiteralsController', 'modules/literals/global/literals'))

					.when('/literals/:literalId/edit', resolveRoute('modules/literals/global/edit-create/LiteralsEditCreateController', 'modules/literals/global/edit-create/literalsEditCreate'))

					.when('/literals/create', resolveRoute('modules/literals/global/edit-create/LiteralsEditCreateController', 'modules/literals/global/edit-create/literalsEditCreate'))
			;
		}
	};
});