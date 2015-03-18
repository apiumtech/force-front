/**
 * Created by justin on 3/9/15.
 */
describe("AgendaWidgetController", function () {
    var AgendaWidgetController = app.getController("controllers/accountDetails/AgendaWidgetController");

    var sut;

    it("should call configureView with correct params", function () {
        var scope = {thisIsFakeScope: true},
            element = {find: 10};
        AgendaWidgetController.configureView = jasmine.createSpy();

        sut = new AgendaWidgetController(scope, element);
        expect(AgendaWidgetController.configureView).toHaveBeenCalledWith(scope, element);
    });
});