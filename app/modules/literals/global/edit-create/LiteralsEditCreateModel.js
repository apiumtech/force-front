define([
    'q',
    'modules/literals/global/edit-create/LiteralsEditCreateService'
], function (Q, LiteralsEditCreateService) {

    function LiteralsEditCreateModel(service) {
        this.service = service;
    }

    var proto = LiteralsEditCreateModel.prototype;


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

    proto.getLiteralTypeList = function () {
        return this.service.getLiteralTypeList();
    };

    proto.getDeviceTypeList = function () {
        return this.service.getDeviceTypeList();
    };

    proto.isNew = function (literal) {
        return literal == null || literal.Id == null;
    };


    LiteralsEditCreateModel.newInstance = function (editCreateService) {
        editCreateService = editCreateService || LiteralsEditCreateService.newInstance();
        return new LiteralsEditCreateModel(editCreateService);
    };

    return LiteralsEditCreateModel;
});