/**
 * Created by kevin on 10/28/14.
 */
define([
    'shared/services/ajax/AuthAjaxService',
    'config'
], function (AuthAjaxService, Configuration) {
    'use strict';

    describe("AuthAjaxService", function () {
        var sut, ajaxSvc, storageSvc;

        beforeEach(function () {
            ajaxSvc = {
                ajax: function () {
                }
            };

            storageSvc = {
                retrieve: function () {
                },
                storage: function () {
                }
            };
            sut = new AuthAjaxService(ajaxSvc, storageSvc);
        });

        describe("mapRequest", function () {
            it("should assign header token", function () {
                spyOn(storageSvc, 'retrieve').and.returnValue('fake_token');
                var request = {};
                request = sut.mapRequest(request);
                expect(storageSvc.retrieve).toHaveBeenCalled();
                expect(request.headers.token).toEqual('fake_token');
            });
        });
    });
});