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

        describe("loadAgendaData", function () {
            [{
                id: 100,
                expectUrl: Configuration.api.getAgenda + '/100'
            }].forEach(function (test) {
                    it("should call ajaxRequest with correct params", function () {
                        spyOn(ajaxService, 'rawAjaxRequest').and.returnValue(exerciseFakeOkPromise());
                        var id = test.id;
                        sut.loadAgendaData(id);
                        expect(ajaxService.rawAjaxRequest).toHaveBeenCalled();
                        expect(ajaxService.rawAjaxRequest.calls.mostRecent().args[0].url).toEqual(test.expectUrl);
                        expect(ajaxService.rawAjaxRequest.calls.mostRecent().args[0].type).toEqual('get');
                    });
                });

            it("should call decorateAgendaData to decorate response data", function () {
                spyOn(ajaxService, 'rawAjaxRequest').and.returnValue(exerciseFakeOkPromise());
                spyOn(sut, 'decorateAgendaData');
                var id = 100;
                sut.loadAgendaData(id);
                expect(sut.decorateAgendaData).toHaveBeenCalled();
            });
        });
    });
});