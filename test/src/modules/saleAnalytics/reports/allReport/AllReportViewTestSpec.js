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

        describe('openReportFolder', function () {
            it("", function () {

            });
            it("should correctly set the new data to reports", function () {
                var input = [{
                    "id": 1,
                    "name": "Folder",
                    "type": "folder",
                    "idParent": -1,
                    "children": [{
                        "id": 3,
                        "name": "Folder",
                        "type": "folder",
                        "idParent": 1,

                        "children": [{
                            "id": 4,
                            "name": "Folder",
                            "type": "folder",
                            "idParent": 3,

                            "children": [{
                                "id": 6,
                                "name": "Analisis Oportunidades IN/OUT 6",
                                "description": "Imforme que muestra riesgo por bajo uso por cliente",
                                "idParent": 4,
                                "type": "report"

                            }, {
                                "id": 7,
                                "name": "Analisis Oportunidades IN/OUT 7",
                                "description": "Imforme que muestra riesgo por bajo uso por cliente",
                                "idParent": 4,
                                "type": "report"

                            }, {
                                "id": 8,
                                "name": "Analisis Oportunidades IN/OUT 8",
                                "description": "Imforme que muestra riesgo por bajo uso por cliente",
                                "idParent": 4,
                                "type": "report"

                            }, {
                                "id": 9,
                                "name": "Analisis Oportunidades IN/OUT 9",
                                "description": "Imforme que muestra riesgo por bajo uso por cliente",
                                "idParent": 4,
                                "type": "report"

                            }]
                        }, {
                            "id": 5,
                            "name": "Analisis Oportunidades IN/OUT 5",
                            "description": "Imforme que muestra riesgo por bajo uso por cliente",
                            "idParent": 3,
                            "type": "report"

                        }]
                    }]
                }, {
                    "id": 2,
                    "name": "Folder",
                    "type": "folder",
                    "idParent": -1,
                    "children": [{
                        "id": 10,
                        "name": "Analisis Oportunidades IN/OUT 10",
                        "description": "Imforme que muestra riesgo por bajo uso por cliente",
                        "idParent": 2,
                        "type": "report"

                    }, {
                        "id": 11,
                        "name": "Analisis Oportunidades IN/OUT 11",
                        "description": "Imforme que muestra riesgo por bajo uso por cliente",
                        "idParent": 2,
                        "type": "report"

                    }]
                }];
                var expectedOutput = [{
                    "id": 1,
                    "name": "Folder",
                    "type": "folder",
                    "idParent": -1,
                    "isOpen": true,
                    "children": [{
                        "id": 3,
                        "name": "Folder",
                        "type": "folder",
                        "idParent": 1,
                        "isOpen": true,
                        "children": [{
                            "id": 4,
                            "name": "Folder",
                            "type": "folder",
                            "idParent": 3,
                            "isOpen": true,
                            "children": [{
                                "id": 6,
                                "name": "Analisis Oportunidades IN/OUT 6",
                                "description": "Imforme que muestra riesgo por bajo uso por cliente",
                                "idParent": 4,
                                "type": "report"

                            }, {
                                "id": 7,
                                "name": "Analisis Oportunidades IN/OUT 7",
                                "description": "Imforme que muestra riesgo por bajo uso por cliente",
                                "idParent": 4,
                                "type": "report"

                            }, {
                                "id": 8,
                                "name": "Analisis Oportunidades IN/OUT 8",
                                "description": "Imforme que muestra riesgo por bajo uso por cliente",
                                "idParent": 4,
                                "type": "report"

                            }, {
                                "id": 9,
                                "name": "Analisis Oportunidades IN/OUT 9",
                                "description": "Imforme que muestra riesgo por bajo uso por cliente",
                                "idParent": 4,
                                "type": "report"

                            }]
                        }, {
                            "id": 5,
                            "name": "Analisis Oportunidades IN/OUT 5",
                            "description": "Imforme que muestra riesgo por bajo uso por cliente",
                            "idParent": 3,
                            "type": "report"

                        }]
                    }]
                }, {
                    "id": 2,
                    "name": "Folder",
                    "type": "folder",
                    "idParent": -1,
                    "children": [{
                        "id": 10,
                        "name": "Analisis Oportunidades IN/OUT 10",
                        "description": "Imforme que muestra riesgo por bajo uso por cliente",
                        "idParent": 2,
                        "type": "report"

                    }, {
                        "id": 11,
                        "name": "Analisis Oportunidades IN/OUT 11",
                        "description": "Imforme que muestra riesgo por bajo uso por cliente",
                        "idParent": 2,
                        "type": "report"

                    }]
                }];

                sut.reports = input;

                sut.openReportFolder(4);
                expect(sut.reports).toEqual(expectedOutput);
            });

        });

    });
});