define([
    'config',
    'modules/literals/custom/CustomLiteralsService',
    'modules/literals/custom/CustomLiteralsQueryBuilder',
    'shared/services/StorageService',
    'modules/literals/shared/BaseLiteralsModel'
], function(config, CustomLiteralsService, CustomLiteralsQueryBuilder, StorageService, BaseLiteralsModel) {
    'use strict';

    function CustomLiteralsModel(service, queryBuilder, storageService) {
        BaseLiteralsModel.call(this, service, queryBuilder);
        this.storageService = storageService;
    }

    CustomLiteralsModel.inherits(BaseLiteralsModel);
    var proto = CustomLiteralsModel.prototype;

    proto.setUserImplementationCode = function() {
        var implementationCode = this.storageService.retrieve(config.implementationCodeKey, true);

        if(config.isDevMode()){
            implementationCode = implementationCode || 8004;
        }

        this.queryBuilder.setImplementationCode(implementationCode);
    };

    CustomLiteralsModel.newInstance = function(service, queryBuilder, storageService) {
        service = service || CustomLiteralsService.newInstance();
        queryBuilder = queryBuilder || CustomLiteralsQueryBuilder.newInstance();
        storageService = storageService || StorageService.newInstance();

        return new CustomLiteralsModel(service, queryBuilder, storageService);
    };

    return CustomLiteralsModel;
});