define([
    'core/topMenu/TopMenuWeb2Model',
    'shared/services/ajax/AjaxService',
    'shared/services/StorageService'
], function (TopMenuWeb2Model, AjaxService, StorageService) {
    'use strict';

    var ajaxService, storageService, config;
    function exerciseCreateModel(){
        ajaxService = mock(AjaxService);
        storageService = mock(StorageService);
        config = {
            api:{
                logout: "logout url",
                getUserDataInfo: "getUserDataInfo url"
            }
        };
        return TopMenuWeb2Model.newInstance(ajaxService, storageService, config);
    }

    describe("TopMenuWeb2Model", function () {

        var sut;
        var userData = {
            userData:"some data",
            unreadNotifications:"some notifications",
            userSections:{sections:"some sections"},
            userOptions:{menuItems:"some items"}
        };

        beforeEach(function () {
            sut = exerciseCreateModel();
        });

        describe("get data method", function () {
            beforeEach(function () {
                spyOn(storageService, "retrieve").and.returnValue(userData);
            });

            describe("getUserSections", function () {
               it("should return user sections", function () {
                   expect(sut.getUserSections()).toBe("some sections");
               });
            });

            describe("getUserOptions", function () {
               it("should return user options", function () {
                   expect(sut.getUserOptions()).toBe("some items");
               });
            });

            describe("getUserData", function () {
               it("should return user data", function () {
                   expect(sut.getUserData()).toBe("some data");
               });
            });

            describe("getUserNotifications", function () {
               it("should return user notifications", function () {
                   expect(sut.getUserNotifications()).toBe("some notifications");
               });
            });
        });

        describe("logout", function () {
           it("should make and ajax call to the logout url", function () {
               spyOn(sut.ajaxService, "rawAjaxRequest").and.returnValue(exerciseFakePromise());
               sut.logout();
               var args = sut.ajaxService.rawAjaxRequest.calls.argsFor(0);
               expect(args[0].url).toBe("logout url");
           });
        });

        describe("getUserDataInfo", function () {
            it("should make and ajax call to the getUserDataInfo url", function () {
               spyOn(sut.ajaxService, "rawAjaxRequest").and.returnValue(exerciseFakePromise());
               sut.getUserDataInfo();
               var args = sut.ajaxService.rawAjaxRequest.calls.argsFor(0);
               expect(args[0].url).toBe("getUserDataInfo url");
            });
            it("should store User Data on ajax call success", function () {
                var userData = {d:JSON.stringify({some:"data"})};
               spyOn(sut.ajaxService, "rawAjaxRequest").and.returnValue(
                   exerciseFakeOkPromiseWithArg(userData)
               );
               spyOn(sut, "storeUserData");
               sut.getUserDataInfo();
               expect(sut.storeUserData).toHaveBeenCalledWith({some:"data"});
           });
        });

        describe("storeUserData", function () {
           it("should store user data", function () {
               spyOn(storageService, "store");
               sut.storeUserData("some user data");
               expect(storageService.store).toHaveBeenCalledWith(TopMenuWeb2Model.USER_DATA_KEY, "some user data");
           });
        });

    });
});