/**
 * Created by trung.dang on 02/13/2015
 */
describe("AccountFilterView", function () {
    var AccountFilterView = app.getView('views/account/AccountFilterView');

    function exerciseCreateView(model, presenter) {
        return AccountFilterView.newInstance({}, model || {}, presenter || {
            show: function () {
            }
        }, false, false).getOrElse(throwInstantiateException(AccountFilterView));
    }

    it("should call presenter's show method on show()", function () {
        var view = exerciseCreateView(undefined, {show: jasmine.createSpy()});
        view.show();

        expect(view.presenter.show).toHaveBeenCalledWith(view, view.model);
    });

    describe("configureEvents", function () {
        var view;
        beforeEach(function () {
            view = exerciseCreateView();
            view.configureEvents();
        });

        [{
            method: "onLoaded", exercise: onLoadedTest
        }, {
            method: "onSelectedViewChanged", exercise: onSelectedViewChangedTest
        }].forEach(function (test) {
                var method = test.method;
                var testExercise = test.exercise;

                it("should define method '" + method + "'", function () {
                    expect(view.fn[method]).not.toBeNull();
                    expect(isFunction(view.fn[method]));
                });

                describe("calling '" + method + "' ", function () {
                    testExercise();
                });
            });

        function onLoadedTest() {
            [
                "onShowAvailableEnvironment",
                "onShowAvailableViews",
                "onShowAvailableOwners"
            ].forEach(function (event) {
                    beforeEach(function () {
                        view.event[event] = jasmine.createSpy();
                    });
                    it("should fire event '" + event + "'", function () {
                        view.fn.onLoaded();
                        expect(view.event[event]).toHaveBeenCalled();
                    });
                });
        }

        function onSelectedViewChangedTest() {
            it("should fire event 'onToggleViewsFilter' with correct selected view", function () {
                view.data.selectedView = "view1";
                view.data.availableViews = [{
                    name: 'view1'
                }, {
                    name: 'view2'
                }, {
                    name: 'view3'
                }, {
                    name: 'view4'
                }];
                view.event.onToggleViewsFilter = jasmine.createSpy();

                view.fn.onSelectedViewChanged();
                expect(view.event.onToggleViewsFilter).toHaveBeenCalledWith({
                    name: 'view1'
                });
            });
        }
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
    });
});