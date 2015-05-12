/**
 * Created by justin on 3/4/15
 */
describe("AccountPresenter", function () {
    var AccountPresenter = app.getPresenter('presenters/account/AccountPresenter');
    var sut, view, model;

    beforeEach(function () {
        view = {
            event: {},
            fn: {}
        };
        model = {};
        sut = AccountPresenter.newInstance();
    });

    describe("show", function () {

        [{
            viewEvent: "onTableFieldsRequested", exercise: onTableFieldsRequestedTest
        }, {
            viewEvent: "onFieldsRestoreDefault", exercise: onFieldsRestoreDefaultTest
        }, {
            viewEvent: "onFollowToggled", exercise: onFollowToggledTest
        }, {
            viewEvent: "onToggleColumn", exercise: onToggleColumnTest
        }, {
            viewEvent: "onOwnerToggled", exercise: onOwnerToggledTest
        }, {
            viewEvent: "onSearchQueryChanged", exercise: onSearchQueryChangedTest
        }, {
            viewEvent: "onEnvironmentToggled", exercise: onEnvironmentToggledTest
        }, {
            viewEvent: "onAccountsNextPage", exercise: onAccountsNextPageTest
        }, {
            viewEvent: "onAccountTypesToggled", exercise: onAccountTypesToggledTest
        }, {
            viewEvent: "onViewChanged", exercise: onViewChangedTest
        }].forEach(function (test) {
                var viewEvent = test.viewEvent;

                it("should declared '" + viewEvent + "' event for View", function () {
                    sut.show(view, model);
                    testDeclareMethod(view.event, viewEvent);
                });

                describe("when event '" + viewEvent + "' fired", function () {
                    beforeEach(function () {
                        sut.show(view, model);
                    });
                    test.exercise();
                });
            });

        function onTableFieldsRequestedTest() {
            var modelMethod = "loadTableFields";
            var onSuccess = "onTableFieldsLoaded";
            var onError = "showError";
            var viewEvent = "onTableFieldsRequested";

            beforeEach(function () {
                model[modelMethod] = function () {
                };
                view[onSuccess] = jasmine.createSpy();
                view[onError] = jasmine.createSpy();
            });
            it("presenter should connect event to '" + modelMethod + "' method on $model", function () {
                spyOn(model, modelMethod).and.returnValue(exerciseFakePromise());
                view.event[viewEvent]();
                expect(model[modelMethod]).toHaveBeenCalled();
            });

            it("should call fire 'fireTableFieldsLoaded' on event bus if $model '" + modelMethod + "' return success", function () {
                spyOn(model, modelMethod).and.returnValue(exerciseFakeOkPromise());
                spyOn(sut.accountEventBus, 'fireTableFieldsLoaded');
                view.event[viewEvent]();
                expect(sut.accountEventBus.fireTableFieldsLoaded).toHaveBeenCalled();
            });

            it("should call method '" + onError + "' on $view if $model '" + modelMethod + "' return error", function () {
                spyOn(model, modelMethod).and.returnValue(exerciseFakeKoPromise());
                view.event[viewEvent]();
                expect(view[onError]).toHaveBeenCalled();
            });
        }

        function onFieldsRestoreDefaultTest() {
            beforeEach(function () {
                view.resetTableColumns = jasmine.createSpy();
            });

            it("should call resetTableColumns on View", function () {
                view.event.onFieldsRestoreDefault();
                expect(view.resetTableColumns).toHaveBeenCalled();
            });
        }

        function onFollowToggledTest() {
            var modelMethod = "toggleFollow";
            var onSuccess = "reloadTableData";
            var onError = "showError";
            exerciseAjaxCallBinding("onFollowToggled", modelMethod, onSuccess, onError);
        }

        function onToggleColumnTest() {
            var inputColumn;
            beforeEach(function () {
                view.reloadTableColumns = jasmine.createSpy();
                inputColumn = {
                    visible: true
                }
            });

            it("should reverse the visibility of input column", function () {
                view.event.onToggleColumn(inputColumn);
                expect(inputColumn.visible).toEqual(false);
                view.event.onToggleColumn(inputColumn);
                expect(inputColumn.visible).toEqual(true);
            });

            it("should call reloadTableColumns on View", function () {
                view.event.onToggleColumn(inputColumn);
                expect(view.reloadTableColumns).toHaveBeenCalled();
            });
        }

        function onOwnerToggledTest() {
            var owner = {id: 1, name: "owner1"};
            var exerciseFireEvent = function () {
                sut.show(view, model);
                view.updateOwnerFilter = jasmine.createSpy();
                view.reloadTableData = jasmine.createSpy();
                view.event.onOwnerToggled(owner);
            };

            it("should call updateOwnerFilter method on View", function () {
                exerciseFireEvent();
                expect(view.updateOwnerFilter).toHaveBeenCalledWith(owner);
            });

            it("should call reloadTableData method on View", function () {
                exerciseFireEvent();
                expect(view.reloadTableData).toHaveBeenCalled();
            });

            it("should bind onOwnerToggled event to channel", function () {
                spyOn(sut.filterChannel, 'onOwnerToggleReceived');
                sut.show(view, model);
                expect(sut.filterChannel.onOwnerToggleReceived).toHaveBeenCalledWith(view.event.onOwnerToggled);
            });
        }

        function onAccountTypesToggledTest() {
            var owner = {id: 1, name: "owner1"};
            var exerciseFireEvent = function () {
                sut.show(view, model);
                view.updateAccountTypesFilter = jasmine.createSpy();
                view.reloadTableData = jasmine.createSpy();
                view.event.onAccountTypesToggled(owner);
            };

            it("should call updateAccountTypesFilter method on View", function () {
                exerciseFireEvent();
                expect(view.updateAccountTypesFilter).toHaveBeenCalledWith(owner);
            });

            it("should call reloadTableData method on View", function () {
                exerciseFireEvent();
                expect(view.reloadTableData).toHaveBeenCalled();
            });

            it("should bind onAccountTypesToggled event to channel", function () {
                spyOn(sut.filterChannel, 'onAccountTypeToggledReceived');
                sut.show(view, model);
                expect(sut.filterChannel.onAccountTypeToggledReceived).toHaveBeenCalledWith(view.event.onAccountTypesToggled);
            });
        }

        function onViewChangedTest() {
            var viewItem = {$loki: 1, name: "owner1", selected: true};
            var exerciseFireEvent = function () {
                sut.show(view, model);
                view.updateViewFilter = jasmine.createSpy();
                view.reloadTableData = jasmine.createSpy();
                view.event.onViewChanged(viewItem);
            };

            it("should call updateViewFilter method on View", function () {
                exerciseFireEvent();
                expect(view.updateViewFilter).toHaveBeenCalledWith(viewItem);
            });

            it("should call reloadTableData method on View", function () {
                exerciseFireEvent();
                expect(view.reloadTableData).toHaveBeenCalled();
            });

            it("should bind onViewChangedReceived event to channel", function () {
                spyOn(sut.filterChannel, 'onViewChangedReceived');
                sut.show(view, model);
                expect(sut.filterChannel.onViewChangedReceived).toHaveBeenCalledWith(view.event.onViewChanged);
            });
        }

        function onEnvironmentToggledTest() {
            var exerciseFireEvent = function () {
                sut.show(view, model);
                view.updateEnvironmentFilter = jasmine.createSpy();
                view.reloadTableData = jasmine.createSpy();
                view.event.onEnvironmentToggled("Environment");
            };

            it("should call updateEnvironmentFilter method on View", function () {
                exerciseFireEvent();
                expect(view.updateEnvironmentFilter).toHaveBeenCalledWith("Environment");
            });

            it("should call reloadTableData method on View", function () {
                exerciseFireEvent();
                expect(view.reloadTableData).toHaveBeenCalled();
            });

            it("should bind onEnvironmentToggled event to channel", function () {
                spyOn(sut.filterChannel, 'onEnvironmentToggleReceived');
                sut.show(view, model);
                expect(sut.filterChannel.onEnvironmentToggleReceived).toHaveBeenCalledWith(view.event.onEnvironmentToggled);
            });
        }

        function onSearchQueryChangedTest() {
            var exerciseFireEvent = function () {
                sut.show(view, model);
                view.updateQueryingString = jasmine.createSpy();
                view.reloadTableData = jasmine.createSpy();
                view.event.onSearchQueryChanged("Environment");
            };

            it("should call updateQueryingString method on View", function () {
                exerciseFireEvent();
                expect(view.updateQueryingString).toHaveBeenCalledWith("Environment");
            });

            it("should call reloadTableData method on View", function () {
                exerciseFireEvent();
                expect(view.reloadTableData).toHaveBeenCalled();
            });

            it("should bind onSearchQueryChanged event to channel", function () {
                spyOn(sut.filterChannel, 'onQueryingData');
                sut.show(view, model);
                expect(sut.filterChannel.onQueryingData).toHaveBeenCalledWith(view.event.onSearchQueryChanged);
            });
        }

        function onAccountsNextPageTest() {

        }
    });

    function exerciseAjaxCallBinding(viewEvent, modelMethod, onSuccess, onError) {

        beforeEach(function () {
            model[modelMethod] = function () {
            };
            view[onSuccess] = jasmine.createSpy();
            view[onError] = jasmine.createSpy();
        });
        it("presenter should connect event to '" + modelMethod + "' method on $model", function () {
            spyOn(model, modelMethod).and.returnValue(exerciseFakePromise());
            view.event[viewEvent]();
            expect(model[modelMethod]).toHaveBeenCalled();
        });

        it("should call method '" + onSuccess + "' on $view if $model '" + modelMethod + "' return success", function () {
            spyOn(model, modelMethod).and.returnValue(exerciseFakeOkPromise());
            view.event[viewEvent]();
            expect(view[onSuccess]).toHaveBeenCalled();
        });

        it("should call method '" + onError + "' on $view if $model '" + modelMethod + "' return error", function () {
            spyOn(model, modelMethod).and.returnValue(exerciseFakeKoPromise());
            view.event[viewEvent]();
            expect(view[onError]).toHaveBeenCalled();
        });
    }

});