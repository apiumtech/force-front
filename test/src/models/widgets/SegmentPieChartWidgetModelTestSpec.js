/**
 * Created by justin on 1/26/15.
 */
describe("SegmentPieChartWidgetModel", function () {
    var SegmentPieChartWidgetModel = app.getModel("models/widgets/SegmentPieChartWidgetModel");
    var Configuration = app.getService("Configuration");

    var sut, ajaxService;

    beforeEach(function () {
        ajaxService = {
            rawAjaxRequest: function () {
            }
        };
        sut = SegmentPieChartWidgetModel.newInstance(ajaxService);
    });

    describe("changeFilterTab", function () {
        it("should call addQuery from base to add filter", function () {
            spyOn(sut, 'addQuery');
            sut.changeFilterTab("tab1");
            expect(sut.addQuery).toHaveBeenCalledWith("selectedFilter", "tab1");
        });
    });

    describe('getUrl', function () {
        it("should format the Api with the current filter", function(){

            sut.currentFilter="fake_filter";
            var expectedUrl = Configuration.api.segmentWidgetDistributionDataApi.format(sut.currentFilter);
            spyOn(String.prototype, 'format').and.callThrough();

            var result = sut.getUrl();

            expect(Configuration.api.segmentWidgetDistributionDataApi.format).toHaveBeenCalledWith(sut.currentFilter);
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