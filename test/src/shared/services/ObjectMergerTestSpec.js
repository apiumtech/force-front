/**
 * Created by kevin on 10/24/14.
 */
define([
    'shared/services/ObjectMerger'
], function (ObjectMergerClass) {
    'use strict';
    var ObjectMerger = ObjectMergerClass.getInstance();
    describe("ObjectMerger", function () {

        it("should merge two objects literally", function () {
            var left = {a: 1};
            var right = {b: 2};

            var result = ObjectMerger.leftMerge(left, right);
            expect(result).toEqual({a: 1, b: 2});
        });

        it("should merge two objects deeply", function () {
            var left = {a: 1, inner: {j: 1}};
            var right = {b: 2, inner: {k: 6}};

            var result = ObjectMerger.leftMerge(left, right);
            expect(result).toEqual({a: 1, b: 2, inner: {j: 1, k: 6}});
        });

        it("should merge two objects with the left side as the priority", function () {
            var left = {b: 1, inner: {j: 1}};
            var right = {b: 2, inner: {k: 6}};

            var result = ObjectMerger.leftMerge(left, right);
            expect(result).toEqual({b: 1, inner: {j: 1, k: 6}});
        });
    });

});

