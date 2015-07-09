define([
    'modules/saleAnalytics/reports/allReport/AllReportView',
    'modules/saleAnalytics/reports/allReport/AllReportPresenter'
], function (AllReportView, AllReportPresenter) {
    'use strict';

    describe('AllReportView', function () {
        var sut, scope, presenter;
        describe('construct', function () {
            it("should call configureEvents", function () {
                spyOn(AllReportView.prototype, 'configureEvents').and.callThrough();
                new AllReportView(mockAngularScope(), {});
                expect(AllReportView.prototype.configureEvents).toHaveBeenCalled();
            });
        });

        beforeEach(function () {
            scope = mockAngularScope();
            presenter = mock(AllReportPresenter);
            sut = new AllReportView(scope, presenter);
        });

        describe("configureEvents", function () {
            describe("fn.loadReports", function () {
                beforeEach(function () {
                    sut.event.onReloading = jasmine.createSpy();
                    sut.fn.loadReports();
                });
                it("should turn on isLoading", function () {
                    expect(sut.isLoading).toBeTruthy();
                });
                it("should fire onLoadReports event", function () {
                    expect(sut.event.onReloading).toHaveBeenCalled();
                });
            });

        });

        describe('onReportsLoaded', function () {
            var data;
            beforeEach(function () {
                data = [{
                    alist: {
                        of: {
                            stupid: [
                                {reports: 10}
                            ]
                        }
                    }
                }];
                sut.isLoading = true;
                sut.onReportsLoaded(data);
            });
            it("should turn off isLoading", function () {
                expect(sut.isLoading).toBeFalsy();
            });

            it("should assign data to reports", function () {
                expect(sut.reports).toEqual(data);
            });
        });

        describe('reloadReports', function () {
            it("should call the loadReports function", function () {
                spyOn(sut.fn, "loadReports");
                sut.reloadReports();
                expect(sut.fn.loadReports).toHaveBeenCalled();
            });
        });

        describe('openReport', function () {

            it("should correctly set the new data to reports", function () {

                [
                    {
                        input: [{
                            "Id": 2,
                            "Name": "Folder",
                            "Type": "folder",
                            "IdParent": -1,
                            "children": [{
                                "Id": 10,
                                "Name": "Analisis Oportunidades IN/OUT 10",
                                "Description": "Imforme que muestra riesgo por bajo uso por cliente",
                                "IdParent": 2,
                                "Type": "report",
                                "selected": false
                            }, {
                                "Id": 11,
                                "Name": "Analisis Oportunidades IN/OUT 11",
                                "Description": "Imforme que muestra riesgo por bajo uso por cliente",
                                "IdParent": 2,
                                "Type": "report",
                                "selected": false
                            }]
                        }],
                        expectedOutput: [{
                            "Id": 2,
                            "Name": "Folder",
                            "Type": "folder",
                            isOpen: true,
                            "selected": false,
                            "IdParent": -1,
                            "children": [{
                                "Id": 10,
                                "Name": "Analisis Oportunidades IN/OUT 10",
                                "Description": "Imforme que muestra riesgo por bajo uso por cliente",
                                "IdParent": 2,
                                "Type": "report",
                                "selected": true

                            }, {
                                "Id": 11,
                                "Name": "Analisis Oportunidades IN/OUT 11",
                                "Description": "Imforme que muestra riesgo por bajo uso por cliente",
                                "IdParent": 2,
                                "Type": "report",
                                "selected": false
                            }]
                        }],
                        testID: 10
                    },
                    {
                        input: [{
                            "Id": 2,
                            "Name": "Folder",
                            "Type": "folder",
                            "IdParent": -1,
                            "children": [{
                                "Id": 10,
                                "Name": "Analisis Oportunidades IN/OUT 10",
                                "Description": "Imforme que muestra riesgo por bajo uso por cliente",
                                "IdParent": 2,
                                "Type": "report",
                                "selected": false
                            }, {
                                "Id": 11,
                                "Name": "Analisis Oportunidades IN/OUT 11",
                                "Description": "Imforme que muestra riesgo por bajo uso por cliente",
                                "IdParent": 2,
                                "Type": "report",
                                "selected": false
                            }]
                        }],
                        expectedOutput: [{
                            "Id": 2,
                            "Name": "Folder",
                            "Type": "folder",
                            isOpen: true,
                            "selected": true,
                            "IdParent": -1,
                            "children": [{
                                "Id": 10,
                                "Name": "Analisis Oportunidades IN/OUT 10",
                                "Description": "Imforme que muestra riesgo por bajo uso por cliente",
                                "IdParent": 2,
                                "Type": "report",
                                "selected": false

                            }, {
                                "Id": 11,
                                "Name": "Analisis Oportunidades IN/OUT 11",
                                "Description": "Imforme que muestra riesgo por bajo uso por cliente",
                                "IdParent": 2,
                                "Type": "report",
                                "selected": false
                            }]
                        }],
                        testID: 2
                    }
                ].forEach(function(testCase){
                        sut.reports = testCase.input;
                        sut.openReport(testCase.testID);
                        expect(sut.reports).toEqual(testCase.expectedOutput);
                    });
            });

        });

    });
});