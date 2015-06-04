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

            describe('view.event.onSaveName', function () {
                it("should call saveName method on model", function () {
                    mockModel.saveName.returns(exerciseFakeOkPromise());
                    var name = "newNameOftheStupidReport";
                    var id = 10000;
                    view.event.onSaveName(id, name);
                    expect(mockModel.saveName).toHaveBeenCalledWith(id, name);
                });

                it("should fallback to onSaveNameSuccess on view", function (done) {
                    mockModel.saveName.returns(exerciseFakeOkPromise());

                    view.event.onSaveName();
                    expect(view.onSaveNameSuccess).toHaveBeenCalled();
                    done();
                });

                it("should fallback to onSaveNameError on view", function (done) {
                    mockModel.saveName.returns(exerciseFakeKoPromise());

                    view.event.onSaveName();
                    expect(view.onSaveNameError).toHaveBeenCalled();
                    done();
                });
            });

            describe('view.event.onSaveDescription', function () {
                var description = "newNameOftheStupidReport";
                var id = 10000;
                it("should call saveDescription method on model", function () {
                    mockModel.saveDescription.returns(exerciseFakeOkPromise());
                    view.event.onSaveDescription(id, description);
                    expect(mockModel.saveDescription).toHaveBeenCalledWith(id, description);
                });

                it("should fallback to onSaveDescriptionSuccess on view", function (done) {
                    mockModel.saveDescription.returns(exerciseFakeOkPromise());

                    view.event.onSaveDescription(id, description);
                    expect(view.onSaveDescriptionSuccess).toHaveBeenCalled();
                    done();
                });

                it("should fallback to onSaveDescriptionError on view", function (done) {
                    mockModel.saveDescription.returns(exerciseFakeKoPromise());

                    view.event.onSaveDescription(id, description);
                    expect(view.onSaveDescriptionError).toHaveBeenCalled();
                    done();
                });
            });

            describe('view.event.toggleFavouriteReport', function () {
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