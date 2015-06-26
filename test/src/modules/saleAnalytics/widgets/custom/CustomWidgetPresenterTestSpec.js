define([
    'modules/saleAnalytics/widgets/custom/CustomWidgetPresenter',
    'modules/saleAnalytics/widgets/custom/CustomWidgetView'
], function (CustomWidgetPresenter, CustomWidgetView) {
    'use strict';

    describe("CustomWidgetPresenter", function () {
        it("should _executeLoadWidget onReloading", function () {
            var sut = new CustomWidgetPresenter();
            spyOn(sut, "_executeLoadWidget");
            var view = {event:{}};
            sut.show(view);
            view.event.onReloading();
            expect(sut._executeLoadWidget).toHaveBeenCalled();
        });

        it("should call model's reloadWidget on _executeLoadWidget", function () {
            var sut = new CustomWidgetPresenter();
            var view = mock(CustomWidgetView);
            sut.$view = view;
            spyOn(sut.model, "reloadWidget").and.returnValue(exerciseFakePromise());
            sut._executeLoadWidget();
            expect(sut.model.reloadWidget).toHaveBeenCalled();
        });

        it("should call view's onReloadWidgetSuccess on reloadWidget success", function () {
            var sut = new CustomWidgetPresenter();
            var view = mock(CustomWidgetView);
            sut.$view = view;
            spyOn(sut.model, "reloadWidget").and.returnValue(exerciseFakeOkPromise());
            sut._executeLoadWidget();
            expect(sut.$view.onReloadWidgetSuccess).toHaveBeenCalled();
        });

        it("should call view's onReloadWidgetError on reloadWidget error", function () {
            var sut = new CustomWidgetPresenter();
            var view = mock(CustomWidgetView);
            sut.$view = view;
            spyOn(sut.model, "reloadWidget").and.returnValue(exerciseFakeKoPromise());
            sut._executeLoadWidget();
            expect(sut.$view.onReloadWidgetError).toHaveBeenCalled();
        });
    });
});