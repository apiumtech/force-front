define([
    'modules/saleAnalytics/distribution/DistributionView'
], function (DistributionView) {
    'use strict';
    describe("DistributionView", function () {

        var view, model, presenter;

        function exerciseCreateView(_model, _presenter) {
            return DistributionView.newInstance({}, _model, _presenter || {
                show: function () {
                }
            }, false, false);
        }

        describe("show() method", function () {
            beforeEach(function () {
                model = {};
                presenter = {
                    show: jasmine.createSpy()
                };
                view = exerciseCreateView(model, presenter);
                view.event.onLoaded = jasmine.createSpy();
                view.show();
            });

            it("should call presenter's show method on show()", function () {
                expect(view.presenter.show).toHaveBeenCalledWith(view, model);
            });

            it("should fire event onLoaded", function () {
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