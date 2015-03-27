/**
 * Created by justin on 3/27/15.
 */
describe("DataTableDataProvider", function () {
    var DataTableDataProvider = app.getService("services/DataTableDataProvider");
    var sut;

    beforeEach(function () {
        sut = DataTableDataProvider.newInstance().getOrElse(throwInstantiateException(DataTableDataProvider));
    });

    describe("getTableFields", function () {
        it("should return the fields configured in data", function () {
            sut.availableColumns = [{
                data: "name"
            }];
            var actual = sut.getTableFields();
            expect(actual).toEqual(sut.availableColumns);
        });
    });
});