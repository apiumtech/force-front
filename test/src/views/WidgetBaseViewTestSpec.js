/**
 * Created by justin on 12/22/14.
 */
describe("WidgetBaseView", function () {
    var WidgetBaseView = app.getView('views/WidgetBaseView');
    var sut, scope;
    var presenter;


    beforeEach(function () {
        presenter = {
            show: jasmine.createSpy()
        };
        scope = {
            $on: function () {
            },
            $watch: function () {
            }
        };
        sut = new WidgetBaseView(scope, {}, {}, presenter);
        sut.event.onReloadWidgetStart = jasmine.createSpy();
    });

    describe("on show()", function () {
        it("should call show() on parent class", function () {
            spyOn(sut, '__show');
            sut.show();
            expect(sut.__show).toHaveBeenCalled();
        });
    });

    describe('onReloadWidgetSuccess', function () {
        beforeEach(function () {
            WidgetBaseView.prototype.___onReloadWidgetSuccess = WidgetBaseView.prototype.onReloadWidgetSuccess;
            WidgetBaseView.prototype.onReloadWidgetSuccess = function () {
                console.log("nothing to do here :D")
            }
        });
        afterEach(function () {
            WidgetBaseView.prototype.onReloadWidgetSuccess = WidgetBaseView.prototype.___onReloadWidgetSuccess;
        });

        describe('After invoked', function () {
            it("should invoke the method _onReloadWidgetSuccess", function () {
                var newSut = new WidgetBaseView(scope, {}, {}, presenter);
                newSut._onReloadWidgetSuccess = jasmine.createSpy();

                newSut.onReloadWidgetSuccess();
                expect(newSut._onReloadWidgetSuccess).toHaveBeenCalled();
            });
        });
    });

    describe('onReloadCommandReceived', function () {
        it("should invoke the method onReloading", function () {
            sut.event.onReloading = jasmine.createSpy();

            sut.onReloadCommandReceived();
            expect(sut.event.onReloading).toHaveBeenCalled();
        });
    });
});