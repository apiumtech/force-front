define([
    'modules/saleAnalytics/conversion/ConversionPresenter',
    'modules/saleAnalytics/conversion/ConversionModel',
    'modules/saleAnalytics/conversion/ConversionView'
], function (ConversionPresenter, ConversionModel, ConversionView) {
    'use strict';
    describe("ConversionPresenter", function () {

        var sut, view, model;

        beforeEach(function () {
            view = mock(ConversionView);
            model = mock(ConversionModel);
            sut = new ConversionPresenter(model);
        });

        describe("show() ", function () {
            beforeEach(function () {
                sut.show(view);
            });

            [{
                viewEvent: "onLoaded", test: onLoadedTest
            }, {
                viewEvent: "onWidgetDropped", test: onWidgetDroppedTest
            }, {
                viewEvent: "onWidgetMoved", test: onWidgetMovedTest
            }].forEach(function (testCase) {
                    var viewEvent = testCase.viewEvent;
                    describe("when view.event." + viewEvent + " is fired", testCase.test);
                });

            function onLoadedTest() {
                var viewEvent = "onLoaded",
                    modelMethod = 'getWidgets',
                    onSuccess = "onWidgetsLoaded",
                    onError = "onWidgetsLoadFail";
                exerciseAjaxCallMapping(modelMethod, onSuccess, onError, viewEvent);
            }

            function onWidgetDroppedTest() {
                it("should call updateWidgetSize() on view", function () {
                    view.updateWidgetSize = jasmine.createSpy();
                    var element = {fake: "yes it fake"}, widget = {data: null};
                    view.event.onWidgetDropped(element, widget);
                    expect(view.updateWidgetSize).toHaveBeenCalledWith(element, widget);
                });
            }

            function onWidgetMovedTest() {
                var viewEvent = "onWidgetMoved",
                    modelMethod = 'updateWidgets',
                    onSuccess = "onWidgetsUpdated",
                    onError = "onWidgetsUpdatedFail";

                beforeEach(function () {
                    view[onSuccess] = jasmine.createSpy();
                    view[onError] = jasmine.createSpy();
                });

                it("should call moveWidget on model", function () {
                    spyOn(model, 'updateWidgets').and.returnValue(exerciseFakePromise());
                    var widget = {widgetId: 10}, newIndex = 10;
                    view.event.onWidgetMoved(widget, newIndex);
                    expect(model.moveWidget).toHaveBeenCalledWith(widget, newIndex);
                });

                describe("connect view to model", function () {
                    exerciseAjaxCallMapping(modelMethod, onSuccess, onError, viewEvent);
                });
            }

            function exerciseAjaxCallMapping(modelMethod, onSuccess, onError, viewEvent) {
                beforeEach(function () {
                    view[onSuccess] = jasmine.createSpy();
                    view[onError] = jasmine.createSpy();
                });

                it("presenter should connect event to '" + modelMethod + "' method on model", function () {
                    spyOn(model, modelMethod).and.returnValue(exerciseFakePromise());
                    view.event[viewEvent]();
                    expect(model[modelMethod]).toHaveBeenCalled();
                });

                it("should call method '" + onSuccess + "' on view if model '" + modelMethod + "' return success", function () {
                    spyOn(model, modelMethod).and.returnValue(exerciseFakeOkPromise());
                    view.event[viewEvent]();
                    expect(view[onSuccess]).toHaveBeenCalled();
                });

                it("should call method '" + onError + "' on view if model '" + modelMethod + "' return error", function () {
                    spyOn(model, modelMethod).and.returnValue(exerciseFakeKoPromise());
                    view.event[viewEvent]();
                    expect(view[onError]).toHaveBeenCalled();
                });
            }
        });
    });

});