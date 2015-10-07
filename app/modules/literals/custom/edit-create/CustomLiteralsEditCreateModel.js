define([
    'config',
    'q',
    'modules/literals/custom/edit-create/CustomLiteralsEditCreateService',
    'shared/services/StorageService'
], function (config, Q, CustomLiteralsEditCreateService, StorageService) {

    function CustomLiteralsEditCreateModel(service, storageService) {
        this.service = service;
        this.storageService = storageService;
    }

    var proto = CustomLiteralsEditCreateModel.prototype;


    proto.createLiteralBody = function (literal) {
        var body = {
            key: literal.Key,
            languageValues: {}
        };
        _.each(literal.LanguageValues, function(value, key){
            body.languageValues[key] = value;
        });
        return body;
    };

    proto.createLiteral = function (literal) {
        assertNotNull("literal", literal);
        assertNotNull("implementationCode", literal.ImplementationCode);
        var body = this.createLiteralBody(literal);
        body.implementationCode = this.storageService.retrieve(config.implementationCodeKey, true);

        if(config.isDevMode()){
            body.implementationCode = body.implementationCode || 8004;
        }

        if(!body.implementationCode){
            throw new Error("No implementationCode found");
        }

        return this.service.createLiteral(body);
    };

    proto.changeLiteralDetails = function (literal) {
        assertNotNull("literal", literal);
        assertNotNull("Id", literal.Id);
        var body = this.createLiteralBody(literal);
        body.Id = literal.Id;
        var deferred = Q.defer();
        this.service.changeLiteralDetails(literal).then(
            function (data) {
                deferred.resolve(data);
            },
            function (err) {
                deferred.reject(err);
            }
        )
        return deferred.promise;
    };


    proto.getLiteralById = function (id) {
        var literalStub = {Id: id};
        if (this.isNew(literalStub)) {
            return this.service.getNullLiteral();
        } else {
            return this.service.getLiteralById(id);
        }
    };

    proto.getLanguageList = function () {
        return this.service.getLanguageList();
    };

    proto.getImplementationList = function () {
        return this.service.getImplementationList();
    };

    proto.isNew = function (literal) {
        return literal === null || literal.ImplementationCode === -1;
    };


    CustomLiteralsEditCreateModel.newInstance = function (editCreateService, storageService) {
        editCreateService = editCreateService || CustomLiteralsEditCreateService.newInstance();
        storageService = storageService || StorageService.newInstance();
        return new CustomLiteralsEditCreateModel(editCreateService, storageService);
    };

    return CustomLiteralsEditCreateModel;
});