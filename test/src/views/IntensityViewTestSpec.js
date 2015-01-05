/**
 * Created by xavi on 12/19/14.
 */
describe("IntensityView", function () {
    var IntensityView = app.getView('views/IntensityView');

    function exerciseCreateView(model, presenter) {
        return IntensityView.newInstance({}, model, presenter || {
            show: function () {
            }
        }, false, false).getOrElse(throwException("Could not create IntensityView!"));
    }

    describe("loadWidgets method", function () {
        it("should fire event 'onLoaded'", function () {
            var model = {};
            var view = exerciseCreateView(model, {show: jasmine.createSpy()});
            view.event.onLoaded = jasmine.createSpy();
            view.fn.loadWidgets();
            expect(view.event.onLoaded).toHaveBeenCalled();
        });
    });

    describe("show() method", function () {
        var view, model;

        function exerciseExecShowMethod() {
            model = {};
            view = exerciseCreateView(model, {show: jasmine.createSpy()});
            view.fn.loadWidgets = jasmine.createSpy();
            view.show();
        }

        it("should call presenter's show method on show()", function () {
            exerciseExecShowMethod();
            expect(view.presenter.show).toHaveBeenCalledWith(view, model);
        });

        it("should call load widget()", function () {
            exerciseExecShowMethod();
            expect(view.fn.loadWidgets).toHaveBeenCalled();
        });
    });

    describe("_rearrangeWidgetsList", function () {
        var view, widgetsData;

        beforeEach(function () {
            view = exerciseCreateView({}, {});
            widgetsData = [{
                order: 3,
                column: 1
            }, {
                order: 5,
                column: 1
            }, {
                order: 2,
                column: 1
            }];
        });

        it("should sort widgets by order", function () {
            var sortedWidgets = [
                {
                    order: 2,
                    column: 1
                }, {
                    order: 3,
                    column: 1
                }, {
                    order: 5,
                    column: 1
                }
            ];

            view._rearrangeWidgetsList(widgetsData);
            expect(widgetsData).toEqual(sortedWidgets);
        });
    });

});