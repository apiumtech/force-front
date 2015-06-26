define([
    'modules/saleAnalytics/reports/reportItem/ReportItemPresenter',
    'modules/saleAnalytics/reports/reportItem/ReportItemModel',
    'modules/saleAnalytics/reports/reportItem/ReportItemView'
], function (ReportItemPresenter, ReportItemModel, ReportItemView) {
    'use strict';

    describe('ReportItemPresenter', function () {
        var sut, mockModel, view;

        beforeEach(function () {
            view = mock(ReportItemView);
            view.event = {};
            view.fn = {};
            mockModel = mock(ReportItemModel);
            sut = new ReportItemPresenter(mockModel);
        });

        describe('show()', function () {
            beforeEach(function () {
                sut.show(view);
            });

            [
                {method: "onSaveName", modelMethod: "update", onSuccess: "onSaveNameSuccess", onFailure: "onSaveNameError"},
                {method: "onSaveDescription", modelMethod: "update", onSuccess: "onSaveDescriptionSuccess", onFailure: "onSaveDescriptionError"}
            ].forEach(function(testCase){
                    describe('view.event.' + testCase.method, function () {
                        var report = {
                            id: 123,
                            name: "rName"
                        };
                        it("should call " + testCase.modelMethod + " method on model", function () {
                            mockModel[testCase.modelMethod].returns(exerciseFakeOkPromise());
                            view.event[testCase.method](report);
                            expect(mockModel[testCase.modelMethod]).toHaveBeenCalledWith(report);
                        });

                        it("should fallback to " + testCase.onSuccess + " on view", function (done) {
                            mockModel[testCase.modelMethod].returns(exerciseFakeOkPromise());
                            view.event[testCase.method]();
                            expect(view[testCase.onSuccess]).toHaveBeenCalled();
                            done();
                        });

                        it("should fallback to onSaveNameError on view", function (done) {
                            mockModel[testCase.modelMethod].returns(exerciseFakeKoPromise());
                            view.event[testCase.method]();
                            expect(view[testCase.onFailure]).toHaveBeenCalled();
                            done();
                        });
                    });
            });

            xdescribe('view.event.toggleFavouriteReport', function () {
                it("should call toggleFavouriteReport function from model", function () {
                    var reportId = 123;
                    view.event.toggleFavouriteReport(reportId);
                    expect(mockModel.toggleFavouriteReport).toHaveBeenCalledWith(reportId);
                });
            });

            describe('view.event.getParameterConfiguration', function () {
                it("should call getParameterConfiguration from model", function () {
                    var reportId = 123;
                    var callback = sinon.stub();
                    view.event.getParameterConfiguration(reportId, callback);
                    expect(mockModel.getParameterConfiguration).toHaveBeenCalledWith(reportId, callback);
                });
            });

            describe('view.event.getReportURL', function () {
                it("should call getReportURL from model", function () {
                    var report = {};
                    var callback = sinon.stub();
                    view.event.getReportURL(report, callback);
                    expect(mockModel.getReportURL).toHaveBeenCalledWith(report, callback);
                });
            });

        });
    });
});