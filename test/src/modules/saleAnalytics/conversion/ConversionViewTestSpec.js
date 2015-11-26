define([
    'modules/saleAnalytics/conversion/ConversionView',
    'modules/saleAnalytics/conversion/ConversionPresenter'
], function (ConversionView, ConversionPresenter) {
    'use strict';
    xdescribe("ConversionView", function () {

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

    });

});
