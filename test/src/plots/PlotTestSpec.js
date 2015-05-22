/**
 * Created by kevin on 1/13/15.
 */

define(['plots/Plot'], function (Plot) {
    'use strict';

    describe("Plot", function () {
        function exerciseAnySut() {
            return Plot.newInstance([], []);
        }

        describe("_isNotEmpty", function () {
            [
                { from: None(), expected: false },
                { from: null, expected: false },
                { from: undefined, expected: false },
                { from: "hola", expected: true },
                { from: Some("hola"), expected: true }
            ].forEach(function (testCase) {
                    it("should be " + testCase.expected + " for " + JSON.stringify(testCase.from), function () {
                        expect(Plot._isNotEmpty(testCase.from)).toEqual(testCase.expected);
                    });
                });
        });

        describe("_asPlot", function () {
            [
                { from: "A", expected: "A" },
                { from: Some("a"), expected: "a" },
                { from: null, expectedException: "e is null" },
                { from: undefined, expectedException: "e is null" },
                { from: None(), expectedException: "could not get plot" }
            ].forEach(function (testCase) {
                    it("should return the wrapped object " + JSON.stringify(testCase.from), function () {
                        if (testCase.expectedException) {
                            expect(Plot._asPlot.bind(null, testCase.from)).toThrow(new Error(testCase.expectedException));
                        } else {
                            expect(Plot._asPlot(testCase.from)).toEqual(testCase.expected);
                        }
                    });
                });
        });

        describe("_asLabel", function () {
            [
                { from: ["A", 1], expected: [1, "A"] },
                { from: [Some("A"), 1], expected: [1, "A"] },
                { from: [None(), 1], expectedException: "invalid label" },
                { from: [null, 1], expectedException: "e is null" },
                { from: [undefined, 1], expectedException: "e is null" }
            ].forEach(function (testCase) {
                    it("should return the wrapped object", function () {
                        if (testCase.expectedException) {
                            expect(Plot._asLabel.bind(null, testCase.from[0], testCase.from[1])).toThrow(new Error(testCase.expectedException));
                        } else {
                            expect(Plot._asLabel(testCase.from[0], testCase.from[1])).toEqual(testCase.expected);
                        }
                    });
                });
        });
    });
});
