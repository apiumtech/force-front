/**
 * Created by justin on 2/11/15.
 */
describe("MapChartWidgetModel", function () {
    var MapChartWidgetModel = app.getModel("models/MapChartWidgetModel");
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
        it("should format the Api with the current filter", function(){
            var fakeFormatted="fake_formatted_string";

           spyOn(String.prototype, 'format').and.callFake(function(fake){
               return fakeFormatted;
           });

            var result = sut.getUrl();

            expect(String.prototype.format).toHaveBeenCalledWith(sut.currentFilter);
            expect(result).toEqual(fakeFormatted);
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

    //describe("decorateServerData", function () {
    //    describe("currentFilter is checkins", function(){
    //        it("should return correct decorated format", function () {
    //            sut.filters = [];
    //            var serverInput = {
    //
    //            };
    //
    //            var expectedOutput = {
    //                data: {
    //                    params: {
    //                        axis: {
    //                            x: ["Label1", "Label2", "Label3"],
    //                            y: ""
    //                        },
    //                        fields: [{
    //                            name: "Series1",
    //                            data: [0, 1, 2]
    //                        }, {
    //                            name: "Series2",
    //                            data: [4, 5, 6]
    //                        }],
    //                        filters: []
    //                    }
    //                }
    //            };
    //
    //            var output = sut.decorateServerData(serverInput);
    //            expect(output).toEqual(expectedOutput);
    //        });
    //    });
    //});

    describe("changeFilterTab", function () {
        it("should call addQuery from base to add filter", function () {
            var sut = MapChartWidgetModel.newInstance();
            sut.changeFilterTab("tab1");
            expect(sut.currentFilter).toEqual("tab1");
        });
    });
});