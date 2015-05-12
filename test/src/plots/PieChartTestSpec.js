/**
 * Created by justin on 1/26/15.
 */

describe("PieChart", function () {
    var PieChart = app.getService('plots/PieChart');

    var sut;

    describe("_isNotEmpty", function () {
        [
            { from: None(), expected: false },
            { from: null, expected: false },
            { from: undefined, expected: false },
            { from: "hola", expected: true },
            { from: Some("hola"), expected: true }
        ].forEach(function (testCase) {
                it("should be " + testCase.expected + " for " + JSON.stringify(testCase.from), function () {
                    expect(PieChart._isNotEmpty(testCase.from)).toEqual(testCase.expected);
                });
            });
    });

    describe("paint", function () {
        it("Should call paintPlot method", function () {
            var paintPlotImpl = jasmine.createSpy(),
                element = {},
                config = {};
            sut = PieChart.newInstance([], config, paintPlotImpl);
            sut.paint(element);
            expect(paintPlotImpl).toHaveBeenCalled();
            expect(paintPlotImpl.calls.mostRecent().args[0]).toEqual(element);
            expect(paintPlotImpl.calls.mostRecent().args[2]).toEqual(config);
        });
    });
});