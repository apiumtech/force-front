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
        sut = AccountPresenter.newInstance().getOrElse(throwInstantiateException(AccountPresenter));
    });

    describe("show", function () {

        [{
            viewEvent: "onFieldsRestoreDefault", exercise: onFieldsRestoreDefaultTest
        }, {
            viewEvent: "onToggleColumn", exercise: onToggleColumnTest
        }, {
            viewEvent: "onOwnerToggled", exercise: onOwnerToggledTest
        }, {
            viewEvent: "onSearchQueryChanged", exercise: onSearchQueryChangedTest
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

        function onFieldsRestoreDefaultTest() {

        }

        function onToggleColumnTest() {

        }

        function onOwnerToggledTest() {
            it("should bind onOwnerToggled event to channel", function () {
                spyOn(sut.filterChannel, 'onOwnerToggleReceived');
                sut.show(view, model);
                expect(sut.filterChannel.onOwnerToggleReceived).toHaveBeenCalledWith(view.event.onOwnerToggled);
            });
        }

        function onSearchQueryChangedTest(){
            it("should bind onSearchQueryChanged event to channel", function () {
                spyOn(sut.filterChannel, 'onQueryingData');
                sut.show(view, model);
                expect(sut.filterChannel.onQueryingData).toHaveBeenCalledWith(view.event.onSearchQueryChanged);
            });

        }
    });

});