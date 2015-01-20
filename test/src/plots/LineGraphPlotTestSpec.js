/**
 * Created by kevin on 1/13/15.
 */

describe("LineGraphPlot", function () {
    var LineGraphPlot = app.getService('plots/LineGraphPlot');

    function exerciseAnySut() {
        return LineGraphPlot.newInstance().getOrElse(throwException("could not create the graph plot"));
    }

    [
        { action: 'rename', parameter: 'value', it: 'should return a new plot with the new label', onField: 'label'},
        { action: 'hide', parameter: true, it: 'should return a new hidden plot', onField: 'hidden'},
        { action: 'show', parameter: false, it: 'should return a new visible plot', onField: 'hidden'},
        { action: 'fill', parameter: true, it: 'should return a new filled plot', onField: 'filled'},
        { action: 'empty', parameter: false, it: 'should return a new empty plot', onField: 'filled'},
        { action: 'data', parameter: [], it: 'should return a new plot with the new data', onField: 'plotData'},
        { action: 'data', parameter: null, it: 'should return a new plot with the new data', onField: 'plotData', expected: [] }
    ].forEach(function (testCase) {
        describe(testCase.action, function () {
            var value = testCase.parameter;
            var expected = testCase.expected || value;

            function exerciseCase(sut) {
                return sut[testCase.action](value);
            }

            it(testCase.it, function () {
                var sut = exerciseAnySut();
                var output = exerciseCase(sut);

                expect(output[testCase.onField]).toEqual(expected);
            });

            describe("final state of other fields", function () {
                var output = undefined;
                var input = undefined;

                beforeEach(function () {
                    input = exerciseAnySut();
                    output = exerciseCase(input);
                });

                ['label', 'hidden', 'filled', 'plotData']
                    .filter(function (k) { return k != testCase.onField }).forEach(function (innerCase) {
                        it("should be maintained for field " + innerCase, function () {
                            expect(output[innerCase]).toEqual(input[innerCase]);
                        });
                    });
            });
        });
    });

    describe("digest", function () {
        var sut = undefined;
        beforeEach(function () {
            sut = exerciseAnySut();
        });

        it("should contain the data indexed", function () {
            var data = ["a", "b"];
            var indexed = [[0, "a"], [1, "b"]];

            var result = sut.data(data).digest();
            expect(result.data).toEqual(indexed);
        });

        it("should contain the hidden parameter", function () {
            var sut = exerciseAnySut();

            var result = sut.hide().digest();
            expect(result.lines.show).toEqual(false);
        });

        it("should contain the filled parameter", function () {
            var sut = exerciseAnySut();

            var result = sut.fill().digest();
            expect(result.lines.fill).toEqual(true);
        });

        [
            { value: "hi", expect: "hi" },
            { value: None(), expect: undefined },
            { value: Some("hi"), expect: "hi" }
        ].forEach(function (testCase) {
            it("should contain the label parameter for " + JSON.stringify(testCase), function () {
                var sut = exerciseAnySut();
                var result = sut.rename(testCase.value).digest();
                expect(result.label).toEqual(testCase.expect);
            });
        });
    });

});

