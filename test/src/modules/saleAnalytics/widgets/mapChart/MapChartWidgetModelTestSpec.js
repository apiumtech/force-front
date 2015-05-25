/**
 * Created by justin on 2/11/15.
 */
define([
    'modules/saleAnalytics/widgets/mapChart/MapChartWidgetModel',
    'modules/saleAnalytics/widgets/WidgetBase',
    'config'
], function (MapChartWidgetModel, WidgetBase, Configuration) {
    'use strict';
    describe("MapChartWidgetModel", function () {

        var sut, ajaxService;

        beforeEach(function () {
            ajaxService = {
                rawAjaxRequest: function () {
                }
            };
            sut = MapChartWidgetModel.newInstance(ajaxService);
        });

        describe('getUrl', function () {
            it("should format the Api with the current filter", function () {

                sut.currentFilter = "fake_filter";
                var expectedUrl = Configuration.api.geographicalWidgetDistributionDataApi.format(sut.currentFilter);
                spyOn(String.prototype, 'format').and.callThrough();

                var result = sut.getUrl();

                expect(Configuration.api.geographicalWidgetDistributionDataApi.format).toHaveBeenCalledWith(sut.currentFilter);
                expect(result).toEqual(expectedUrl);
            });
        });

        describe("_reload", function () {
            it('should call decoration method to decorate data from server', function (done) {
                spyOn(sut, 'decorateServerData');
                spyOn(ajaxService, 'rawAjaxRequest').and.returnValue(exerciseFakeOkPromise());
                sut._reload().then(function () {
                    expect(sut.decorateServerData).toHaveBeenCalled();
                    done();
                });
            });
        });

        describe("decorateCheckins", function () {

            it("should return correct decorated format", function () {
                sut.filters = [];
                var serverInput = {
                    "Series": [
                        {
                            "Name": "checkins geographical distribution",
                            "Points": [
                                {
                                    "Y": -33.453056,
                                    "X": -70.594086,
                                    "Checkins": 1765
                                },
                                {
                                    "Y": -23.65,
                                    "X": -70.39999999999999,
                                    "Checkins": 1765
                                },
                                {
                                    "Y": 35.689506,
                                    "X": 139.6917,
                                    "Checkins": 3
                                }
                            ]
                        }
                    ],
                    "Labels": [
                        []
                    ]
                };

                var expectedOutput = {
                    "data": {
                        "params": [
                            {
                                "Activity": 1765,
                                "Latitude": -33.453056,
                                "Longitude": -70.594086
                            },
                            {
                                "Activity": 1765,
                                "Latitude": -23.65,
                                "Longitude": -70.39999999999999
                            },
                            {
                                "Activity": 3,
                                "Latitude": 35.689506,
                                "Longitude": 139.6917
                            }
                        ],
                        "filters": []
                    }
                };

                var output = sut.decorateCheckins(serverInput);
                expect(output).toEqual(expectedOutput);
            });

        });

        describe("decorateUsers", function () {

            it("should return correct decorated format", function () {
                sut.filters = [];
                var serverInput = {
                    "Series": [
                        {
                            "Name": "users geographical distribution",
                            "Points": [
                                {
                                    "Y": 41.3912049,
                                    "X": 2.1294551,
                                    "Name": "Demo1",
                                    "Surname": "Demos1",
                                    "Description": "desc1"
                                },
                                {
                                    "Y": 41.3883789,
                                    "X": 2.1269342,
                                    "Name": "Demo2",
                                    "Surname": "Demos2",
                                    "Description": "desc2"
                                },
                                {
                                    "Y": 40.54424281666666,
                                    "X": -3.6193708833333336,
                                    "Name": "Demo3",
                                    "Surname": "Demos3",
                                    "Description": "desc3"
                                }
                            ]
                        }
                    ],
                    "Labels": [
                        []
                    ]
                };

                var expectedOutput = {
                    "data": {
                        "params": [
                            {
                                "FullName": 'Demo1 Demos1',
                                "Latitude": 41.3912049,
                                "Longitude": 2.1294551
                            },
                            {
                                "FullName": 'Demo2 Demos2',
                                "Latitude": 41.3883789,
                                "Longitude": 2.1269342
                            },
                            {
                                "FullName": 'Demo3 Demos3',
                                "Latitude": 40.54424281666666,
                                "Longitude": -3.6193708833333336
                            }
                        ],
                        "filters": []
                    }
                };

                var output = sut.decorateUsers(serverInput);
                expect(output).toEqual(expectedOutput);
            });

        });

        describe("decorateServerData", function () {
            describe('current filter is "checkins" ', function () {
                it("should call decoration method for the checkins data and return its result", function () {
                    sut.currentFilter = 'checkins';
                    var fakeDecorated = {"blah": "nothing, dont look"};
                    var inputData = {"msg": "this is msg from the stupid server"};
                    spyOn(sut, 'decorateCheckins').and.returnValue(fakeDecorated);
                    var actual = sut.decorateServerData(inputData);
                    expect(sut.decorateCheckins).toHaveBeenCalledWith(inputData);
                    expect(actual).toEqual(fakeDecorated);
                });
            });

            describe('current filter is "users" ', function () {
                it("should call decoration method for the users data and return its result", function () {
                    sut.currentFilter = 'users';
                    var fakeDecorated = {"blah": "nothing, dont look"};
                    var inputData = {"msg": "this is msg from the stupid server"};
                    spyOn(sut, 'decorateUsers').and.returnValue(fakeDecorated);
                    var actual = sut.decorateServerData(inputData);
                    expect(sut.decorateUsers).toHaveBeenCalledWith(inputData);
                    expect(actual).toEqual(fakeDecorated);
                });
            });

            describe('current filter is invalid', function () {
                [
                    'activity', 'parents', 'grandparents', 'whatever', 'stupidmsg'
                ].forEach(function (test) {
                        it("should call nothing and return the input", function () {
                            sut.currentFilter = test;
                            var inputData = {"msg": "this is msg from the stupid server"};
                            spyOn(sut, 'decorateUsers');
                            spyOn(sut, 'decorateCheckins');
                            var actual = sut.decorateServerData(inputData);
                            expect(sut.decorateUsers).not.toHaveBeenCalled();
                            expect(sut.decorateCheckins).not.toHaveBeenCalled();
                            expect(actual).toEqual(inputData);
                        });
                    });
            });
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
    });

});