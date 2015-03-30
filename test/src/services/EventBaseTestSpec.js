/**
 * Created by justin on 3/27/15.
 */

describe("EventBase", function () {
    var EventBase = app.getService('services/EventBase');

    var events = ["eventA", "eventB", "eventC"];

    function InheritedEventBase() {
        EventBase.call(this, events);
    }

    InheritedEventBase.prototype = Object.create(EventBase.prototype);
    var sut;
    beforeEach(function () {
        sut = new InheritedEventBase();
    });

    describe("construct", function () {
        describe("when creating new instance", function () {
            it("should assign signal", function () {
                events.forEach(function (eventName) {
                    expect(sut[eventName]).not.toBeUndefined();
                    expect(sut["on" + eventName]).not.toBeUndefined();
                    expect(sut["fire" + eventName]).not.toBeUndefined();
                    expect(sut["unsubscribe" + eventName]).not.toBeUndefined();
                });
            });

            it("should assign callback to on event", function () {
                spyOn(sut.eventA, 'add');
                var callback = function () {
                };
                sut.oneventA(callback);
                expect(sut.eventA.add).toHaveBeenCalledWith(callback);
            });

            it("should call removeAll on unsubscribe", function () {
                spyOn(sut.eventC, 'removeAll');
                sut.unsubscribeeventC();
                expect(sut.eventC.removeAll).toHaveBeenCalled();
            });
        });
    });

    describe("dispose", function () {
        beforeEach(function () {
            events.forEach(function (event) {
                spyOn(sut, 'unsubscribe' + event);
            });
        });

        events.forEach(function (event) {
            it("should unsubscribe '" + event + "' event", function () {
                sut.dispose();
                expect(sut['unsubscribe' + event]).toHaveBeenCalled();
            });
        });
    });
});