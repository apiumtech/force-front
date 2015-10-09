define([
    'modules/saleAnalytics/distribution/DistributionView',
    'modules/saleAnalytics/distribution/DistributionPresenter'
], function (DistributionView, DistributionPresenter) {
    'use strict';
    describe("DistributionView", function () {

        var view, presenter;

        function exerciseCreateView(_presenter) {
            return DistributionView.newInstance(mockAngularScope(), _presenter || mock(DistributionPresenter), false, false);
        }

        describe("show() method", function () {
            beforeEach(function () {
                presenter = mock(DistributionPresenter);
                view = exerciseCreateView(presenter);
                view.event.onLoaded = jasmine.createSpy();
                view.show();
            });

            it("should call presenter's show method on show()", function () {
                expect(presenter.show).toHaveBeenCalledWith(view);
            });

            it("should fire event onLoaded", function () {
                expect(view.event.onLoaded).toHaveBeenCalled();
            });
        });

    });

});