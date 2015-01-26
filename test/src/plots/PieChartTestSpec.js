/**
 * Created by justin on 1/26/15.
 */

describe("PieChart", function () {
    var PieChart = app.getService('plots/PieChart');

    var sut;

    describe("paint", function () {
        it("Should call paintPlot method", function () {
            var paintPlotImpl = jasmine.createSpy(),
                element = {},
                config = {};
            sut = PieChart.newInstance([], config, paintPlotImpl).getOrElse(throwInstantiateException(PieChart));
            sut.paint(element);
            expect(paintPlotImpl).toHaveBeenCalled();
            expect(paintPlotImpl.calls.mostRecent().args[0]).toEqual(element);
            expect(paintPlotImpl.calls.mostRecent().args[2]).toEqual(config);
        });
    });
});