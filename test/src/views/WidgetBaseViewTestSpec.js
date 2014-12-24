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

    describe("when widget reloaded success", function () {
        var fakeResponseData = {
            data: {
                imgUrl: "imageUrl"
            }
        };

        function exerciseContructViewInstance() {
            sut = new WidgetBaseView({}, {}, {}, {});
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