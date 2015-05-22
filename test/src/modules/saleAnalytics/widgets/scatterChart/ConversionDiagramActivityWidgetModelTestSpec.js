define([
    'modules/saleAnalytics/widgets/scatterChart/ConversionDiagramActivityWidgetModel',
    'config'
], function (ConversionDiagramActivityWidgetModel, Configuration) {
    'use strict';

    describe('ConversionDiagramActivityWidgetModel', function () {
        var sut, ajaxService;

        beforeEach(function () {
            ajaxService = {
                rawAjaxRequest: function () {
                }
            };
            sut = ConversionDiagramActivityWidgetModel.newInstance(ajaxService);
        });

        describe('getUrl', function () {
            it("should format the Api with the current filter", function () {

                sut.currentFilter = "fake_filter";
                var expectedUrl = Configuration.api.activityWidgetConversionDataApi;
                spyOn(String.prototype, 'format').and.callThrough();

                var result = sut.getUrl();

                expect(result).toEqual(expectedUrl);
            });
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

        describe("decorateServerData", function () {
            it("should return correct decorated format", function () {

                var serverInput = {
                    "Series": [
                        {
                            "Name": "",
                            "Points": [
                                {
                                    "X": -2,
                                    "Y": -5,
                                    "UserId": 1083,
                                    "Name": "Salvador",
                                    "Surname": "Subarroca",
                                    "Description": "AUTOMOCION"
                                },
                                {
                                    "X": -5,
                                    "Y": 2,
                                    "UserId": 1083,
                                    "Name": "Salvador",
                                    "Surname": "Subarroca",
                                    "Description": "AUTOMOCION"
                                },
                                {
                                    "X": 3,
                                    "Y": 1.55,
                                    "UserId": 1078,
                                    "Name": "test",
                                    "Surname": "iOS",
                                    "Description": "AUTOMOCION"
                                },
                                {
                                    "X": -5,
                                    "Y": 4,
                                    "UserId": 1077,
                                    "Name": "userpruebasupdate",
                                    "Surname": "userpruebasupdate",
                                    "Description": "AUTOMOCION"
                                }
                            ]
                        }
                    ],
                    "Labels": [
                        []
                    ]
                };

                var tooltip = {'type': 'string', 'role': 'tooltip', 'p': {'html': true}};

                var expectedOutput = {
                    data: {
                        columns: [
                            // The first column will always be x
                            {type: 'number', name: 'x'},
                            //
                            {
                                type: 'number',
                                name: 'Salvador'
                            },
                            tooltip,
                            //
                            {
                                type: 'number',
                                name: 'test'
                            },
                            tooltip,
                            //
                            {
                                type: 'number',
                                name: 'userpruebasupdate'
                            },
                            tooltip
                        ],
                        rows: [
                        ]
                    }
                };

                var output = sut.decorateServerData(serverInput);
                expect(output).not.toEqual(expectedOutput);
            });
        });
    });

});