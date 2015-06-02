define([
    'modules/saleAnalytics/reports/previewDialog/PreviewDialogView',
    'modules/saleAnalytics/reports/previewDialog/PreviewDialogPresenter'
], function (PreviewDialogView, PreviewDialogPresenter) {
    'use strict';

    describe('PreviewDialogView', function () {
        var sut, scope, presenter, modalInstance;

        beforeEach(function () {
            inject(function ($rootScope) {
                scope = $rootScope.$new();
            });
            modalInstance = {
                dismiss: function () {
                }
            };
            sinon.stub(modalInstance, 'dismiss');
            presenter = mock(PreviewDialogPresenter);
            sut = new PreviewDialogView(scope, modalInstance, presenter);
        });

        describe('construct', function () {
            beforeEach(function () {
                sinon.stub(PreviewDialogView.prototype, 'configureEvents');
            });
            afterEach(function () {
                PreviewDialogView.prototype.configureEvents.restore();
            });
            it("should call configureEvents", function () {
                new PreviewDialogView(scope, modalInstance, presenter);
                expect(PreviewDialogView.prototype.configureEvents).toHaveBeenCalled();
            });
        });

        describe("show", function () {
            it("should call show on presenter", function () {
                sut.show();
                expect(presenter.show).toHaveBeenCalled();
            });
        });

        describe('configureEvents', function () {
            describe('fn.closePreview', function () {
                it("should dismiss the preview dialog", function () {
                    sut.fn.closePreview();
                    expect(modalInstance.dismiss).toHaveBeenCalled();
                });
            });
            describe('fn.toggleFavouriteReport', function () {
                it("should dismiss the preview dialog", function () {
                    scope.report = {
                        id: 123,
                        favourite: false
                    };
                    sut.event.toggleFavouriteReport = sinon.spy();
                    sut.fn.toggleFavouriteReport();
                    expect(sut.event.toggleFavouriteReport).toHaveBeenCalledWith(123);
                });
            });
        });

    });
});