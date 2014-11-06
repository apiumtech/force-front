/**
 * Created by kevin on 11/6/14.
 */
describe("FilterView", function () {
    var FilterView = app.getView('views/filters/FilterView');

    function exerciseCreateView(model, presenter) {
        return FilterView.newInstance({}, model || {}, presenter || {
            show: function () {
            }
        }, false, false).getOrElse(throwException("Could not create AccountView!"));
    }

    it("should call presenter's show method on show()", function () {
        var view = exerciseCreateView(undefined, {show: jasmine.createSpy()});
        view.show();

        expect(view.presenter.show).toHaveBeenCalledWith(view, view.model);
    });

    describe("showAvailableFilters behaviour", function () {
        var view = exerciseCreateView();
        var data = 1;

        beforeEach(function () {
            view.showAvailableFilters(data);
        });

        it("should assign the showAvailableFilters field to true", function () {
            expect(view.data.showAvailableFilters).toBeTruthy();
        });

        it("should assign the availableFilters field", function () {
            expect(view.data.availableFilters).toEqual(data);
        });
    });

    describe("showFilters behaviour", function () {
        var view = exerciseCreateView();
        var data = 1;

        beforeEach(function () {
            view.showFilters(data);
        });

        it("should assign the showAvailableFilters field to true", function () {
            expect(view.data.showAvailableFilters).toBeTruthy();
        });

        it("should assign the availableFilters field to an empty array", function () {
            expect(view.data.availableFilters).toEqual([]);
        });

        it("should assign the customFilters field", function () {
            expect(view.data.customFilters).toEqual(data);
        });
    });

    describe("showAvailableOwners behaviour", function () {
        var view = exerciseCreateView();
        var data = 1;

        beforeEach(function () {
            view.showAvailableOwners(data);
        });

        it("should assign the showAvailableOwners field to true", function () {
            expect(view.data.showAvailableOwners).toBeTruthy();
        });

        it("should assign the availableOwners field", function () {
            expect(view.data.availableOwners).toEqual(data);
        });
    });

    it("showCustomFilters should assign the customFilters field", function () {
        var view = exerciseCreateView();
        var data = 1;

        view.showCustomFilters(data);

        expect(view.data.customFilters).toEqual(data);
    });

    it("shouldError should assign the currentError field", function () {
        var view = exerciseCreateView();
        var msg = "Mamma mia!";

        view.showError(msg);
        expect(view.data.currentError).toEqual(msg);
    })

});