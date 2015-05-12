/**
 * Created by kevin on 10/22/14.
 */
app.registerModel(function (container) {
    var LiteralService = container.getService('services/literal/LiteralService');

    function LiteralModel($literalService) {
        this.gateway = $literalService; // LiteralService.js
    }

    LiteralModel.prototype.getLiteralById = function (id) {
        return this.gateway.getLiteralById(id);
    };

    LiteralModel.prototype.updateOrCreateLiteral = function (literal) {
        return this.gateway.updateOrCreateLiteral(literal);
    };

    LiteralModel.prototype.deleteLiteral = function (id) {
        return this.gateway.deleteLiteral(id);
    };

    LiteralModel.newInstance = function (ls) {
        var literalService = ls || LiteralService.newInstance();

        return new LiteralModel(literalService);
    };

    return {newInstance: LiteralModel.newInstance};
});

