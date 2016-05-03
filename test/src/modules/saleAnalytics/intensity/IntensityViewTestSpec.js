/**
 * Created by xavi on 12/19/14.
 */
define([
    'modules/saleAnalytics/intensity/IntensityView',
    'modules/saleAnalytics/intensity/IntensityPresenter'
], function (IntensityView, IntensityPresenter) {
    'use strict';
    describe("IntensityView", function () {
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
    });
});
