/**
 * Created by joanllenas 4/14/15.
 *
 */
define([
    'modules/contact/ContactModel'
], function (ContactModel) {
    'use strict';

    describe('ContactModel', function () {
        var model;

        beforeEach(function () {
            model = ContactModel.newInstance();
        });


        describe("loadContactColumns", function () {
            it("should resolve the promise when operation succeeds", function (done) {
                spyOn(model.entityService, "getEntityColumns").and.returnValue("some columns");
                model.loadContactColumns().then(
                    function (columns) {
                        expect(columns).toBe("some columns");
                        done();
                    },
                    function () {
                    }
                );
            });

            it("should reject the promise when operation fails", function (done) {
                spyOn(model.entityService, "getEntityByName").and.callFake(function () {
                    throw new Error("forced error");
                });
                model.loadContactColumns().then(
                    function () {
                    },
                    function (error) {
                        expect(error).toBeDefined();
                        done();
                    }
                );
            });
        });


        describe("loadContacts", function () {
            it("should make a tokenized ajax call ", function () {

                spyOn(model.authAjaxService, 'rawAjaxRequest');
                var fakeToken = "fake token";
                spyOn(model.storageService, 'retrieve').and.returnValue(fakeToken);

                model.loadContacts();

                expect(model.authAjaxService.rawAjaxRequest.calls.count()).toEqual(1);
                var argsForAjaxServiceCall = model.authAjaxService.rawAjaxRequest.calls.argsFor(0);
                var params = argsForAjaxServiceCall[0];

                expect(params.headers).toBeDefined();
                expect(params.headers.token).toBe(fakeToken);
            });
        });


        describe("loadContactFilters", function () {
            it("should resolve the promise when operation succeeds", function (done) {
                spyOn(model.entityService, "getEntityFilters").and.returnValue("some filters");
                model.loadContactFilters().then(
                    function (filters) {
                        expect(filters).toBe("some filters");
                        done();
                    },
                    function () {
                    }
                );
            });

            it("should reject the promise when operation fails", function (done) {
                spyOn(model.entityService, "getEntityByName").and.callFake(function () {
                    throw new Error("forced error");
                });
                model.loadContactFilters().then(
                    function () {
                    },
                    function (error) {
                        expect(error).toBeDefined();
                        done();
                    }
                );
            });
        });

    });
});
