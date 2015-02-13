/**
 * Created by kevin on 11/6/14.
 */
describe("AccountView", function () {
    var AccountView = app.getView('views/account/AccountView');

    function exerciseCreateView(model, presenter) {
        return AccountView.newInstance({}, model || {}, presenter || {
            show: function () {
            }
        }, false, false).getOrElse(throwException("Could not create AccountView!"));
    }

    it("should call presenter's show method on show()", function () {
        var view = exerciseCreateView(undefined, {show: jasmine.createSpy()});
        view.show();

        expect(view.presenter.show).toHaveBeenCalledWith(view, view.model);
    });

    describe("showTableData behaviour", function () {
        var view = exerciseCreateView();
        var data = { headers: 1, elements: 2};

        beforeEach(function () {
            view.showTableData(data);
        });

        it("should assign the headers field", function () {
            expect(view.data.headers).toEqual(data.headers);
        });

        it("should assign the elements field", function () {
            expect(view.data.accounts).toEqual(data.elements);
        });
    });

    it("showTableData behaviour should add to the elements field", function () {
        var view = exerciseCreateView();
        var data = { headers: 1, elements: [1, 2]};
        view.data.accounts = [5, 6];
        view.addTableData(data);

        expect(view.data.accounts).toEqual([5, 6, 1, 2]);
    });

    it("showError should set the correct message", function () {
        var view = exerciseCreateView();
        var msg = "Oh mah!";

        view.showError(msg);
        expect(view.data.currentError).toEqual(msg);
    });

    it("showColumnList should set a list of columns", function () {
        var view = exerciseCreateView();
        var data = [1, 2, 3, 4];

        view.showColumnList(data);
        expect(view.data.currentHiddenColumns).toEqual(data);
    });
});