/**
 * Created by apium on 6/1/15.
 */
define([
    'functional-option'
], function () {
    'use strict';

    describe('functional-option', function () {
        function ParentClass() {

        }

        ParentClass.prototype.methodFromParent = function () {
            return "some_test_string";
        };

        describe("Inheritance test", function () {

            it("should inherit parent class", function () {
                function ChildClass() {
                    ParentClass.call(this);
                }

                ChildClass.inherits(ParentClass);

                var childSut = new ChildClass();
                expect(childSut.methodFromParent).not.toBeNull();
                expect(childSut.methodFromParent).not.toBeUndefined();
                expect(childSut.methodFromParent()).toEqual("some_test_string");
            });
        });
    });
});