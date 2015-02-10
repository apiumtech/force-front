/**
 * Created by justin on 4/2/15.
 */
describe("WidgetWrapperView", function () {
    var WidgetWrapperView = app.getView('views/WidgetWrapperView');
    var sut,
        scope;

    beforeEach(function () {
        scope = {
            $on: function () {
            }
        }
    });

    describe("__construct()", function () {
        it("should call configureEvents()", function () {
            spyOn(WidgetWrapperView, 'configureEvents');
            sut = new WidgetWrapperView(scope, {}, {}, {});
            expect(WidgetWrapperView.configureEvents).toHaveBeenCalledWith(sut);
        });
    });

    describe("configureEvents", function () {

        beforeEach(function () {
            sut = new WidgetWrapperView(scope, {}, {}, {});
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

    describe("showLoading", function () {
        beforeEach(function () {
            sut = new WidgetWrapperView(scope, {}, {}, {});
        });
        it("should switch loading flag to true", function () {
            sut.$scope.isLoading = false;
            sut.showLoading();
            expect(sut.$scope.isLoading).toEqual(true);
        });
    });

    describe("onReloadCompleteSignalReceived()", function () {
        beforeEach(function () {
            sut = new WidgetWrapperView(scope, {}, {}, {});
        });
        it("should switch loading flag to true", function () {
            sut.$scope.isLoading = true;
            sut.onReloadCompleteSignalReceived(false, "");
            expect(sut.$scope.isLoading).toEqual(false);
        });
    });
});