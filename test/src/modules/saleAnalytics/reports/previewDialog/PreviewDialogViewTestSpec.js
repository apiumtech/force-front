define([
    'modules/saleAnalytics/reports/previewDialog/PreviewDialogView',
    'modules/saleAnalytics/reports/previewDialog/PreviewDialogPresenter'
], function (PreviewDialogView, PreviewDialogPresenter) {
    'use strict';

    describe('PreviewDialogView', function () {
        var sut, scope, presenter, modalInstance, report;

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

            beforeEach(function () {
                scope.report = {
                    id: 123,
                    params: [{'p1': 1}, {'p2': 'abcd'}]
                }
            });

            describe('fn.download', function () {
                it("should call view.event.download function", function () {
                    var response = {
                        url: "url"
                    };
                    sut.event = {
                        getReportURL: function () {
                        }
                    };
                    spyOn(sut.event, 'getReportURL').and.callFake(function (report, callback) {
                        callback(response);
                    });
                    sinon.stub(sut, 'onURLReceivedForDownload');
                    sut.fn.download();
                    expect(sut.event.getReportURL).toHaveBeenCalledWith(sut.report, jasmine.any(Function));
                    expect(sut.onURLReceivedForDownload).toHaveBeenCalledWith(response);
                })
            });

            describe('fn.send', function () {
                it("should call view.event.send function", function () {
                    var response = {
                        url: "url"
                    };
                    sut.event = {
                        getReportURL: function () {
                        }
                    };
                    spyOn(sut.event, 'getReportURL').and.callFake(function (report, callback) {
                        callback(response);
                    });
                    sinon.stub(sut, 'onURLReceivedForSend');
                    sut.fn.send();
                    expect(sut.event.getReportURL).toHaveBeenCalledWith(sut.report, jasmine.any(Function));
                    expect(sut.onURLReceivedForSend).toHaveBeenCalledWith(response);
                })
            });

        });
    });
});