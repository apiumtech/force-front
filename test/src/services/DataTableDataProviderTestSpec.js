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
            spyOn(sut.ajaxService, 'rawAjaxRequest').and.returnValue(exerciseFakeOkPromise());
            sut.getTableFields();
            expect(sut.ajaxService.rawAjaxRequest).toHaveBeenCalled();
        });
        it("should call decorateTableFields in return", function () {
            spyOn(sut.ajaxService, 'rawAjaxRequest').and.returnValue(exerciseFakeOkPromise());
            spyOn(sut, 'decorateTableFields').and.returnValue(exerciseFakeOkPromise());
            sut.getTableFields();
            expect(sut.decorateTableFields).toHaveBeenCalled();
        });
    });
});