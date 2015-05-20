/**
 * Created by justin on 3/9/15.
 */
describe("OpportunityWidgetController", function () {
    var OpportunityWidgetController = app.getController("controllers/accountDetails/OpportunityWidgetController");

    var sut;

    it("should call configureView with correct params", function () {
        var scope = {thisIsFakeScope: true},
            element = {find: 10};
        OpportunityWidgetController.configureView = jasmine.createSpy();

        sut = new OpportunityWidgetController(scope, element);
        expect(OpportunityWidgetController.configureView).toHaveBeenCalledWith(scope, element);
    });
});