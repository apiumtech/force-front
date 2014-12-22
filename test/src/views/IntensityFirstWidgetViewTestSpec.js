/**
 * Created by justin on 12/22/14.
 */
describe("IntensityFirstWidgetViewTestSpec", function () {
    var IntensityFirstWidgetView = app.getView('views/IntensityFirstWidgetView');
    var sut;

    describe("on show()", function () {
        var presenter = {
            show: jasmine.createSpy()
        };

        function exerciseContructViewInstance() {
            sut = IntensityFirstWidgetView.newInstance({}, {}, {}, presenter, false, false).getOrElse(throwException("Cannot instantiate IntensityFirstWidgetView"));
            sut.event.onReloadWidgetRequested = jasmine.createSpy();
        }

        it("should call show() on presenter", function () {
            exerciseContructViewInstance();
            sut.show();
            expect(presenter.show).toHaveBeenCalled();
        });
    });

    describe("when widget reloaded success", function () {
        var fakeResponseData = {
            data: {
                imgUrl: "imageUrl"
            }
        };

        function exerciseContructViewInstance() {
            sut = IntensityFirstWidgetView.newInstance({}, {}, {}, {}, false, false).getOrElse(throwException("Cannot instantiate IntensityFirstWidgetView"));
        }

        function performCallReloadSuccess() {
            sut.event.onReloadWidgetDone = jasmine.createSpy();
            sut.onReloadWidgetSuccess(fakeResponseData);
        }

        it("should bind data to this.data", function () {
            exerciseContructViewInstance();
            performCallReloadSuccess();
            expect(sut.data).toEqual(fakeResponseData.data);

        });

        it("$scope.data should have same value as this.data", function () {
            exerciseContructViewInstance();
            performCallReloadSuccess();
            expect(sut.$scope.data).toEqual(sut.data);
        });

        it("should fire Done event", function () {
            exerciseContructViewInstance();
            performCallReloadSuccess();
            expect(sut.event.onReloadWidgetDone).toHaveBeenCalled();
        });
    });
});