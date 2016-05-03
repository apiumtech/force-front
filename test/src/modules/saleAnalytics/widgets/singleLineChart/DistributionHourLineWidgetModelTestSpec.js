/**
 * Created by justin on 2/2/15.
 */
define([
    'modules/saleAnalytics/widgets/singleLineChart/DistributionHourLineWidgetModel',
    'config'
], function (SingleLineChartWidgetModel, Configuration) {
    'use strict';
    describe("SingleLineChartWidgetModel", function () {

        var sut, ajaxService;

        beforeEach(function () {
            ajaxService = {
                rawAjaxRequest: function () {
                }
            };
            sut = SingleLineChartWidgetModel.newInstance(ajaxService);
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
                it('should assign the default one (the first element\'s key in the list to currentFilter', function(){
                    sut.changeQueryFilter({key:'f999'});
                    expect(sut.currentFilter).toEqual('f1');
                });
            });

            describe('the selected filter is in acceptance list', function () {
                it('should assign the input value to currentFilter', function(){
                    sut.changeQueryFilter({key:'f3'});
                    expect(sut.currentFilter).toEqual('f3');
                });
            });
        });

        describe('getUrl', function () {
            it("should format the Api with the current filter", function(){

                sut.currentFilter="fake_filter";
                var expectedUrl = Configuration.api.hourWidgetDistributionDataApi.format(sut.currentFilter);
                spyOn(String.prototype, 'format').and.callThrough();

                var result = sut.getUrl();

                expect(Configuration.api.hourWidgetDistributionDataApi.format).toHaveBeenCalledWith(sut.currentFilter);
                expect(result).toEqual(expectedUrl);
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
                            fields: [{
                                name: "Series1",
                                data: [0, 1, 2]
                            }],
                            filters: [{
                                name: "Total Activities",
                                key: "allActivities"
                            }, {
                                name: "Visits",
                                key: "visits"
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
