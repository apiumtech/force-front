/**
 * Created by justin on 1/26/15.
 */
describe("PieChartWidgetModel", function () {
    var PieChartWidgetModel = app.getModel("models/widgets/PieChartWidgetModel");
    var WidgetBase = app.getService("services/WidgetBase");

    describe("changeFilterTab", function () {
        it("should call addQuery from base to add filter", function () {
            var sut = PieChartWidgetModel.newInstance();
            spyOn(sut, 'addQuery');
            sut.changeFilterTab("tab1");
            expect(sut.addQuery).toHaveBeenCalledWith("selectedFilter", "tab1");
        });
    });
});