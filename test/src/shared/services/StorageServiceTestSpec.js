/**
 * Created by justin on 1/27/15.
 */
define([
    'shared/services/StorageService'
], function (StorageService) {
    'use strict';
    describe("StorageService", function () {
        var sut;

        beforeEach(function () {
            window.localStorage.clear();
            window.sessionStorage.clear();
            sut = StorageService.newInstance();
        });


        it('should get the correct storage', function(){
            expect(sut.getStorage(false)).toBe(window.localStorage);
            expect(sut.getStorage(true)).toBe(window.sessionStorage);
        });

        describe("retrieve", function () {
            [{
                storeValue: "TestStore", expected: "TestStore"
            }, {
                storeValue: '{"data":"content","data2":"content2"}',
                expected: {
                    data: "content",
                    data2: "content2"
                }
            }].forEach(function (test) {
                    it("Should return correct value in localStorage", function () {
                        window.localStorage.setItem("TestStorage", test.storeValue);
                        var actual = sut.retrieve("TestStorage");
                        expect(actual).toEqual(test.expected);
                    });
                });
            it("Should return null when there's no value to retrieve", function () {
                var value = sut.retrieve("nothing_stored_with_this_long_name");
                expect(value).toBe(null);
            });
        });

        describe("store", function () {
            [{
                storeValue: "TestStore", expected: "TestStore"
            }, {
                storeValue: {
                    data: "content",
                    data2: "content2"
                }, expected: '{"data":"content","data2":"content2"}'
            }].forEach(function (test) {
                    it("Should save string value in localStorage", function () {
                        sut.store("TestStorage", test.storeValue);
                        expect(window.localStorage.getItem("TestStorage")).toEqual(test.expected);
                    });
                });
        });

        describe("remove", function () {
            it("Should remove value in localStorage", function () {
                window.localStorage.setItem("TestStorage", "Value12345");
                sut.remove("TestStorage");
                expect(window.localStorage.getItem("TestStorage")).toBeNull();
            });
        });

        describe("store/retrieve/remove round trip", function () {
            [{
                storeValue: "Test a String Value"
            }, {
                storeValue: {
                    data: "content",
                    data2: "content2"
                }
            }].forEach(function (test) {
                    it("Should work", function () {
                        var storeName = "TestStorage";
                        sut.store(storeName, test.storeValue);
                        expect(sut.retrieve(storeName)).toEqual(test.storeValue);
                        sut.remove(storeName);
                        expect(sut.retrieve(storeName)).toBe(null);
                    });
                });
        });

        describe('clear', function() {
            it('should remove all keys', function(){
                window.localStorage.setItem("key1", "value1");
                window.localStorage.setItem("key2", "value2");
                expect(window.localStorage.length).toBe(2);
                sut.clear();
                expect(window.localStorage.length).toBe(0);
            });
        });

        describe('session storage', function(){
            it('should store in the session storage when inSession is true', function(){
                sut.store("sessionKey","sessionValue", true);
                expect(window.sessionStorage.getItem("sessionKey")).toBe("sessionValue");
            });

            it('should retrieve from the session storage when inSession is true', function(){
                window.sessionStorage.setItem("sessionKey", "someSessionValue");
                expect(sut.retrieve("sessionKey", true)).toBe("someSessionValue");
            });

            it('should remove from the session storage when inSession is true', function(){
                var key = "anotherSessionKey";
                var value = "anotherSessionValue";
                window.sessionStorage.setItem(key, value);
                sut.remove(key, true);
                expect(window.sessionStorage.getItem(key)).toBe(null);
            });

            it('should remove all keys from storage when inSession is true', function(){
                window.sessionStorage.setItem("key1", "value1");
                window.sessionStorage.setItem("key2", "value2");
                expect(window.sessionStorage.length).toBe(2);
                sut.clear(true);
                expect(window.sessionStorage.length).toBe(0);
            });
        });


    });
});