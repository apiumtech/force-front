define([
], function() {
    'use strict';

    function BaseLiteralsService() {
    }

    var proto = BaseLiteralsService.prototype;

    proto.deleteLiteral = function(literalId) {
        throw new Error("Abstract method not implemented");
    };

    proto.getLanguageList = function() {
        // TODO: move logic from LiteralsSharedService here anr remove LiteralsSharedService class.
    };

    return BaseLiteralsService;
});