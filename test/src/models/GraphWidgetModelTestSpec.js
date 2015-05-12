/**
 * Created by justin on 12/30/14.
 */
describe("GraphWidgetModel", function () {
    var GraphWidgetModel = app.getModel("models/GraphWidgetModel");
    var WidgetBase = app.getService("services/WidgetBase");

    var sut, ajaxService;

    beforeEach(function () {
        ajaxService = {
            rawAjaxRequest: function () {
            }
        };
        sut = GraphWidgetModel.newInstance(ajaxService).getOrElse(throwInstantiateException(GraphWidgetModel));
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
                Labels: ["Label1", "Label2", "Label3"]
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