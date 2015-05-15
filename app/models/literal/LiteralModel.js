/**
 * Created by joanllenas 5/14/15
 */

app.registerModel(function (container) {
    var LiteralService = container.getService('services/LiteralService');


    function LiteralModel(literalService) {
        this.literalService = literalService;
    }

    var proto = LiteralModel.prototype;


    proto.createLiteral = function(literal) { return this.literalService.createLiteral(literal); };

    proto.changeLiteralDetails = function(literal) { return this.literalService.changeLiteralDetails(literal); };

    proto.deleteLiteral = function(id) { return this.literalService.deleteLiteral(id); };

    proto.getLiteralById = function(id) {
        var literalStub = { Id: id };
        if( this.isNew(literalStub) ) {
            return this.literalService.getNullLiteral();
        } else {
            return this.literalService.getLiteralById(id);
        }
    };

    proto.getLanguageList = function() { return this.literalService.getLanguageList(); };

    proto.isNew = function(literal) { return literal == null || literal.Id == null; };


    LiteralModel.newInstance = function (literalService) {
        literalService = literalService || LiteralService.newInstance();
        return Some(new LiteralModel(literalService));
    };

    return {newInstance: LiteralModel.newInstance};
});

