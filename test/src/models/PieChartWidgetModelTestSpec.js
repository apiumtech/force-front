/**
 * Created by justin on 1/26/15.
 */
describe("PieChartWidgetModel", function () {
    var PieChartWidgetModel = app.getModel("models/PieChartWidgetModel");
    var WidgetBase = app.getService("services/WidgetBase");

    describe("changeFilterTab", function () {
        it("should call addQuery from base to add filter", function () {
            var sut = PieChartWidgetModel.newInstance().getOrElse(throwInstantiateException(PieChartWidgetModel));
            spyOn(sut, 'addQuery');
            sut.changeFilterTab("tab1");
            expect(sut.addQuery).toHaveBeenCalledWith("selectedTab", "tab1");
        });
    });
});