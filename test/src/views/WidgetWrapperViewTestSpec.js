/**
 * Created by justin on 4/2/15.
 */
describe("WidgetWrapperView", function () {
    var WidgetWrapperView = app.getView('views/WidgetWrapperView');
    var sut;

    describe("__construct()", function () {
        it("should call configureEvents()", function () {
            spyOn(WidgetWrapperView, 'configureEvents');
            sut = new WidgetWrapperView({}, {}, {}, {});
            expect(WidgetWrapperView.configureEvents).toHaveBeenCalledWith(sut);
        });
    });

    describe("configureEvents", function () {

        beforeEach(function () {
            sut = new WidgetWrapperView({}, {}, {}, {});
        });

        [{
            method: 'toggleCollapsePanel'
        }, {
            method: 'expandPanel'
        }, {
            method: 'reloadPanel'
        }, {
            method: 'closeWidget'
        }, {
            method: 'initWidget'
        }].forEach(function (test) {
                var method = test.method,
                    exercise = test.exercise;

                it("should declare method fn." + method, function () {
                    testDeclareMethod(sut.fn, method);
                });

                if (exercise)
                    describe("calling fn." + method, exercise);
            });
    });
});