define([
    'modules/account/widgets/agenda/agendaCalendar/AgendaCalendarPresenter',
    'modules/account/widgets/agenda/agendaCalendar/AgendaCalendarModel',
    'modules/account/widgets/agenda/agendaCalendar/AgendaCalendarView'
], function(AgendaCalendarPresenter, AgendaCalendarModel, AgendaCalendarView) {
    'use strict';

    describe('AgendaCalendarPresenter Test', function() {
        var sut, model, view;
        beforeEach(function(){
            model = mock(AgendaCalendarModel);
            view = mock(AgendaCalendarView);
            sut = new AgendaCalendarPresenter(model);
        });

        describe('show', function () {
            beforeEach(function () {
                sut.show(view);
            });

            describe('view.event.onLoadEvents', function () {
                var modelMethod = "loadEvents";
                var onSuccess = "onEventsLoaded";
                var onError = "showError";
                exerciseAjaxCallBinding("onLoadEvents", modelMethod, onSuccess, onError);
            });

        });

        function exerciseAjaxCallBinding(viewEvent, modelMethod, onSuccess, onError) {
            beforeEach(function () {
                view[onSuccess] = jasmine.createSpy();
                view[onError] = jasmine.createSpy();
            });
            it("presenter should connect event to '" + modelMethod + "' method on $model", function () {
                spyOn(model, modelMethod).and.returnValue(exerciseFakePromise());
                view.event[viewEvent]();
                expect(model[modelMethod]).toHaveBeenCalled();
            });

            it("should call method '" + onSuccess + "' on $view if $model '" + modelMethod + "' return success", function () {
                spyOn(model, modelMethod).and.returnValue(exerciseFakeOkPromise());
                view.event[viewEvent]();
                expect(view[onSuccess]).toHaveBeenCalled();
            });

            it("should call method '" + onError + "' on $view if $model '" + modelMethod + "' return error", function () {
                spyOn(model, modelMethod).and.returnValue(exerciseFakeKoPromise());
                view.event[viewEvent]();
                expect(view[onError]).toHaveBeenCalled();
            });
        }


    });
});