define([
    'modules/account/widgets/accountList/AccountListView',
    'modules/account/widgets/accountList/AccountListPresenter',
    'shared/services/ModalDialogAdapter',
    'angular'
], function(AccountListView, AccountListPresenter, ModalDialogAdapter) {
    'use strict';

    describe('AccountListView Test', function() {
        var sut, scope, element, presenter, modal, modalDialogService;
        beforeEach(function(){
            presenter = mock(AccountListPresenter);
            inject(function($rootScope){
                scope = $rootScope.$new();
            });
            modalDialogService = mock(ModalDialogAdapter);
            element = angular.element("<div />");
            sut = new AccountListView(scope, element, presenter, modalDialogService);
            sut.event = {};
        });

        describe('construct', function () {
            beforeEach(function () {
                sinon.stub(AccountListView.prototype, 'configureEvents');
            });
            afterEach(function () {
                AccountListView.prototype.configureEvents.restore();
            });
            it("should call configureEvents", function () {
                new AccountListView(scope, element, presenter, modalDialogService);
                expect(AccountListView.prototype.configureEvents).toHaveBeenCalled();
            });
        });

        describe('configureEvents', function () {
            beforeEach(function () {
                sut.configureEvents();
            });
            describe('initTable', function () {
                it('should fire onTableFieldsRequested event', function () {
                    sut.event.onTableFieldsRequested = sinon.stub();
                    sut.fn.initTable();
                    expect(sut.event.onTableFieldsRequested).toHaveBeenCalled();
                });
            });
        });

        describe("declare account detail page url", function () {
            it("should declare the account detail page url", function () {
                expect(sut.data.accountDetailPage).toEqual('#/accounts/{id}');
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
                    sut.data.filters.environments.filtering = false;
                    sut.updateEnvironmentFilter(environment);
                    expect(sut.data.filters.environments.filtering).toBeTruthy();
                });

                it("should add environment to filtering values", function () {
                    sut.data.filters.environments.values = ["environment2"];
                    sut.updateEnvironmentFilter(environment);
                    expect(sut.data.filters.environments.values).toEqual(["environment2", "environment1"]);
                });

                it("should not add environment to filtering values if it's already in the list", function () {
                    sut.data.filters.environments.values = ["environment1", "environment2"];
                    sut.updateEnvironmentFilter(environment);
                    expect(sut.data.filters.environments.values).toEqual(["environment1", "environment2"]);
                });
            });

            describe("environment is deselected", function () {
                var environment = {
                    name: "user1",
                    id: 1,
                    selected: false
                };
                it("should remove environment from filter values", function () {
                    sut.data.filters.environments.values = ["user1", "user2"];
                    sut.updateEnvironmentFilter(environment);
                    expect(sut.data.filters.environments.values).toEqual(["user2"]);
                });

                it("should switch filtering to false if no filter available", function () {
                    sut.data.filters.environments.values = ["user1"];
                    sut.updateEnvironmentFilter(environment);
                    expect(sut.data.filters.environments.filtering).toEqual(false);
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
                    sut.data.filters.owner.filtering = false;
                    sut.updateOwnerFilter(owner);
                    expect(sut.data.filters.owner.filtering).toBeTruthy();
                });

                it("should add owner to filtering values", function () {
                    sut.data.filters.owner.values = ["user2"];
                    sut.updateOwnerFilter(owner);
                    expect(sut.data.filters.owner.values).toEqual(["user2", "user1"]);
                });

                it("should not add owner to filtering values if it's already in the list", function () {
                    sut.data.filters.owner.values = ["user1", "user2"];
                    sut.updateOwnerFilter(owner);
                    expect(sut.data.filters.owner.values).toEqual(["user1", "user2"]);
                });
            });

            describe("owner is deselected", function () {
                var owner = {
                    name: "user1",
                    id: 1,
                    selected: false
                };
                it("should remove owner from filter values", function () {
                    sut.data.filters.owner.values = ["user1", "user2"];
                    sut.updateOwnerFilter(owner);
                    expect(sut.data.filters.owner.values).toEqual(["user2"]);
                });

                it("should switch filtering to false if no filter available", function () {
                    sut.data.filters.owner.values = ["user1"];
                    sut.updateOwnerFilter(owner);
                    expect(sut.data.filters.owner.filtering).toEqual(false);
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
                    sut.data.filters.accountType.filtering = false;
                    sut.updateAccountTypesFilter(accountType);
                    expect(sut.data.filters.accountType.filtering).toBeTruthy();
                });

                it("should add accountType to filtering values", function () {
                    sut.data.filters.accountType.values = ["user2"];
                    sut.updateAccountTypesFilter(accountType);
                    expect(sut.data.filters.accountType.values).toEqual(["user2", "user1"]);
                });

                it("should not add accountType to filtering values if it's already in the list", function () {
                    sut.data.filters.accountType.values = ["user1", "user2"];
                    sut.updateAccountTypesFilter(accountType);
                    expect(sut.data.filters.accountType.values).toEqual(["user1", "user2"]);
                });
            });

            describe("accountType is deselected", function () {
                var accountType = {
                    name: "user1",
                    id: 1,
                    selected: false
                };
                it("should remove accountType from filter values", function () {
                    sut.data.filters.accountType.values = ["user1", "user2"];
                    sut.updateAccountTypesFilter(accountType);
                    expect(sut.data.filters.accountType.values).toEqual(["user2"]);
                });

                it("should switch filtering to false if no filter available", function () {
                    sut.data.filters.accountType.values = ["user1"];
                    sut.updateAccountTypesFilter(accountType);
                    expect(sut.data.filters.accountType.filtering).toEqual(false);
                });
            });
        });

        describe("updateViewFilter", function () {
            describe("view is selected", function () {
                var view = {
                    name: "user1",
                    id: 1,
                    selected: true
                };

                it("should turn filtering to true", function () {
                    sut.data.filters.view.filtering = false;
                    sut.updateViewFilter(view);
                    expect(sut.data.filters.view.filtering).toBeTruthy();
                });

                it("should set view identifier to filtering value", function () {
                    sut.data.filters.view.value = 2;
                    sut.updateViewFilter(view);
                    expect(sut.data.filters.view.value).toEqual(1);
                });
            });

            describe("view is deselected", function () {
                var view = {
                    name: "user1",
                    $loki: 1,
                    selected: false
                };
                it("should remove view from filter values", function () {
                    sut.data.filters.view.value = 1;
                    sut.updateViewFilter(view);
                    expect(sut.data.filters.view.value).toEqual(null);
                });

                it("should switch filtering to false if no filter available", function () {
                    sut.data.filters.view.value = 1;
                    sut.updateViewFilter(view);
                    expect(sut.data.filters.view.filtering).toEqual(false);
                });
            });
        });

        describe("updateQueryingString", function () {
            describe("queryString has value", function () {
                it("filtering should be true and should have value", function () {
                    var query = "query_string_123";
                    sut.updateQueryingString(query);
                    expect(sut.data.filters.query.filtering).toBeTruthy();
                    expect(sut.data.filters.query.value).toEqual([query]);
                });
            });

            describe("queryString has no value", function () {
                it("filtering should be false and should have no value", function () {
                    var query = null;
                    sut.updateQueryingString(query);
                    expect(sut.data.filters.query.filtering).toBeFalsy();
                    expect(sut.data.filters.query.value).toEqual("");
                })
            });
        });

        describe("onServerRequesting", function () {
            var aoData;
            beforeEach(function () {
                aoData = {};
            });

            it("should add ownerFilter to aoData ", function () {
                sut.data.filters.owner = {
                    filtering: true,
                    values: ["user1", "user2"]
                };
                sut.onServerRequesting(aoData);
                expect(aoData).toEqual({customFilter: {owners: ["user1", "user2"]}});
            });

            it("should add ownerFilter to aoData ", function () {
                sut.data.filters.query = {
                    filtering: true,
                    value: "Daikin"
                };
                sut.onServerRequesting(aoData);
                expect(aoData).toEqual({customFilter: {searchQuery: "Daikin"}});
            });

            it("should add environmentFilter to aoData ", function () {
                sut.data.filters.environments = {
                    filtering: true,
                    values: ["UK", "Force US"]
                };
                sut.onServerRequesting(aoData);
                expect(aoData).toEqual({customFilter: {environments: ["UK", "Force US"]}});
            });

            it("should add accountTypeFilter to aoData ", function () {
                sut.data.filters.accountType = {
                    filtering: true,
                    values: ["Internal", "Prospect"]
                };
                sut.onServerRequesting(aoData);
                expect(aoData).toEqual({customFilter: {accountTypes: ["Internal", "Prospect"]}});
            });

            it("should add viewFilter to aoData ", function () {
                sut.data.filters.view = {
                    filtering: true,
                    value: 1
                };
                sut.onServerRequesting(aoData);
                expect(aoData).toEqual({customFilter: {view: 1}});
            });
        });

        describe("reloadTableData", function () {
            it("should fire draw event from the table", function () {
                sut.data.table = {draw: jasmine.createSpy()};

                sut.reloadTableData();
                expect(sut.data.table.draw).toHaveBeenCalled();
            });
        });

        describe("resetTableColumns", function () {
            var visible;

            beforeEach(function () {
                visible = jasmine.createSpy();
                sut.data.availableColumns = [{
                    visible: true
                }, {
                    visible: false
                }, {
                    visible: true
                }, {
                    visible: false
                }];
                sut.data.table = {
                    column: function () {

                    }
                };

                spyOn(sut.data.table, 'column').and.callFake(function (i) {
                    return {
                        visible: visible
                    };
                });
            });

            it("should set all columns to show", function () {
                sut.resetTableColumns();
                expect(sut.data.availableColumns[1].visible).toBeTruthy();
                expect(sut.data.availableColumns[3].visible).toBeTruthy();
            });
            it("should set columns in tables to visible", function () {
                sut.resetTableColumns();
                expect(visible.calls.count()).toBe(4);
            });
        });

        describe("reloadTableColumns", function () {
            var visible;

            beforeEach(function () {
                visible = jasmine.createSpy();
                sut.data.availableColumns = [{
                    visible: true
                }, {
                    visible: false
                }, {
                    visible: true
                }, {
                    visible: false
                }];
                sut.data.table = {
                    column: function () {

                    }
                };

                spyOn(sut.data.table, 'column').and.callFake(function (i) {
                    return {
                        visible: visible
                    };
                });
            });

            it("should call visible method to assign visibility of columns to table", function (done) {
                sut.reloadTableColumns();
                sut.data.availableColumns.forEach(function (record) {
                    expect(visible).toHaveBeenCalledWith(record.visible);
                });
                expect(visible.calls.count()).toBe(sut.data.availableColumns.length);
                done();
            });
        });

    });
});