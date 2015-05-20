/**
 * Created by justin on 2/2/15.
 */

describe("SingleLineChart", function () {
    var SingleLineChart = app.getService('plots/SingleLineChart');

    var sut, config;


    describe("_isNotEmpty", function () {
        [
            { from: None(), expected: false },
            { from: null, expected: false },
            { from: undefined, expected: false },
            { from: "hola", expected: true },
            { from: Some("hola"), expected: true }
        ].forEach(function (testCase) {
                it("should be " + testCase.expected + " for " + JSON.stringify(testCase.from), function () {
                    expect(SingleLineChart._isNotEmpty(testCase.from)).toEqual(testCase.expected);
                });
            });
    });


    describe("_asPlot", function () {
        [
            { from: "A", expected: "A" },
            { from: Some("a"), expected: "a" },
            { from: null, expectedException: "e is null" },
            { from: undefined, expectedException: "e is null" },
            { from: None(), expectedException: "could not get plot" }
        ].forEach(function (testCase) {
                it("should return the wrapped object " + JSON.stringify(testCase.from), function () {
                    if (testCase.expectedException) {
                        expect(SingleLineChart._asPlot.bind(null, testCase.from)).toThrow(new Error(testCase.expectedException));
                    } else {
                        expect(SingleLineChart._asPlot(testCase.from)).toEqual(testCase.expected);
                    }
                });
            });
    });

    describe("onHover", function () {
        it("should bind plothover event", function () {
            sut = SingleLineChart.newInstance([{data: 1}], [], config, jasmine.createSpy());
            sut.renderedElement = {
                bind: jasmine.createSpy()
            };
            var abc = function () {
            };
            sut.onHover(abc);
            expect(sut.renderedElement.bind).toHaveBeenCalledWith('plothover', abc);
        });
    });

    describe("basic()", function () {
        it("should throw error if input data is greater than 2", function () {
            var plot = [{field1: 1}, {field2: 2}];
            expect(function () {
                SingleLineChart.basic(plot, []);
            }).toThrow(new Error("Single Line chart only accepts single data field"));
        });
    });
});