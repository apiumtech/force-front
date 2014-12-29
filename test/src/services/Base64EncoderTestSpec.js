/**
 * Created by justin on 12/23/14.
 */
describe("Base64Encoder", function () {
    var Base64Encoder = app.getService('services/b64StringEncoder');
    var sut = Base64Encoder.instance();
    var validBase64String = "RGVjb2RlIGFuZCBFbmNvZGUgQmFzZTY0ICh1c2luZyBKYXZhU2NyaXB0KQ==",
        inValidBase64String = "&^#**/asd;;'[";

    describe("validate base64 string", function () {
        [
            {string: validBase64String, expect: true},
            {string: inValidBase64String, expect: false},
        ].forEach(function (testCase) {
                var expected = testCase.expect,
                    input = testCase.string;
                it("Validation of '" + input + "' should be '" + expected + "'", function () {
                    if (expected) {
                        var actual = sut._validateInput(input);
                        expect(actual).toEqual(expected);
                    } else {
                        expect(function () {
                            sut._validateInput(input);
                        }).toThrowError("input base64string is not valid");
                    }
                });
            });
    });

    describe("construct new Base64Encoder instance from specific base64string", function () {
        it("should throw error if input is not valid", function () {
            expect(function () {
                Base64Encoder.fromBase64(inValidBase64String);
            }).toThrowError("input base64string is not valid");
        });

        it("should assign base64 string", function () {
            var instance = Base64Encoder.fromBase64(validBase64String);
            expect(instance.base64String).toEqual(validBase64String);
        });
    });

    [
        {plainText: "Hello World!", base64String: "SGVsbG8gV29ybGQh"},
        {plainText: "Decode and Encode Base64 (using JavaScript)", base64String: "RGVjb2RlIGFuZCBFbmNvZGUgQmFzZTY0ICh1c2luZyBKYXZhU2NyaXB0KQ=="}
    ].forEach(function (item) {
            var plainText = item.plainText,
                base64String = item.base64String;

            describe("encode '" + plainText + "'", function () {
                it("Should return correct base64 string: '" + base64String + "'", function () {
                    var actual = sut.encode(plainText);
                    expect(actual).toEqual(base64String);
                });
            });

            describe("decode '" + base64String + "'", function () {
                it("should validate input string", function () {
                    spyOn(sut, '_validateInput');
                    sut.decode(base64String);
                    expect(sut._validateInput).toHaveBeenCalledWith(base64String);
                });

                it("should return correct string: '" + plainText + "'", function () {
                    var actual = sut.decode(base64String);
                    expect(actual).toEqual(plainText);
                });
            });
        });
});