define([
    'core/topMenu/TopMenuWeb2Presenter'
], function (TopMenuWeb2Presenter) {
    'use strict';

    describe("TopMenuWeb2Presenter", function () {

        function exerciseCreatePresenter() {
            return TopMenuWeb2Presenter.newInstance();
        }

        describe('getUserDataInfo', function () {
            var presenter, view;
            beforeEach(function () {
                presenter = exerciseCreatePresenter();
                view = {
                    event: {},
                    onGetUserDataInfo: jasmine.createSpy(),
                    onGetUserDataInfoError: jasmine.createSpy()
                };
            });
            it("should call view's onGetUserDataInfo on success", function () {
                var result = "the result";
                var model = {getUserDataInfo: jasmine.createSpy().and.returnValue(exerciseFakeOkPromiseWithArg(result))};
                presenter.show(view, model);
                view.event.getUserDataInfo();
                expect(view.onGetUserDataInfo).toHaveBeenCalledWith(result);
            });
            it("should call view's onGetUserDataInfoError on error", function () {
                var model = {getUserDataInfo: jasmine.createSpy().and.returnValue(exerciseFakeKoPromise())};
                presenter.show(view, model);
                view.event.getUserDataInfo();
                expect(view.onGetUserDataInfoError).toHaveBeenCalled();
            });
        });

        describe('logout', function () {
            var presenter, view;
            beforeEach(function () {
                presenter = exerciseCreatePresenter();
                view = {
                    event: {},
                    onLogout: jasmine.createSpy(),
                    onLogoutError: jasmine.createSpy()
                };
            });
            it("should call view's onLogout on success", function () {
                var result = "the result";
                var model = {logout: jasmine.createSpy().and.returnValue(exerciseFakeOkPromiseWithArg(result))};
                presenter.show(view, model);
                view.event.logout();
                expect(view.onLogout).toHaveBeenCalledWith(result);
            });
            it("should call view's onLogoutError on error", function () {
                var model = {logout: jasmine.createSpy().and.returnValue(exerciseFakeKoPromise())};
                presenter.show(view, model);
                view.event.logout();
                expect(view.onLogoutError).toHaveBeenCalled();
            });
        });

        describe("get model data sync", function () {
            var presenter, model;
            beforeEach(function () {
                presenter = exerciseCreatePresenter();
                model = {};
            });
            [
                {functName: "getUserSections", returnVal: "aa"},
                {functName: "getUserOptions", returnVal: "bb"},
                {functName: "getUserData", returnVal: "cc"},
                {functName: "getUserNotifications", returnVal: "dd"}
            ].forEach(function (testCase) {
                    it("should return '" + testCase.returnVal + "' when '" + testCase.functName + "' called", function () {

                        model[testCase.functName] = jasmine.createSpy().and.returnValue(testCase.returnVal);
                        presenter.show({event:{}}, model);
                        expect(model[testCase.functName]()).toBe(testCase.returnVal);
                    });
                });
        });

    });
});
