/**
 * Created by justin on 4/14/15.
 */

define([
    'modules/account/widgets/documents/DocumentsController'
], function (DocumentControllers) {
    'use strict';
    describe("DocumentsController", function () {
        describe("construct", function () {
            it("should call configureView", function () {
                spyOn(DocumentControllers, 'configureView');
                var $scope = {};
                new DocumentControllers($scope);
                expect(DocumentControllers.configureView).toHaveBeenCalled();
            });
        });
    });
})