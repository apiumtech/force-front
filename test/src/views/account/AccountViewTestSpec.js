/**
 * Created by justin on 3/4/15.
 */
describe("AccountView", function () {
    var AccountView = app.getView('views/account/AccountView');

    function exerciseCreateView(model, presenter, googleMapService, datatableService) {
        return AccountView.newInstance({}, model || {}, presenter || {
            show: function () {
            }
        }, googleMapService || {}, datatableService || {}, false, false).getOrElse(throwInstantiateException(AccountView));
    }

    it("should call presenter's show method on show()", function () {
        var view = exerciseCreateView(undefined, {show: jasmine.createSpy()});
        view.show();

        expect(view.presenter.show).toHaveBeenCalledWith(view, view.model);
    });

    it("showError should set the correct message", function () {
        var view = exerciseCreateView();
        var msg = "Oh mah!";

        view.showError(msg);
        expect(view.data.currentError).toEqual(msg);
    });

    var __view;
    beforeEach(function () {
        __view = exerciseCreateView();
    });

    describe("updateOwnerFilter", function () {
        describe("owner is selected", function () {
            var owner = {
                name: "user1",
                id: 1,
                selected: true
            };

            it("should turn filtering to true", function () {
                __view.data.filters.owner.filtering = false;
                __view.updateOwnerFilter(owner);
                expect(__view.data.filters.owner.filtering).toBeTruthy();
            });

            it("should add owner to filtering values", function () {
                __view.data.filters.owner.values = ["user2"];
                __view.updateOwnerFilter(owner);
                expect(__view.data.filters.owner.values).toEqual(["user2", "user1"]);
            });

            it("should not add owner to filtering values if it's already in the list", function () {
                __view.data.filters.owner.values = ["user1", "user2"];
                __view.updateOwnerFilter(owner);
                expect(__view.data.filters.owner.values).toEqual(["user1", "user2"]);
            });
        });

        describe("owner is deselected", function () {
            var owner = {
                name: "user1",
                id: 1,
                selected: false
            };
            it("should remove owner from filter values", function () {
                __view.data.filters.owner.values = ["user1", "user2"];
                __view.updateOwnerFilter(owner);
                expect(__view.data.filters.owner.values).toEqual(["user2"]);
            });

            it("should switch filtering to false if no filter available", function () {
                __view.data.filters.owner.values = ["user1"];
                __view.updateOwnerFilter(owner);
                expect(__view.data.filters.owner.filtering).toEqual(false);
            });
        });
    });

    describe("onServerRequesting", function () {
        var aoData;
        beforeEach(function () {
            aoData = {};
        });

        it("should add ownerFilter to aoData ", function () {
            __view.data.filters.owner = {
                filtering: true,
                values: ["user1", "user2"]
            };
            __view.onServerRequesting(aoData);
            expect(aoData).toEqual({customFilter: {owners: ["user1", "user2"]}});
        });

        it("should add ownerFilter to aoData ", function () {
            __view.data.filters.query = {
                filtering: true,
                value: "Daikin"
            };
            __view.onServerRequesting(aoData);
            expect(aoData).toEqual({customFilter: {searchQuery: "Daikin"}});
        });
    });
});