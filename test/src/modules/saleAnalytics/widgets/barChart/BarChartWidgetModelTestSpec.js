/**
 * Created by justin on 1/26/15.
 */
define([
    'modules/saleAnalytics/widgets/barChart/BarChartWidgetModel',
    'config'
], function (BarChartWidgetModel, Configuration) {
    'use strict';
    describe("BarChartWidgetModel", function () {

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
                    sut.changeQueryFilter({name:'f99',key:'f99'});
                    expect(sut.currentFilter).toEqual('f1');
                });
            });

            describe('the selected filter is in acceptance list', function () {
                it('should assign the input value to currentFilter', function () {
                    sut.changeQueryFilter({name:'f3',key:'f3'});
                    expect(sut.currentFilter).toEqual('f3');
                });
            });
        });

        describe('getUrl', function () {
            it("should format the Api with the current filter", function () {

                sut.currentFilter = "fake_filter";
                spyOn(String.prototype, 'format').and.callThrough();
                sut.fetchPoint = "fetch point url";
                var result = sut.getUrl();

                expect(sut.fetchPoint.format).toHaveBeenCalledWith(sut.currentFilter);
            });
        });

    });

});
