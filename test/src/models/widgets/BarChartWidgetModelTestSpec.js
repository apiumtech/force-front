/**
 * Created by justin on 1/26/15.
 */
describe("BarChartWidgetModel", function () {
    var BarChartWidgetModel = app.getModel("models/widgets/BarChartWidgetModel");
    var Configuration = app.getService("Configuration");

    var sut, ajaxService;

    beforeEach(function () {
        ajaxService = {
            rawAjaxRequest: function () {
            }
        };
        sut = BarChartWidgetModel.newInstance(ajaxService);
    });

    describe('changeQueryFilter', function () {
        beforeEach(function () {
            sut.filters = [{
                name: 'f1',
                key: 'f1'
            }, {
                name: 'f2',
                key: 'f2'
            }, {
                name: 'f3',
                key: 'f3'
            }];
        });
        describe('the selected filter is not available in acceptance list', function () {
            it('should assign the default one (the first element\'s key in the list to currentFilter', function () {
                sut.changeQueryFilter('f10000');
                expect(sut.currentFilter).toEqual('f1');
            });
        });

        describe('the selected filter is in acceptance list', function () {
            it('should assign the input value to currentFilter', function () {
                sut.changeQueryFilter('f3');
                expect(sut.currentFilter).toEqual('f3');
            });
        });
    });

    describe('getUrl', function () {
        it("should format the Api with the current filter", function () {

            sut.currentFilter = "fake_filter";
            var expectedUrl = Configuration.api.coverageWidgetDistributionDataApi.format(sut.currentFilter);
            spyOn(String.prototype, 'format').and.callThrough();

            var result = sut.getUrl();

            expect(Configuration.api.coverageWidgetDistributionDataApi.format).toHaveBeenCalledWith(sut.currentFilter);
            expect(result).toEqual(expectedUrl);
        });
    });

    describe('_reload', function () {
        it('should call decoration method to decorate data from server', function (done) {
            spyOn(sut, 'decorateServerData');
            // TODO: This is the real one
            //spyOn(ajaxService, 'rawAjaxRequest').and.returnValue(exerciseFakeOkPromise());
            spyOn(sut.fakeAjaxService, 'rawAjaxRequest').and.returnValue(exerciseFakeOkPromise());
            sut._reload().then(function () {
                // TODO: This is the real one
                //expect(ajaxService.rawAjaxRequest).toHaveBeenCalled();
                expect(sut.fakeAjaxService.rawAjaxRequest).toHaveBeenCalled();
                expect(sut.decorateServerData).toHaveBeenCalled();
                done();
            });
        });
    });

    describe("decorateServerData", function () {
        it("should return correct decorated format", function () {
            var filters = [{
                name: "Account Type",
                key: "AccountType"
            }, {
                name: "Segment",
                key: "Segment"
            }];
            sut.filters = filters;
            var serverInput = {
                "Series": [
                    {
                        "Name": "A",
                        "Points": [
                            {
                                "Y": 17
                            },
                            {
                                "Y": 26
                            }
                        ]
                    },
                    {
                        "Name": "B",
                        "Points": [
                            {
                                "Y": 16
                            },
                            {
                                "Y": 23
                            }
                        ]
                    },
                    {
                        "Name": "C",
                        "Points": [
                            {
                                "Y": 40
                            },
                            {
                                "Y": 54
                            }
                        ]
                    },
                    {
                        "Name": "CA",
                        "Points": [
                            {
                                "Y": 6
                            },
                            {
                                "Y": 12
                            }
                        ]
                    },
                    {
                        "Name": "D",
                        "Points": [
                            {
                                "Y": 32
                            },
                            {
                                "Y": 41
                            }
                        ]
                    },
                    {
                        "Name": "E",
                        "Points": [
                            {
                                "Y": 55
                            },
                            {
                                "Y": 56
                            }
                        ]
                    },
                    {
                        "Name": "F",
                        "Points": [
                            {
                                "Y": 12
                            },
                            {
                                "Y": 15
                            }
                        ]
                    },
                    {
                        "Name": "-",
                        "Points": [
                            {
                                "Y": 10
                            },
                            {
                                "Y": 14
                            }
                        ]
                    }
                ],
                "Labels": [
                    [
                        "hard",
                        "soft"
                    ]
                ]
            };

            var expectedOutput = {
                "data": {
                    "params": {
                        "filters": filters,
                        "axis": {"x": ["A", "B", "C", "CA", "D", "E", "F", "-"]},
                        "bars": [{
                            "data": [17, 16, 40, 6, 32, 55, 12, 10],
                            "label": "hard"
                        }, {
                            "data": [26, 23, 54, 12, 41, 56, 15, 14],
                            "label": "soft"
                        }]
                    }
                }
            };

            var output = sut.decorateServerData(serverInput);
            expect(output).toEqual(expectedOutput);
        });
    });

})
;