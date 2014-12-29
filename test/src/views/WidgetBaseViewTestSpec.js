/**
 * Created by justin on 12/22/14.
 */
describe("WidgetBaseView", function () {
    var WidgetBaseView = app.getView('views/WidgetBaseView');
    var sut;

    describe("on show()", function () {
        var presenter = {
            show: jasmine.createSpy()
        };

        function exerciseContructViewInstance() {
            sut = new WidgetBaseView({}, {}, {}, presenter);
            sut.event.onReloadWidgetStart = jasmine.createSpy();
        }

        it("should call show() on parent class", function () {
            exerciseContructViewInstance();
            spyOn(sut, '__show');
            sut.show();
            expect(sut.__show).toHaveBeenCalled();
        });
    });
});