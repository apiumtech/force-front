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

        describe('_getReports', function () {

            it('should call decoration method to decorate data from server', function (done) {
                spyOn(sut, 'decorateServerData');
                spyOn(ajaxService, 'rawAjaxRequest').and.returnValue(exerciseFakeOkPromise());
                sut._getReports().then(function () {
                    expect(sut.decorateServerData).toHaveBeenCalled();
                    done();
                });
            });

        });

        //describe('decorateServerData', function () {
        //    it("decorate server data", function () {
        //        var serverData = {};
        //        var expectedOutput = {
        //            data: [
        //                {
        //                    name: 'Folder',
        //                    description: '',
        //                    children: [
        //                        {
        //                            name: "Longtail",
        //                            desccription: '',
        //                            children: [
        //                                {
        //                                    name: "Alalisis Oportunidades",
        //                                    description: "Imforme que muestra riesgo por bajo uso por cliente",
        //                                },
        //                                {
        //                                    name: "Analisis Oportunidades IN/OUT",
        //                                    description: "Imforme que muestra riesgo por bajo uso por cliente",
        //                                },
        //                                {
        //                                    name: "Analisis Oportunidades OUT",
        //                                    description: "Imforme que muestra riesgo por bajo uso por cliente",
        //                                }
        //                            ]
        //                        }
        //                    ]
        //                }
        //            ]
        //        };
        //        var output = sut.decorateServerData(serverData);
        //        expect(output).toEqual(expectedOutput);
        //    });
        //});

    });
});