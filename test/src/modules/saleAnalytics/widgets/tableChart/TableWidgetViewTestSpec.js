/**
 * Created by justin on 12/22/14.
 */
define([
    'angular',
    'modules/saleAnalytics/widgets/tableChart/TableWidgetView',
    'modules/saleAnalytics/widgets/tableChart/TableWidgetPresenter'
], function (angular, TableWidgetView, TableWidgetPresenter) {
    'use strict';

    describe("TableWidgetView", function () {

        var sut, scope, element, presenter;

        var fakeResponseData = {
            data: {
                widgetType: "table",
                params: {
                    columns: ["fake1", "fake2", "fake3"],
                    data: [
                        ["row1-1", "row1-2", "row1-3"],
                        ["row2-1", "row2-2", "row2-3"],
                        ["row3-1", "row3-2", "row3-3"],
                        ["row4-1", "row4-2", "row4-3"]
                    ]

                }
            }
        };

        beforeEach(inject(function(_$rootScope_){
            scope = _$rootScope_.$new();
            element = angular.element('<div />');
            presenter = mock(TableWidgetPresenter);
            sut = new TableWidgetView(scope, element, presenter);
        }));

        describe("configureEvents", function () {
            var outerWidgetScope = {
                widgetId: 10,
                order: 10
            };

            [{
                method: "toggleColumn", test: toggleColumnTestExercise
            }, {
                method: "restoreColumnDisplay", test: restoreColumnDisplayTestExercise
            }, {
                method: "isImage", test: isImageTestExercise
            }].forEach(function (test) {
                    var method = test.method;
                    describe("calling fn." + method, test.test);
                });

            function isImageTestExercise() {
                [{
                    testString: 12345, expected: false
                }, {
                    testString: "/image/img.jpg", expected: true
                }, {
                    testString: "/image/abc.gif", expected: true
                }, {
                    testString: "/image/abc.png", expected: true
                }, {
                    testString: "/path/to/image/img.jpg", expected: true
                }, {
                    testString: "/path/to/image/abc.gif", expected: true
                }, {
                    testString: "/path/to/image/abc.png", expected: true
                }, {
                    testString: "simple string", expected: false
                }, {
                    testString: "/path/to/image.jpg/", expected: false
                }, {
                    testString: "/path/to/image.gif/abcdef_string", expected: false
                }, {
                    testString: "/path/to/image.png/abcdef_string", expected: false
                }, {
                    testString: ".jpg/path/to/image.jpg/abcdef_string", expected: false
                }, {
                    testString: ".png/path/to/image.gif/abcdef_string", expected: false
                }, {
                    testString: ".gif/path/to/image.png/abcdef_string", expected: false
                }].forEach(function (test) {
                        describe("with test string: " + test.testString, function () {
                            it("should return " + test.expected + "", function () {
                                expect(sut.fn.isImage(test.testString)).toEqual(test.expected);
                            });
                        });
                    });
            };

            function toggleColumnTestExercise() {
                var event;
                beforeEach(function () {
                    event = {
                        stopPropagation: jasmine.createSpy()
                    };

                    sut.columns = [{
                        name: "column1",
                        isShown: true
                    }, {
                        name: "column2",
                        isShown: false
                    }, {
                        name: "column3",
                        isShown: true
                    }];
                    sut.renderChart = jasmine.createSpy();
                });

                describe("event is defined", function () {
                    it("should show column if it's hidden", function () {
                        sut.fn.toggleColumn("column2", event);
                        expect(event.stopPropagation).toHaveBeenCalled();
                    });
                });

                it("should show column if it's hidden", function () {
                    sut.fn.toggleColumn("column2", event);
                    expect(sut.columns[1].isShown).toEqual(true);
                });

                it("should hide column if it's showing", function () {
                    sut.fn.toggleColumn("column3", event);
                    expect(sut.columns[2].isShown).toEqual(false);
                });

                it("should call renderChart to refresh", function () {
                    sut.fn.toggleColumn("column3", event);
                    expect(sut.renderChart).toHaveBeenCalled();
                });
            }

            function restoreColumnDisplayTestExercise() {
                beforeEach(function () {
                    sut.columns = [{
                        name: "column1",
                        isShown: true
                    }, {
                        name: "column2",
                        isShown: false
                    }, {
                        name: "column3",
                        isShown: false
                    }];
                    sut.renderChart = jasmine.createSpy();
                });

                it("should show all available columns", function () {
                    sut.fn.restoreColumnDisplay();
                    expect(sut.columns[1].isShown).toEqual(true);
                    expect(sut.columns[2].isShown).toEqual(true);
                });

                it("should call renderChart to refresh chart", function () {
                    sut.fn.restoreColumnDisplay();
                    expect(sut.renderChart).toHaveBeenCalled();
                });
            }
        });

        describe("onReloadWidgetSuccess", function () {
            beforeEach(function () {
                sut.event = {};
                sut.event.onReloadWidgetDone = function () {
                };
                spyOn(sut, 'assignColumnsData');
                spyOn(sut, '_onReloadWidgetSuccess');
                spyOn(sut, 'renderChart');
            });

            it("Should assign server data's param to scope", function () {
                sut.onReloadWidgetSuccess(fakeResponseData);
                expect(sut.data).toEqual(fakeResponseData.data.params);
            });

            it("Should call assignColumnsData", function () {
                sut.onReloadWidgetSuccess(fakeResponseData);
                expect(sut.assignColumnsData).toHaveBeenCalledWith(fakeResponseData.data.params.columns);
            });

            it("Should call renderChart", function () {
                sut.onReloadWidgetSuccess(fakeResponseData);
                expect(sut.renderChart).toHaveBeenCalledWith();
            });

            it("Should call _onReloadWidgetSuccess on base", function () {
                spyOn(sut.event, 'onReloadWidgetDone');
                sut.onReloadWidgetSuccess(fakeResponseData);
                expect(sut._onReloadWidgetSuccess).toHaveBeenCalled();
            });
        });

        describe('onReloadCommandReceived', function () {
            it("should invoke the method onReloading", function () {
                sut.event.onReloading = jasmine.createSpy();

                sut.onReloadCommandReceived();
                expect(sut.event.onReloading).toHaveBeenCalled();
            });
        });

        describe("getDisplayColumnIndices", function () {

            describe("input is not valid", function () {
                [{
                    input: [{
                        name: "column1"
                    }, {
                        name: "column1",
                        isShown: false
                    }]
                }, {
                    input: []
                }, {
                    input: null
                }, {
                    input: {
                        length: "fake data"
                    }
                }].forEach(function (test) {
                        it("should throw exception", function () {
                            var input = test.input;

                            expect(function () {
                                sut.getDisplayColumnIndices(input);
                            }).toThrow(new Error("Data is not valid"));
                        });
                    });
            });

            describe("input is valid", function () {
                [{
                    input: [{
                        name: "column1",
                        isShown: true
                    }, {
                        name: "column2",
                        isShown: true
                    }, {
                        name: "column3",
                        isShown: true
                    }, {
                        name: "column4",
                        isShown: true
                    }],
                    output: [0, 1, 2, 3]
                }, {
                    input: [{
                        name: "column1",
                        isShown: true
                    }, {
                        name: "column2",
                        isShown: false
                    }, {
                        name: "column3",
                        isShown: false
                    }, {
                        name: "column4",
                        isShown: true
                    }],
                    output: [0, 3]
                }].forEach(function (test) {
                        it("should return correct value", function () {
                            var input = test.input;

                            var expected = test.output;
                            var actual = sut.getDisplayColumnIndices(input);
                            expect(actual).toEqual(expected);
                        });
                    });
            });
        });

        describe("getDisplayData", function () {

            describe("input data is invalid", function () {
                it("should throw exception if any rows in input data has different number of element", function () {
                    var data = [
                            [1, 2, 3, 4],
                            [1, 2, 3, 4, 5],
                            [1, 2, 3, 4, 6]
                        ],
                        displayColumns = [0, 1, 2, 3];

                    expect(function () {
                        sut.getDisplayData(data, displayColumns);
                    }).toThrow(new Error("Input data not valid"));
                });

                it("should throw exception if number of display columns is greater than columns in input data", function () {
                    var data = [
                            [1, 2, 3, 4],
                            [1, 2, 3, 4],
                            [1, 2, 3, 4],
                            [1, 2, 3, 4],
                            [1, 2, 3, 4]
                        ],
                        displayColumns = [0, 1, 2, 3, 4, 5, 6];

                    expect(function () {
                        sut.getDisplayData(data, displayColumns);
                    }).toThrow(new Error("Columns to display are greater than input data"));
                });

                it("should throw exception if any index is greater than columns of input data", function () {
                    var data = [
                            [1, 2, 3, 4],
                            [1, 2, 3, 4],
                            [1, 2, 3, 4],
                            [1, 2, 3, 4],
                            [1, 2, 3, 4]
                        ],
                        displayColumns = [0, 2, 4];

                    expect(function () {
                        sut.getDisplayData(data, displayColumns);
                    }).toThrow(new Error("Display column index is greater than input data"));
                });
            });

            describe("input data is valid", function () {
                it("should return correct data", function () {
                    var data = [
                            [1, 2, 3, 4],
                            [1, 2, 3, 4],
                            [1, 2, 3, 4],
                            [1, 2, 3, 4],
                            [1, 2, 3, 4]
                        ],
                        displayColumns = [0, 2, 3];

                    var output = [
                        [1, 3, 4],
                        [1, 3, 4],
                        [1, 3, 4],
                        [1, 3, 4],
                        [1, 3, 4]
                    ];

                    var actual = sut.getDisplayData(data, displayColumns);
                    expect(actual).toEqual(output);
                });
            });
        });

        describe("assignColumnsData", function () {
            describe("no columns defined previously", function () {
                it("should assign default columns with all columns are shown", function () {
                    sut.columns = [];
                    var inputData = ["column1", "column2", "column3"];

                    var expected = [{
                        name: "column1",
                        isShown: true
                    }, {
                        name: "column2",
                        isShown: true
                    }, {
                        name: "column3",
                        isShown: true
                    }];
                    sut.assignColumnsData(inputData);
                    expect(sut.columns).toEqual(expected);
                });
            });

            describe("Has columns previously defined", function () {
                function getColumnsData() {
                    return [{
                        name: "column1",
                        isShown: true
                    }, {
                        name: "column2",
                        isShown: false
                    }, {
                        name: "column3",
                        isShown: true
                    }];
                }

                it("should keep current data if data same as previous", function () {

                    sut.columns = getColumnsData();
                    var expected = getColumnsData();

                    var inputData = ["column1", "column2", "column3"];
                    sut.assignColumnsData(inputData);
                    expect(sut.columns).toEqual(expected);
                });

                it("should remove old column data and add new column data if different", function () {
                    sut.columns = getColumnsData();

                    var inputData = ["column fake 1", "column fake 2", "column fake 3", "column fake 4"];
                    var expected = [{
                        name: "column fake 1",
                        isShown: true
                    }, {
                        name: "column fake 2",
                        isShown: true
                    }, {
                        name: "column fake 3",
                        isShown: true
                    }, {
                        name: "column fake 4",
                        isShown: true
                    }];

                    sut.assignColumnsData(inputData);
                    expect(sut.columns).toEqual(expected);
                });
            });
        });

        describe("renderChart", function () {
            beforeEach(function () {
                sut.data = fakeResponseData.data.params;
                sut.getDisplayData = function () {
                };
            });

            it("should call getDisplayColumnIndices", function () {
                spyOn(sut, 'getDisplayColumnIndices');
                sut.renderChart();
                expect(sut.getDisplayColumnIndices).toHaveBeenCalledWith(sut.columns);
            });

            it("should call getDisplayData", function () {
                var indices = [0, 2];

                sut.getDisplayColumnIndices = function (columns) {
                    return indices;
                };

                spyOn(sut, 'getDisplayData');

                sut.columns = [{
                    name: "column1",
                    isShown: true
                }, {
                    name: "column1",
                    isShown: false
                }, {
                    name: "column1",
                    isShown: true
                }];

                sut.renderChart();
                expect(sut.getDisplayData).toHaveBeenCalledWith(sut.data.data, indices);
            });
        });
    });

});