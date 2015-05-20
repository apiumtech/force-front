/**
 * Created by justin on 1/26/15.
 */

describe("BarChart", function () {
    var BarChart = app.getService('plots/BarChart');

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
                    expect(BarChart._isNotEmpty(testCase.from)).toEqual(testCase.expected);
                });
            });
    });

    describe("getTickLabels", function () {
        it("should return correct array with index", function () {
            var plotData = [],
                ticks = ["tick1", "tick2", "tick3", "tick4"];
            sut = BarChart.basic(plotData, ticks);
            var actual = sut.getTickLabels();
            expect(actual).toEqual([
                [0, "tick1"],
                [1, "tick2"],
                [2, "tick3"],
                [3, "tick4"]
            ]);
        });
    });

    describe("paint", function () {
        var paintPlotImpl, element;
        beforeEach(function () {
            paintPlotImpl = jasmine.createSpy();
            element = {};
            config = {
                xaxis: {}
            };
            sut = BarChart.newInstance([], [], config, paintPlotImpl);
        });

        it("should call getTickLabels if no label is assigned", function () {
            var fakeArray = [[0, 'fakearray'], [1, "fakearray1"]];
            spyOn(sut, 'getTickLabels').and.returnValue(fakeArray);
            sut.paint(element);
            expect(sut.getTickLabels).toHaveBeenCalled();
            expect(config.xaxis.ticks).not.toBeNull(fakeArray);
        });

        it("should not call getTickLabels if label is already assigned", function () {
            var fakeArray = [[0, 'fakearray'], [1, "fakearray1"]];
            spyOn(sut, 'getTickLabels');
            sut.configuration.xaxis.ticks = fakeArray;
            sut.paint(element);
            expect(sut.getTickLabels).not.toHaveBeenCalled();
        });

        it("Should call paintPlot method", function () {
            sut.paint(element);
            expect(paintPlotImpl).toHaveBeenCalled();
            expect(paintPlotImpl.calls.mostRecent().args[0]).toEqual(element);
            expect(paintPlotImpl.calls.mostRecent().args[2]).toEqual(config);
        });
    });

    describe("onHover", function () {
        var paintPlotImpl, element;
        beforeEach(function () {
            paintPlotImpl = jasmine.createSpy();
            element = {};
            config = {
                xaxis: {}
            };
            sut = BarChart.newInstance([], [], config, paintPlotImpl);
        });

        it("should bind plothover event", function () {
            sut.renderedElement = {
                bind: jasmine.createSpy()
            };
            var abc = function () {
            };
            sut.onHover(abc);
            expect(sut.renderedElement.bind).toHaveBeenCalledWith('plothover', abc);
        });
    });
});