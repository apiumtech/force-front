define([
    'modules/saleAnalytics/widgets/scatterChart/ScatterChartWidgetModel',
    'config'
], function (ScatterChartWidgetModel, Configuration) {
    'use strict';

    describe('ScatterChartWidgetModel', function () {
        var sut, ajaxService;

        beforeEach(function () {
            ajaxService = {
                rawAjaxRequest: function () {
                }
            };
            sut = ScatterChartWidgetModel.newInstance(ajaxService);
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
                            "Name": "WidgetName",
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
                    name: "WidgetName",
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
                            [-2, -5, "tooltipHTML01", null, null, null, null],
                            [-5, 2, "tooltipHTML01", null, null, null, null],
                            [3, null, null, 1.55, "tooltipHTML01", null, null],
                            [-5, null, null, null, null, 4, "tooltipHTML01"]
                        ]
                    }
                };
                //spyOn(sut, 'generateTooltip').and.returnValue('tooltipHTML01');
                var spyObj = {
                    spy: function () {
                    }
                };
                spyOn(spyObj, 'spy').and.returnValue('tooltipHTML01');
                var output = sut.decorateServerData(spyObj.spy, serverInput);
                expect(output).toEqual(expectedOutput);
                expect(spyObj.spy).toHaveBeenCalled();
            });
        });


    });

});