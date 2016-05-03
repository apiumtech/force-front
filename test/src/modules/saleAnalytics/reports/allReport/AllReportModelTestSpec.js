define([
    'modules/saleAnalytics/reports/allReport/AllReportModel'
], function (AllReportModel) {
    'use strict';

    describe('AllReportModel', function () {

        var sut, ajaxService;

        beforeEach(function () {
            ajaxService = {
                rawAjaxRequest: function () {
                }
            };
            sut = new AllReportModel(ajaxService);
        });

        describe('_reload', function () {
            it('should call decoration method to decorate data from server', function (done) {
                spyOn(sut, 'decorateServerData');
                spyOn(ajaxService, 'rawAjaxRequest').and.returnValue(exerciseFakeOkPromise());
                sut._reload().then(function () {
                    expect(sut.decorateServerData).toHaveBeenCalled();
                    done();
                });
            });

        });

        describe('decorateServerData', function () {
            describe('data is empty', function () {
                it("should return data empty error", function () {
                    var data = [];
                    expect(function () {
                        sut.decorateServerData(data);
                    }).toThrow(new Error("No data received from server"));
                });
            });
        });


    });
});
