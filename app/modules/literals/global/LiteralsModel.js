define([
	'modules/literals/global/LiteralsService',
	'modules/literals/global/LiteralsQueryBuilder',
	'modules/literals/shared/BaseLiteralsModel'
], function(LiteralsService, LiteralsQueryBuilder, BaseLiteralsModel) {
	'use strict';

	function LiteralsModel(service, queryBuilder) {
        BaseLiteralsModel.call(this, service, queryBuilder);
	}

    LiteralsModel.inherits(BaseLiteralsModel);
    var proto = LiteralsModel.prototype;

	LiteralsModel.newInstance = function(service, queryBuilder) {
        service = service || LiteralsService.newInstance();
        queryBuilder = queryBuilder || LiteralsQueryBuilder.newInstance();

		return new LiteralsModel(service, queryBuilder);
	};

	return LiteralsModel;
});