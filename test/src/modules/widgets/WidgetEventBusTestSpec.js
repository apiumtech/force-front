/**
 * Created by justin on 3/30/15.
 */
define([
    'modules/widgets/WidgetEventBus'
], function (WidgetEventBus) {
    'use strict';
    describe("WidgetEventBus", function () {

        describe("construct", function () {
            var events = [
                "RemovingWidget"
            ];

            var sut;
            beforeEach(function () {
                sut = new WidgetEventBus();
            });

            describe("when creating new instance", function () {
                events.forEach(function (eventName) {
                    it("should define event " + eventName, function () {
                        expect(sut[eventName]).not.toBeUndefined();
                    });
                    it("should assign event handler 'on" + eventName + "'", function () {
                        expect(sut["on" + eventName]).not.toBeUndefined();
                    });
                    it("should define event firer 'fire" + eventName + "'", function () {
                        expect(sut["fire" + eventName]).not.toBeUndefined();
                    });
                    it("should assign unsubscribe method to event " + eventName, function () {
                        expect(sut["unsubscribe" + eventName]).not.toBeUndefined();
                    });
                });
            });

            events.forEach(function (event) {
                describe("Event: " + event, function () {
                    it("should assign callback to on event", function () {
                        spyOn(sut[event], 'add');
                        var callback = function () {
                        };
                        sut['on' + event](callback);
                        expect(sut[event].add).toHaveBeenCalledWith(callback);
                    });

                    it("should call removeAll on unsubscribe", function () {
                        spyOn(sut[event], 'removeAll');
                        sut['unsubscribe' + event]();
                        expect(sut[event].removeAll).toHaveBeenCalled();
                    });
                });
            });
        });
    });
});