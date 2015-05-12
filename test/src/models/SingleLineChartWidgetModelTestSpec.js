/**
 * Created by justin on 2/2/15.
 */
describe("SingleLineChartWidgetModel", function () {
    var SingleLineChartWidgetModel = app.getModel("models/SingleLineChartWidgetModel");
    var WidgetBase = app.getService("services/WidgetBase");

    describe("changeFilterTab", function () {
        it("should call addQuery from base to add filter", function () {
            var sut = SingleLineChartWidgetModel.newInstance();
            spyOn(sut, 'addQuery');
            sut.changeFilterTab("tab1");
            expect(sut.addQuery).toHaveBeenCalledWith("selectedFilter", "tab1");
        });
    });
});