define([
    'modules/saleAnalytics/conversion/ConversionView',
    'modules/saleAnalytics/conversion/ConversionPresenter'
], function (ConversionView, ConversionPresenter) {
    'use strict';
    describe("ConversionView", function () {

        var view;

        function exerciseCreateView(presenter) {
            return ConversionView.newInstance(mockAngularScope(), presenter || mock(ConversionPresenter), false, false);
        }

        describe("show() method", function () {
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

        describe("configureEvents", function () {
            beforeEach(function () {
                view = exerciseCreateView({}, {});
            });

            [{
                method: "moveWidgetToContainer", test: moveWidgetToContainerTest
            }].forEach(function (test) {
                    it("should declare fn." + test.method + " method", function () {
                        expect(view.fn[test.method]).not.toBeNull();
                        expect(isFunction(view.fn[test.method])).toEqual(true);
                    });

                    describe("calling view.fn." + test.method, test.test);
                });

            function moveWidgetToContainerTest() {
                beforeEach(function () {
                    view._moveElementToContainer = jasmine.createSpy();
                    view.event.onWidgetMoved = jasmine.createSpy();
                });

                it("should moveElementToContainer", function () {
                    var element = {item: {}},
                        widget = {
                            widgetId: 10
                        };

                    view.fn.moveWidgetToContainer(element, widget);
                });

                it("should fire moved event", function () {
                    var element = {item: {}},
                        widget = {
                            widgetId: 10
                        }, newIndex = 3;

                    spyOn(view, 'getElementIndex').and.returnValue(newIndex);

                    view.fn.moveWidgetToContainer(element, widget);
                    expect(view.getElementIndex).toHaveBeenCalledWith(element.item);
                    expect(view.event.onWidgetMoved).toHaveBeenCalledWith(widget, newIndex);
                });
            }
        });
    });

});
