define([
    'shared/services/JsonWebTokenService'
], function (JsonWebTokenService) {
    'use strict';

    ddescribe("JsonWebTokenService", function () {

        describe("constructor", function () {
            it("should throw when no token is provided", function () {
                expect(function(){
                    new JsonWebTokenService();
                }).toThrow();
            });
            it('should save the token hash', function () {
                var theToken = "abcd";
                var sut = new JsonWebTokenService(theToken);
                expect(sut._token).toBe(theToken);
            });
        });

        describe("getPayload", function () {
            it("should provide the correct payload", function () {
                var theToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwYWJjZCIsIm5hbWUiOiJKb2huIGdnZ2cgRG9lIiwiYWRtaW4iOnRydWV9.34KvL7RzQ5H1mUuFMV6X9JiEeLrKI7rV4P08kW2RCec";
                var sut = new JsonWebTokenService(theToken);
                expect(sut.getPayload()).toEqual({
                    sub: "1234567890abcd",
                    name: "John gggg Doe",
                    admin: true
                });
            });
            it("should throw when the token is invalid", function () {
                var invalidTokens = [
                    "abc",
                    "a.b",
                    "a.b.c.d"
                ];
                invalidTokens.forEach(function(token){
                    var sut = new JsonWebTokenService(token);
                    expect(sut.getPayload).toThrow();
                });
            });
        });

    });

});