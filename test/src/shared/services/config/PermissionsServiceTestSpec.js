define([
    'shared/services/config/PermissionsService'
], function(PermissionsService) {
    'use strict';

    describe('PermissionsService Test', function() {
        var sut;
        beforeEach(function(){
            sut = PermissionsService.newInstance();
        });

        it('should find permissions json in the sessionstorage', function(){
            spyOn(sut.storageService, "retrieve");
            sut._getPermissionsFromStorage();
            expect(sut.storageService.retrieve).toHaveBeenCalledWith("fm_permissions", true);
        });

        it('should convert json to dictionary', function(){
            var rawPermissions = {
                agenda: {
                    canCreate: true,
                    canUpdate: false,
                },
                "sfm.isEnabled": true
            };
            var parsedPermissions = {
                "agenda.canCreate": true,
                "agenda.canUpdate": false,
                "sfm.isEnabled": true
            };
            expect(sut._parseRawPermissions(rawPermissions)).toEqual(parsedPermissions);
        });

        describe("getPermission", function () {
            it('should find permission', function () {
                var parsedPermissions = {
                    "agenda.canUpdate": false,
                    "sfm.isEnabled": true
                };
                spyOn(sut, "_parseRawPermissions").and.returnValue(parsedPermissions);
                expect(sut.getPermission("sfm.isEnabled")).toBe(true);
                expect(sut.getPermission("agenda.canUpdate")).toBe(false);
            });

            it('should parse raw permissions when parsedPermissions is not set', function () {
                spyOn(sut, "_parseRawPermissions").and.returnValue({
                    "something.isOk": true
                });
                sut.getPermission("something.isOk");
                expect(sut._parseRawPermissions).toHaveBeenCalled();
            });

            it('should not parse raw permissions when parsedPermissions is set', function () {
                spyOn(sut, "_parseRawPermissions");
                sut.parsedPermissions = {
                    "nothing.isOk": true
                };
                sut.getPermission("nothing.isOk");
                expect(sut._parseRawPermissions).not.toHaveBeenCalled();
            });

            it('should return the defualt value when permission is not found', function () {
                spyOn(sut, "_parseRawPermissions");
                sut.parsedPermissions = {
                    "nothing.isOk": "hola"
                };
                expect(sut.getPermission("something.isOk", true)).toBe(true);
            });

            it('should return false when permission is not found and defaultValue is not set', function () {
                spyOn(sut, "_parseRawPermissions");
                sut.parsedPermissions = {
                    "nothing.isOk": "hola"
                };
                expect(sut.getPermission("something.isOk")).toBe(false);
            });
        });
    });
});