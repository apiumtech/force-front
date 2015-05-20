/**
 * Created by joanllenas 5/14/15
 */

app.registerModel(function (container) {
    var Configuration = container.getService('Configuration');
    var LiteralService = container.getService('services/LiteralService');


    function LiteralListModel(literalService) {
        this.literalService = literalService;
        this.page = 0;
    }

    var proto = LiteralListModel.prototype;


    proto.getLiteralList = function (searchTerm) {
        var skip = this.page;
        var limit = 9000;//Configuration.pageSize;
        return this.literalService.getLiteralList(searchTerm, skip, limit);
    };


    proto.getLanguageList = function () {
        return this.literalService.getLanguageList();
    };


    proto.deleteLiteral = function(id) {
        assertNotNull("id", id);
        return this.literalService.deleteLiteral(id);
    };


    proto.getLiteralDictionary = function() {
        return this.literalService.getLiteralDictionary("en", null);
    };


    LiteralListModel.newInstance = function (literalService) {
        literalService = literalService || LiteralService.newInstance();
        return Some(new LiteralListModel(literalService));
    };

    return { newInstance: LiteralListModel.newInstance };
});

