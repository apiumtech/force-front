/**
 * Created by justin on 3/18/15.
 */
define([
    'modules/account/widgets/agenda/AgendaWidgetModel',
    'config'
], function (AgendaWidgetModel, Configuration) {
    'use strict';
    describe("AgendaWidgetModel", function () {

        var sut, ajaxService;

        beforeEach(function () {
            ajaxService = {
                rawAjaxRequest: function () {
                }
            };

            sut = AgendaWidgetModel.newInstance(ajaxService);
        });

        describe("loadEvents", function () {
            [{
                id: 100,
                expectUrl: Configuration.api.getAgenda.format(100)
            }].forEach(function (test) {
                    it("should call ajaxRequest with correct params", function () {
                        spyOn(ajaxService, 'rawAjaxRequest').and.returnValue(exerciseFakeOkPromise());
                        var id = test.id;
                        sut.loadEvents(id);
                        expect(ajaxService.rawAjaxRequest).toHaveBeenCalled();
                        expect(ajaxService.rawAjaxRequest.calls.mostRecent().args[0].url).toEqual(test.expectUrl);
                        expect(ajaxService.rawAjaxRequest.calls.mostRecent().args[0].type).toEqual('get');
                    });
                });
        });

        describe("addEvent", function () {
            [{
                event: {
                    title: "New event",
                    description: "Event desc",
                    start: "12-12-2015T09:30",
                    end: "12-12-2015T10:30"
                },
                expectUrl: Configuration.api.createAgenda
            }].forEach(function (test) {
                    it("should call ajaxRequest with correct params", function () {
                        spyOn(ajaxService, 'rawAjaxRequest').and.returnValue(exerciseFakeOkPromise());
                        var event = test.event;
                        sut.addEvent(event);
                        expect(ajaxService.rawAjaxRequest).toHaveBeenCalled();
                        expect(ajaxService.rawAjaxRequest.calls.mostRecent().args[0].url).toEqual(test.expectUrl);
                        expect(ajaxService.rawAjaxRequest.calls.mostRecent().args[0].type).toEqual('POST');
                        expect(ajaxService.rawAjaxRequest.calls.mostRecent().args[0].data).toEqual(event);
                    });
                });
        });

        describe("deleteEvent", function () {
            [{
                event: {
                    id: 10,
                    title: "New event",
                    description: "Event desc",
                    start: "12-12-2015T09:30",
                    end: "12-12-2015T10:30"
                },
                expectUrl: Configuration.api.deleteAgenda + "/10"
            }].forEach(function (test) {
                    it("should call ajaxRequest with correct params", function () {
                        spyOn(ajaxService, 'rawAjaxRequest').and.returnValue(exerciseFakeOkPromise());
                        var event = test.event;
                        sut.deleteEvent(event);
                        expect(ajaxService.rawAjaxRequest).toHaveBeenCalled();
                        expect(ajaxService.rawAjaxRequest.calls.mostRecent().args[0].url).toEqual(test.expectUrl);
                        expect(ajaxService.rawAjaxRequest.calls.mostRecent().args[0].type).toEqual('delete');
                    });
                });
        });

    });
});