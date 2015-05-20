/**
 * Created by justin on 3/27/15.
 */

define([
    'shared/services/EventBase'
], function (EventBase) {
    'use strict';
    describe("EventBase", function () {

        function InheritedEventBase() {
            EventBase.call(this);
        }

        InheritedEventBase.prototype = Object.create(EventBase.prototype);
        InheritedEventBase.prototype.onEventA = function () {
        };
        InheritedEventBase.prototype.fireEventA = function () {
        };
        InheritedEventBase.prototype.unsubscribeEventA = function () {
        };

        var sut;
        beforeEach(function () {
            sut = new InheritedEventBase();
        });

        describe("construct", function () {
            describe("when creating new instance", function () {
                it("should define the signal", function () {
                    expect(sut.EventA).not.toBeUndefined();
                    expect(sut.EventA).not.toBeNull();
                });

                it("should assign callback to on event", function () {
                    spyOn(sut.EventA, 'add');
                    var callback = function () {
                    };
                    sut.onEventA(callback);
                    expect(sut.EventA.add).toHaveBeenCalledWith(callback);
                });

                it("should call removeAll on unsubscribe", function () {
                    spyOn(sut.EventA, 'removeAll');
                    sut.unsubscribeEventA();
                    expect(sut.EventA.removeAll).toHaveBeenCalled();
                });
            });
        });

        describe("dispose", function () {
            beforeEach(function () {
                spyOn(sut, 'unsubscribeEventA');
            });
            it("should unsubscribe event", function () {
                sut.dispose();
                expect(sut.unsubscribeEventA).toHaveBeenCalled();
            });
        });
    });
});