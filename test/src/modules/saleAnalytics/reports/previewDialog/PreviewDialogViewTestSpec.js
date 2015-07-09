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
                beforeEach(function () {
                    scope.report = {
                        Id: 123,
                        Favorite: false
                    };
                    sut.event.toggleFavouriteReport = sinon.spy();
                    sut.fn.toggleFavouriteReport();
                });
                it("should fire toggleFavouriteReport event", function () {
                    expect(sut.event.toggleFavouriteReport).toHaveBeenCalledWith(123);
                });
                it('should set processingFavourite to true', function () {
                    expect(sut.processingFavourite).toBeTruthy();
                });
            });

            beforeEach(function () {
                scope.report = {
                    Id: 123,
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

            describe('fn.init', function () {
                var report = {
                    Id: 123,
                    Name: "sample report"
                };
                it('should fire onLoadingPreviewImage event', function () {
                    sut.event = {
                        onLoadingPreviewImage: sinon.stub()
                    };
                    sut.report = report;
                    sut.fn.init();
                    expect(sut.event.onLoadingPreviewImage).toHaveBeenCalledWith(report);
                });
            });

        });

        describe('onPreviewImageLoaded', function () {
            var data = [
                "img 1",
                "img 2"
            ];
            it('should assign returned data to images', function () {
                sut.onPreviewImageLoaded(data);
                expect(sut.images).toEqual(data);
            });
        });

        describe('onToggledFavouriteReport', function () {
            beforeEach(function () {
                sut.report = {
                    Id: 123,
                    Name: "sample report",
                    Favorite: false
                };
                sut.onToggledFavouriteReport();
            });
            it('should toggle report\'s favourite property', function () {
                expect(sut.report.Favorite).toBeTruthy();
            });
            it('should set processingFavourite to false', function () {
                expect(sut.processingFavourite).toBeFalsy();
            });
        });

    });
});