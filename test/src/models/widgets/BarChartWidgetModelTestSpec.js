/**
 * Created by justin on 1/26/15.
 */
describe("BarChartWidgetModel", function () {
    var BarChartWidgetModel = app.getModel("models/widgets/BarChartWidgetModel");
    var WidgetBase = app.getService("services/WidgetBase");

    describe("changeFilterTab", function () {
        it("should call addQuery from base to add filter", function () {
            var sut = BarChartWidgetModel.newInstance();
            spyOn(sut, 'addQuery');
            sut.changeFilterTab("tab1");
            expect(sut.addQuery).toHaveBeenCalledWith("selectedFilter", "tab1");
        });
    });
});