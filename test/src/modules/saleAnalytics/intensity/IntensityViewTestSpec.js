/**
 * Created by xavi on 12/19/14.
 */
define([
    'modules/saleAnalytics/intensity/IntensityView',
    'modules/saleAnalytics/intensity/IntensityPresenter'
], function (IntensityView, IntensityPresenter) {
    'use strict';
    xdescribe("IntensityView", function () {
        var view, presenter, scope;

        beforeEach(function () {
            presenter = mock(IntensityPresenter);
            inject(function($rootScope){
                scope = $rootScope.$new();
            });
            view = new IntensityView(scope, presenter);
            view.event = {};
        });

        describe('construct', function () {
            it("should call configureEvents", function () {
                spyOn(IntensityView.prototype, 'configureEvents').and.callThrough();
                new IntensityView(scope, presenter);
                expect(IntensityView.prototype.configureEvents).toHaveBeenCalled();
            });
        });

        describe("show() method", function () {

            beforeEach(function () {
                view.event.onLoaded = sinon.stub();
                view.show();
            });

            it("should call presenter's show method on show()", function () {
                expect(view.presenter.show).toHaveBeenCalledWith(view);
            });

            it("should fire event onLoaded", function () {
                expect(view.event.onLoaded).toHaveBeenCalled();
            });
        });

        describe("updateWidgetIndex", function () {

            beforeEach(function () {
                view.event.onWidgetMoved = sinon.stub();
            });

            it("should pickup index by calling getElementIndex()", function () {
                var element = {item: {}}, widget = {widgetId: 10};
                spyOn(view, 'getElementIndex');
                view.updateWidgetIndex(element, widget);
                expect(view.getElementIndex).toHaveBeenCalledWith({});
            });

            it("should fire event onWidgetMoved", function () {
                var element = {item: {}}, widget = {widgetId: 10};
                spyOn(view, 'getElementIndex').and.returnValue(1003);
                view.updateWidgetIndex(element, widget);
                expect(view.event.onWidgetMoved).toHaveBeenCalledWith(widget, 1003);
            });

        });
    });
});