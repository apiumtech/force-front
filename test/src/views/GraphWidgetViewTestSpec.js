/**
 * Created by justin on 12/22/14.
 */
describe("IntensityFirstWidgetView", function () {
    var GraphWidgetView = app.getView('views/GraphWidgetView');
    var WidgetBaseView = app.getView('views/WidgetBaseView');
    var sut;

    describe("onReloadWidgetSuccess", function () {
        var fakeResponseData = {
            data: {
                param: "test data"
            }
        };

        function instantiateSut() {
            sut = new GraphWidgetView({}, {});
            sut.event = {};
            sut.event.onReloadWidgetDone = function () {
            };
        }

        it("Should assign data to scope", function () {
            instantiateSut();
            spyOn(sut.event, 'onReloadWidgetDone');
            sut.onReloadWidgetSuccess(fakeResponseData);
            expect(sut.data).toEqual(fakeResponseData.data);
        });

        it("Should fire done reload widget event", function () {
            instantiateSut();
            spyOn(sut.event, 'onReloadWidgetDone');
            sut.onReloadWidgetSuccess(fakeResponseData);
            expect(sut.event.onReloadWidgetDone).toHaveBeenCalledWith();
        });
    })
});