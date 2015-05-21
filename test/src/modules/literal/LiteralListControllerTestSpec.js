define([
    'modules/literal/LiteralListController'
], function (LiteralListController) {
    'use strict';
    describe('LiteralListController', function () {

        it("should call LiteralListController.configureView global method", function () {
            var scope = {someScope: true}, compile = {stupidCompiler: true};

            LiteralListController.configureView = jasmine.createSpy();
            var ctrl = new LiteralListController(scope, compile);
            expect(LiteralListController.configureView).toHaveBeenCalledWith(scope, compile);
        });
    });
});