/**
 * Created by justin on 1/27/15.
 */
describe("StorageService", function () {
    var StorageService = app.getService("services/StorageService");

    var sut;

    beforeEach(function () {
        sut = StorageService.newInstance();
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
        it("Should return null when there's no value to retrieve", function(){
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


});