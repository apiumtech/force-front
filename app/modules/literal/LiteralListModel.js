/**
 * Created by joanllenas 5/14/15
 */

define([
    'config',
    'modules/literal/LiteralService'
], function (Configuration, LiteralService) {
    'use strict';

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


    proto.deleteLiteral = function (id) {
        assertNotNull("id", id);
        return this.literalService.deleteLiteral(id);
    };


    LiteralListModel.newInstance = function (literalService) {
        literalService = literalService || LiteralService.newInstance();
        return new LiteralListModel(literalService);
    };

    return LiteralListModel;
});

