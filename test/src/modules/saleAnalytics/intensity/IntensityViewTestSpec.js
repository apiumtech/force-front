/**
 * Created by xavi on 12/19/14.
 */
define([
    'modules/saleAnalytics/intensity/IntensityView',
    'modules/saleAnalytics/intensity/IntensityPresenter'
], function (IntensityView, IntensityPresenter) {
    'use strict';
    describe("IntensityView", function () {
        var presenter = mock(IntensityPresenter);

        function exerciseCreateView() {
            return new IntensityView({}, presenter);
        }

        describe("show() method", function () {
            var view;

            function exerciseExecShowMethod() {
                view = exerciseCreateView();
                view.event.onLoaded = jasmine.createSpy();
                view.show();
            }

            it("should call presenter's show method on show()", function () {
                exerciseExecShowMethod();
                expect(view.presenter.show).toHaveBeenCalledWith(view);
            });

            it("should fire event onLoaded", function () {
                exerciseExecShowMethod();
                expect(view.event.onLoaded).toHaveBeenCalled();
            });
        });

        describe("updateWidgetIndex", function () {
            var view, model;

            function exerciseExecShowMethod() {
                model = {};
                view = exerciseCreateView(model, {show: jasmine.createSpy()});
                view.event.onWidgetMoved = jasmine.createSpy();
            }

            it("should pickup index by calling getElementIndex()", function () {
                exerciseExecShowMethod();
                var element = {item: {}}, widget = {widgetId: 10};
                spyOn(view, 'getElementIndex');
                view.updateWidgetIndex(element, widget);
                expect(view.getElementIndex).toHaveBeenCalledWith({});
            });

            it("should fire event onWidgetMoved", function () {
                exerciseExecShowMethod();
                var element = {item: {}}, widget = {widgetId: 10};
                spyOn(view, 'getElementIndex').and.returnValue(1003);
                view.updateWidgetIndex(element, widget);
                expect(view.event.onWidgetMoved).toHaveBeenCalledWith(widget, 1003);
            });

        });
    });
});