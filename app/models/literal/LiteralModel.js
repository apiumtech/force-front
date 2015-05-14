app.registerModel(function (container) {
    var LiteralService = container.getService('services/LiteralService');


    // ----------------------------------------
    //
    //  CONSTRUCTOR
    //
    // ----------------------------------------

    function LiteralModel(literalService) {
        this.literalService = literalService;
    }


    // ----------------------------------------
    //
    //  API
    //
    // ----------------------------------------

    /**
     * createLiteral()
     */
    LiteralModel.prototype.createLiteral = function (literal) {
        return this.literalService.createLiteral(literal);
    };


    /**
     * changeLiteralDetails()
     */
    LiteralModel.prototype.changeLiteralDetails = function (literal) {
        return this.literalService.changeLiteralDetails(literal);
    };


    /**
     * deleteLiteral()
     */
    LiteralModel.prototype.deleteLiteral = function (id) {
        return this.literalService.deleteLiteral(id);
    };


    /**
     * getLiteralById()
     */
    LiteralModel.prototype.getLiteralById = function (id) {
        return this.literalService.getLiteralById(id);
    };


    /**
     * getLanguageList()
     */
    LiteralModel.prototype.getLanguageList = function () {
        return this.literalService.getLanguageList();
    };


    // ----------------------------------------
    //
    //  FACTORY
    //
    // ----------------------------------------

    LiteralModel.newInstance = function (literalService) {
        literalService = literalService || LiteralService.newInstance();
        return Some(new LiteralModel(literalService));
    };

    return {newInstance: LiteralModel.newInstance};
});

