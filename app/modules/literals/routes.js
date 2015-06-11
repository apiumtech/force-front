define([], function () {
	'use strict';
	return {
		register: function ($routeProvider, resolveRoute) {
            $routeProvider

                .when('/literals', resolveRoute('modules/literals/global/LiteralsController', 'modules/literals/global/literals'))
                .when('/literals/:literalId/edit', resolveRoute('modules/literals/global/edit-create/LiteralsEditCreateController', 'modules/literals/global/edit-create/literalsEditCreate'))
                .when('/literals/create', resolveRoute('modules/literals/global/edit-create/LiteralsEditCreateController', 'modules/literals/global/edit-create/literalsEditCreate'))


                .when('/custom-literals', resolveRoute('modules/literals/custom/CustomLiteralsController', 'modules/literals/custom/customLiterals'))
                .when('/custom-literals/:literalId/edit', resolveRoute('modules/literals/custom/edit-create/CustomLiteralsEditCreateController', 'modules/literals/custom/edit-create/customLiteralsEditCreate'))
                .when('/custom-literals/create', resolveRoute('modules/literals/custom/edit-create/CustomLiteralsEditCreateController', 'modules/literals/custom/edit-create/customLiteralsEditCreate'))
        ;
		}
	};
});