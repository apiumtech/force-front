/**
 * Created by justin on 2/11/15.
 */
describe("MapChartWidgetModel", function () {
    var MapChartWidgetModel = app.getModel("models/MapChartWidgetModel");
    var WidgetBase = app.getService("services/WidgetBase");

    describe("changeFilterTab", function () {
        it("should call addQuery from base to add filter", function () {
            var sut = MapChartWidgetModel.newInstance().getOrElse(throwInstantiateException(MapChartWidgetModel));
            spyOn(sut, 'addQuery');
            sut.changeFilterTab("tab1");
            expect(sut.addQuery).toHaveBeenCalledWith("selectedFilter", "tab1");
        });
    });
});