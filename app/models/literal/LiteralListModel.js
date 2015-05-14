app.registerModel(function (container) {
    var Configuration = container.getService('Configuration');
    var LiteralService = container.getService('services/LiteralService');


    // ----------------------------------------
    //
    //  CONSTRUCTOR
    //
    // ----------------------------------------

    function LiteralListModel(literalService) {
        this.literalService = literalService;
        this.page = -1;
    }


    // ----------------------------------------
    //
    //  API
    //
    // ----------------------------------------

    /**
     * getLiteralList()
     */
    LiteralListModel.prototype.getLiteralList = function (searchTerm) {
        this.page++;
        var skip = this.page;
        var limit = Configuration.pageSize;
        return this.literalService.getLiteralList(searchTerm, skip, limit);
    };


    /**
     * getLanguageList()
     */
    LiteralListModel.prototype.getLanguageList = function () {
        return this.literalService.getLanguageList();
    };


    // ----------------------------------------
    //
    //  FACTORY
    //
    // ----------------------------------------

    LiteralListModel.newInstance = function (literalService) {
        literalService = literalService || LiteralService.newInstance();
        return Some(new LiteralListModel(literalService));
    };

    return { newInstance: LiteralListModel.newInstance };
});

