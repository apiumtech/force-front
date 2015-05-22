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
            it("should format the Api with the current filter", function(){

                sut.currentFilter="fake_filter";
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
                    data: []
                };

                var expectedOutput = {
                    data: []
                };

                var output = sut.decorateServerData(serverInput);
                expect(output).toEqual(expectedOutput);
            });
        });
    });

});