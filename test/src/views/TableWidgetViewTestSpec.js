/**
 * Created by justin on 12/22/14.
 */
describe("TableWidgetView", function () {
    var TableWidgetView = app.getView('views/TableWidgetView');
    var WidgetBaseView = app.getView('views/WidgetBaseView');
    var sut;

    var isFunction = function (obj) {
        return Object.prototype.toString.call(obj) === "[object Function]";
    };

    describe("configureEvents", function () {
        beforeEach(function () {
            sut = TableWidgetView.newInstance({}, {}, {}, {}, false, false).getOrElse(throwInstantiateException(TableWidgetView));
        });

        it("should declare method assignWidget", function () {
            expect(sut.fn.assignWidget).not.toBeNull();
            expect(isFunction(sut.fn.assignWidget)).toEqual(true);
        });

        describe("calling assignWidget", function () {
            var outerWidgetScope = {
                widgetId: 10,
                order: 10
            };

            function spyEvent() {
                sut.event.onReloadWidgetStart = jasmine.createSpy();
            }

            it("should assign outer scope to current instance", function () {
                spyEvent();
                sut.fn.assignWidget(outerWidgetScope);
                expect(sut.widget).toEqual(outerWidgetScope);
            });

            it("should fire event 'onReloadWidgetStart'", function () {
                spyEvent();
                sut.fn.assignWidget(outerWidgetScope);
                expect(sut.event.onReloadWidgetStart).toHaveBeenCalled();
            });

        })
    });

    describe("onReloadWidgetSuccess", function () {
        var fakeResponseData = {
            data: {
                param: "test data"
            }
        };

        function instantiateSut() {
            sut = new TableWidgetView({}, {});
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
    });
});