define([
    'modules/saleAnalytics/reports/ReportEventBus'
], function (ReportEventBus) {
    'use strict';

    describe('ReportEventBus', function () {
        describe("getInstance", function () {
            it("should get only one instance of ReportEventBus", function () {
                var currentDateTime = new Date().getTime();
                var instance = ReportEventBus.getInstance();
                instance._____currentDateTime = currentDateTime;

                var anotherSingleInstance = ReportEventBus.getInstance();
                expect(anotherSingleInstance._____currentDateTime).not.toBeUndefined();
                expect(anotherSingleInstance._____currentDateTime).toEqual(currentDateTime);
                expect(instance).toBe(anotherSingleInstance);
            });
        });

        describe("construct", function () {
            var events = [
                "AllReportTabSelected",
                "SearchReportTabSelected",
                "FavReportTabSelected",
                "SearchActivated",
                "SearchDeactivated",
                "FolderReportSelected",
                "PreviewReport",
                "ToggleFavourite"
            ];

            var sut;
            beforeEach(function () {
                sut = new ReportEventBus.getInstance();
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