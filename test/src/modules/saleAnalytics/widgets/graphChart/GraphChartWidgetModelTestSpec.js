/**
 * Created by justin on 12/30/14.
 */

define([
    'modules/saleAnalytics/widgets/graphChart/GraphChartWidgetModel',
    'config'
], function (GraphChartWidgetModel, Configuration) {
    'use strict';
    describe("GraphChartWidgetModel", function () {
        var sut, ajaxService;

        beforeEach(function () {
            ajaxService = {
                rawAjaxRequest: function () {
                }
            };
            sut = GraphChartWidgetModel.newInstance(ajaxService);
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
                spyOn(String.prototype, 'format').and.callThrough();
                sut.fetchPoint = "fetch point url";
                sut.getUrl();
                expect(sut.fetchPoint.format).toHaveBeenCalledWith(sut.currentFilter);
            });
        });

        describe("_reload", function () {
            it('should call decoration method to decorate data from server', function (done) {
                spyOn(sut, 'decorateServerData');
                spyOn(ajaxService, 'rawAjaxRequest').and.returnValue(exerciseFakeOkPromise());
                sut.fetchPoint = "fake_url";
                sut._reload().then(function () {
                    expect(sut.decorateServerData).toHaveBeenCalled();
                    done();
                });
            });
        });

        describe("decorateServerData", function () {
            it("should return correct decorated format", function () {
                sut.filters = [];
                var serverInput = {
                    Series: [{
                        Name: "Series1",
                        Points: [{
                            Y: 0
                        }, {
                            Y: 1
                        }, {
                            Y: 2
                        }]
                    }, {
                        Name: "Series2",
                        Points: [{
                            Y: 4
                        }, {
                            Y: 5
                        }, {
                            Y: 6
                        }]
                    }],
                    Labels: [["Label1", "Label2", "Label3"]]
                };

                var expectedOutput = {
                    data: {
                        params: {
                            axis: {
                                x: ["Label1", "Label2", "Label3"],
                                y: ""
                            },
                            fields: [{
                                name: "Series1",
                                data: [0, 1, 2]
                            }, {
                                name: "Series2",
                                data: [4, 5, 6]
                            }],
                            filters: []
                        }
                    }
                };

                var output = sut.decorateServerData(serverInput);
                expect(output).toEqual(expectedOutput);
            });
        });
    });
});
