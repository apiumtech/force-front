/**
 * Created by justin on 2/11/15.
 */
describe("MapChartWidgetModel", function () {
    var MapChartWidgetModel = app.getModel("models/widgets/MapChartWidgetModel");
    var WidgetBase = app.getService("services/WidgetBase");
    var Configuration = app.getService("Configuration");

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

    describe("decorateServerData", function () {
        describe("currentFilter is checkins", function () {
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
                                    "Checkins": 1
                                },
                                {
                                    "Y": -23.65,
                                    "X": -70.39999999999999,
                                    "Checkins": 1
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
                                "Activity": "109,0831182",
                                "CompanyName": "Électricité Solaire SLU",
                                "IdCompany": "595",
                                "IdTipoCheckIn": null,
                                "Latitude": "-33.453056",
                                "Longitude": "-70.594086"
                            },
                            {
                                "Activity": "101,39225643",
                                "CompanyName": "Investment 73 SL",
                                "IdCompany": "600",
                                "IdTipoCheckIn": null,
                                "Latitude": "-23.65",
                                "Longitude": "-70.39999999999999"
                            },
                            {
                                "Activity": "100,45394005",
                                "CompanyName": "Éditions Monaco",
                                "IdCompany": "598",
                                "IdTipoCheckIn": null,
                                "Latitude": "35.689506",
                                "Longitude": "139.6917"
                            }
                        ]
                    }
                };

                var output = sut.decorateServerData(serverInput);
                expect(output).toEqual(expectedOutput);
            });
        });
    });

    describe("changeFilterTab", function () {
        it("should call addQuery from base to add filter", function () {
            var sut = MapChartWidgetModel.newInstance();
            sut.changeFilterTab("tab1");
            expect(sut.currentFilter).toEqual("tab1");
        });
    });
})
;