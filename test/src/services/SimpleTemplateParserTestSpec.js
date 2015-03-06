/**
 * Created by justin on 3/6/15.
 */
describe("SimpleTemplateParser", function () {
    var SimpleTemplateParser = app.getService("services/SimpleTemplateParser");

    var sut;

    beforeEach(function () {
        sut = SimpleTemplateParser.newInstance().getOrElse(throwInstantiateException(SimpleTemplateParser));
    });

    describe("getKeysFromTemplate", function () {
        [{
            templateString: "",
            expected: []
        }, {
            templateString: "this is string {string}, {string2}, {string3}",
            expected: ["string", "string2", "string3"]
        }, {
            templateString: "template {key1} {account.name}, {contactInfo.address}",
            expected: ["key1", "account.name", "contactInfo.address"]
        }].forEach(function (test) {
                describe("parsing '" + test.templateString + "'", function () {
                    it("should return correct list of keys", function () {
                        var actual = sut.getKeysFromTemplate(test.templateString);
                        expect(actual).toEqual(test.expected);
                    });
                });
            });
    });

    describe("getValueFromKey", function () {
        describe("Single key", function () {
            var obj = {
                name: "nameValue",
                address: "addressValue"
            };
            it("should return correct value", function () {
                var actual = sut.getValueFromKey(obj, "address");
                expect(actual).toEqual("addressValue");
            });

            it("should return empty string if the key does not exist in the object", function () {
                var key = 'notExistKey';

                var actual = sut.getValueFromKey(obj, key);
                expect(actual).toEqual("");
            });
        });
    });

    describe("parseTemplate", function () {
        var testData = {
            template: "Hello {name}",
            object: {
                name: "accountName"
            },
            expected: "Hello accountName"
        };

        it("should call method 'getValueFromKey'", function () {
            spyOn(sut, 'getValueFromKey');
            sut.parseTemplate(testData.template, testData.object);
            expect(sut.getValueFromKey).toHaveBeenCalled();
        });


        it("should return correct output", function () {
            spyOn(sut, 'getValueFromKey').and.returnValue("accountName");
            var actual = sut.parseTemplate(testData.template, testData.object);
            expect(actual).toEqual(testData.expected);
        });

        [{
            template: "His address is at {contactInfo.address} {contactInfo.city}",
            callCount: 2
        }, {
            template: "Complex template with {three} {brackets} to {parse}",
            callCount: 3
        }, {
            template: "Complex {template} with {four} {brackets} to {parse}",
            callCount: 4
        }].forEach(function (testCase) {
                var template = testCase.template,
                    callCount = testCase.callCount;

                describe("Parsing '" + template + "'", function () {
                    it("should call method 'getValueFromKey' " + callCount + " times", function () {
                        spyOn(sut, 'getValueFromKey');
                        sut.parseTemplate(template, {});
                        expect(sut.getValueFromKey).toHaveBeenCalled();
                        expect(sut.getValueFromKey.calls.count()).toEqual(callCount);
                    });
                });
            });
    });
});