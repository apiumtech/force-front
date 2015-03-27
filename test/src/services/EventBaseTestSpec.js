/**
 * Created by justin on 3/27/15.
 */
describe("EventBase", function () {
    var EventBase = app.getService('services/EventBase');

    describe("construct", function () {
        var events = ["eventA", "eventB", "eventC"];

        function InheritedEventBase() {
            EventBase.call(this, events);
        }

        InheritedEventBase.prototype = Object.create(EventBase.prototype);

        describe("when creating new instance", function () {
            var sut;
            beforeEach(function () {
                sut = new InheritedEventBase();
            });

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
});