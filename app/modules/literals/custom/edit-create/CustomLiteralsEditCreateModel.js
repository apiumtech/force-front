define([
    'q',
    'modules/literals/custom/edit-create/CustomLiteralsEditCreateService'
], function (Q, CustomLiteralsEditCreateService) {

    function CustomLiteralsEditCreateModel(service) {
        this.service = service;
    }

    var proto = CustomLiteralsEditCreateModel.prototype;


    proto.createLiteral = function (literal) {
        return this.service.createLiteral(literal);
    };

    proto.changeLiteralDetails = function (literal) {
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
        return literal == null || literal.Id == null;
    };


    CustomLiteralsEditCreateModel.newInstance = function (editCreateService) {
        editCreateService = editCreateService || CustomLiteralsEditCreateService.newInstance();
        return new CustomLiteralsEditCreateModel(editCreateService);
    };

    return CustomLiteralsEditCreateModel;
});