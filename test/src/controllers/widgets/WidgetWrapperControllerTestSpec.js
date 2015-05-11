/**
 * Created by justin on 3/9/15.
 */
describe("WidgetWrapperController", function () {
    var WidgetWrapperInjector = app.getController("controllers/widgets/WidgetWrapperController");

    var sut;

    it("should call configureView with correct params", function () {
        var scope = {thisIsFakeScope: true},
            element = {account_id: 10};
        var WidgetWrapperController = WidgetWrapperInjector[WidgetWrapperInjector.length - 1];
        WidgetWrapperController.configureView = jasmine.createSpy();

        sut = new WidgetWrapperController(scope, element);
        expect(WidgetWrapperController.configureView).toHaveBeenCalledWith(scope, element);
    });
});