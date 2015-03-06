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

    describe("declare account detail page url", function () {
        it("should declare the account detail page url", function () {
            expect(__view.data.accountDetailPage).toEqual('#/accounts/{id}');
        });
    });

    describe("updateEnvironmentFilter", function () {
        describe("environment is selected", function () {
            var environment = {
                name: "environment1",
                id: 1,
                selected: true
            };

            it("should turn filtering to true", function () {
                __view.data.filters.environments.filtering = false;
                __view.updateEnvironmentFilter(environment);
                expect(__view.data.filters.environments.filtering).toBeTruthy();
            });

            it("should add environment to filtering values", function () {
                __view.data.filters.environments.values = ["environment2"];
                __view.updateEnvironmentFilter(environment);
                expect(__view.data.filters.environments.values).toEqual(["environment2", "environment1"]);
            });

            it("should not add environment to filtering values if it's already in the list", function () {
                __view.data.filters.environments.values = ["environment1", "environment2"];
                __view.updateEnvironmentFilter(environment);
                expect(__view.data.filters.environments.values).toEqual(["environment1", "environment2"]);
            });
        });

        describe("environment is deselected", function () {
            var environment = {
                name: "user1",
                id: 1,
                selected: false
            };
            it("should remove environment from filter values", function () {
                __view.data.filters.environments.values = ["user1", "user2"];
                __view.updateEnvironmentFilter(environment);
                expect(__view.data.filters.environments.values).toEqual(["user2"]);
            });

            it("should switch filtering to false if no filter available", function () {
                __view.data.filters.environments.values = ["user1"];
                __view.updateEnvironmentFilter(environment);
                expect(__view.data.filters.environments.filtering).toEqual(false);
            });
        });
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

    describe("updateAccountTypesFilter", function () {
        describe("accounttype is selected", function () {
            var accountType = {
                name: "user1",
                id: 1,
                selected: true
            };

            it("should turn filtering to true", function () {
                __view.data.filters.accountType.filtering = false;
                __view.updateAccountTypesFilter(accountType);
                expect(__view.data.filters.accountType.filtering).toBeTruthy();
            });

            it("should add accountType to filtering values", function () {
                __view.data.filters.accountType.values = ["user2"];
                __view.updateAccountTypesFilter(accountType);
                expect(__view.data.filters.accountType.values).toEqual(["user2", "user1"]);
            });

            it("should not add accountType to filtering values if it's already in the list", function () {
                __view.data.filters.accountType.values = ["user1", "user2"];
                __view.updateAccountTypesFilter(accountType);
                expect(__view.data.filters.accountType.values).toEqual(["user1", "user2"]);
            });
        });

        describe("accountType is deselected", function () {
            var accountType = {
                name: "user1",
                id: 1,
                selected: false
            };
            it("should remove accountType from filter values", function () {
                __view.data.filters.accountType.values = ["user1", "user2"];
                __view.updateAccountTypesFilter(accountType);
                expect(__view.data.filters.accountType.values).toEqual(["user2"]);
            });

            it("should switch filtering to false if no filter available", function () {
                __view.data.filters.accountType.values = ["user1"];
                __view.updateAccountTypesFilter(accountType);
                expect(__view.data.filters.accountType.filtering).toEqual(false);
            });
        });
    });

    describe("updateViewFilter", function () {
        describe("view is selected", function () {
            var view = {
                name: "user1",
                $loki: 1,
                selected: true
            };

            it("should turn filtering to true", function () {
                __view.data.filters.view.filtering = false;
                __view.updateViewFilter(view);
                expect(__view.data.filters.view.filtering).toBeTruthy();
            });

            it("should set view identifier to filtering value", function () {
                __view.data.filters.view.value = 2;
                __view.updateViewFilter(view);
                expect(__view.data.filters.view.value).toEqual(1);
            });
        });

        describe("view is deselected", function () {
            var view = {
                name: "user1",
                $loki: 1,
                selected: false
            };
            it("should remove view from filter values", function () {
                __view.data.filters.view.value = 1;
                __view.updateViewFilter(view);
                expect(__view.data.filters.view.value).toEqual(null);
            });

            it("should switch filtering to false if no filter available", function () {
                __view.data.filters.view.value = 1;
                __view.updateViewFilter(view);
                expect(__view.data.filters.view.filtering).toEqual(false);
            });
        });
    });

    describe("updateQueryingString", function () {
        describe("queryString has value", function () {
            it("filtering should be true and should have value", function () {
                var query = "query_string_123";
                __view.updateQueryingString(query);
                expect(__view.data.filters.query.filtering).toBeTruthy();
                expect(__view.data.filters.query.value).toEqual(query);
            });
        });

        describe("queryString has no value", function () {
            it("filtering should be false and should have no value", function () {
                var query = null;
                __view.updateQueryingString(query);
                expect(__view.data.filters.query.filtering).toBeFalsy();
                expect(__view.data.filters.query.value).toEqual("");
            })
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

        it("should add environmentFilter to aoData ", function () {
            __view.data.filters.environments = {
                filtering: true,
                values: ["UK", "Force US"]
            };
            __view.onServerRequesting(aoData);
            expect(aoData).toEqual({customFilter: {environments: ["UK", "Force US"]}});
        });

        it("should add accountTypeFilter to aoData ", function () {
            __view.data.filters.accountType = {
                filtering: true,
                values: ["Internal", "Prospect"]
            };
            __view.onServerRequesting(aoData);
            expect(aoData).toEqual({customFilter: {accountTypes: ["Internal", "Prospect"]}});
        });

        it("should add viewFilter to aoData ", function () {
            __view.data.filters.view = {
                filtering: true,
                value: 1
            };
            __view.onServerRequesting(aoData);
            expect(aoData).toEqual({customFilter: {view: 1}});
        });
    });
});