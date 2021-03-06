/**
 * Created by justin on 4/10/15.
 */
describe("String object extension", function () {

    describe("format", function () {
        it("should return new formatted string", function () {
            var input = "Hello {0}, my name is {1}";
            var expected = "Hello world, my name is Apium";
            var actual = input.format("world", "Apium");
            expect(actual).toEqual(expected);
        });
    });

    describe("startsWith", function () {
        describe("string starts with specified string", function () {
            it("should return true", function () {
                var input = "This is a fake string";
                expect(input.startsWith("This")).toBe(true);
            });
        });
        describe("string doesn't start with specified string", function () {
            it("should return false", function () {
                var input = "blah blah This is a fake string";
                expect(input.startsWith("This")).toBe(false);
            });
        });
    });

    describe("endsWith", function () {
        describe("string ends with specified string", function () {
            it("should return true", function () {
                var input = "This is a fake string";
                expect(input.endsWith("fake string")).toBe(true);
            });
        });
        describe("string doesn't end with specified string", function () {
            it("should return false", function () {
                var input = "blah blah This is a fake string, no it's not end with the string";
                expect(input.endsWith("This")).toBe(false);
            });
        });
    });
});