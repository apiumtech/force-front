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
            mockModel = {
                saveName: function () {
                },
                saveDescription: function () {
                }
            };
            sut = new ReportItemPresenter(mockModel);
        });

        describe('show()', function () {
            beforeEach(function () {
                sut.show(view);
            });

            describe('view.event.onSaveName', function () {
                it("should call saveName method on model", function () {
                    spyOn(mockModel, 'saveName').and.returnValue(exerciseFakeOkPromise());
                    var name = "newNameOftheStupidReport";
                    var id = 10000;
                    view.event.onSaveName(id, name);
                    expect(mockModel.saveName).toHaveBeenCalledWith(id, name);
                });

                it("should fallback to onSaveNameSuccess on view", function (done) {
                    spyOn(mockModel, 'saveName').and.returnValue(exerciseFakeOkPromise());

                    view.event.onSaveName();
                    expect(view.onSaveNameSuccess).toHaveBeenCalled();
                    done();
                });

                it("should fallback to onSaveNameError on view", function (done) {
                    spyOn(mockModel, 'saveName').and.returnValue(exerciseFakeKoPromise());

                    view.event.onSaveName();
                    expect(view.onSaveNameError).toHaveBeenCalled();
                    done();
                });
            });

            describe('view.event.onSaveDescription', function () {
                var description = "newNameOftheStupidReport";
                var id = 10000;
                it("should call saveDescription method on model", function () {
                    spyOn(mockModel, 'saveDescription').and.returnValue(exerciseFakeOkPromise());
                    view.event.onSaveDescription(id, description);
                    expect(mockModel.saveDescription).toHaveBeenCalledWith(id, description);
                });

                it("should fallback to onSaveDescriptionSuccess on view", function (done) {
                    spyOn(mockModel, 'saveDescription').and.returnValue(exerciseFakeOkPromise());

                    view.event.onSaveDescription(id, description);
                    expect(view.onSaveDescriptionSuccess).toHaveBeenCalled();
                    done();
                });

                it("should fallback to onSaveDescriptionError on view", function (done) {
                    spyOn(mockModel, 'saveDescription').and.returnValue(exerciseFakeKoPromise());

                    view.event.onSaveDescription(id, description);
                    expect(view.onSaveDescriptionError).toHaveBeenCalled();
                    done();
                });
            });
        });
    });
});