/**
 * Created by justin on 1/26/15.
 */
define([
    'modules/saleAnalytics/widgets/pieChart/PieChartWidgetModel'
], function (PieChartWidgetModel) {
    'use strict';
    describe("PieChartWidgetModel", function () {

        var sut, ajaxService;

        beforeEach(function () {
            ajaxService = {
                rawAjaxRequest: function () {
                }
            };
            sut = PieChartWidgetModel.newInstance(ajaxService);
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
                    sut.changeQueryFilter({key:'f10000'});
                    expect(sut.currentFilter).toEqual({key:'f1',name:'f1'});
                });
            });

            describe('the selected filter is in acceptance list', function () {
                it('should assign the input value to currentFilter', function () {
                    sut.changeQueryFilter({key:'f3',name:'f3'});
                    expect(sut.currentFilter).toEqual({key:'f3',name:'f3'});
                });
            });
        });

        describe("decorateServerData", function () {
            it("should return correct decorated format", function () {
                sut.filters = [{
                    name: "Total Activities",
                    key: "allActivities"
                }, {
                    name: "Visits",
                    key: "visits"
                }];
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
                    }],
                    Labels: [["Label1", "Label2", "Label3"]]
                };

                var expectedOutput = {
                    data: {
                        params: {
                            params: [{
                                label: "Label1",
                                data: 0
                            }, {
                                label: "Label2",
                                data: 1
                            }, {
                                label: "Label3",
                                data: 2
                            }]
                        }
                    }
                };

                var output = sut.decorateServerData(serverInput);
                expect(output).toEqual(expectedOutput);
            });
        });

    });
});
