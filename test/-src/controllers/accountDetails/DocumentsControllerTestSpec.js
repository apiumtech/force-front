/**
 * Created by justin on 4/14/15.
 */
describe("DocumentsController", function () {
    var DocumentControllers = app.getController("controllers/accountDetails/DocumentsController");

    describe("construct", function () {
        it("should call configureView", function () {
            spyOn(DocumentControllers, 'configureView');
            var $scope = {};
            new DocumentControllers($scope);
            expect(DocumentControllers.configureView).toHaveBeenCalled();
        });
    });
});