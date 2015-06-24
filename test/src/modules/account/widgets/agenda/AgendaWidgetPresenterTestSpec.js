/**
 * Created by justin on 3/18/15.
 */

define([
    'modules/account/widgets/agenda/AgendaWidgetPresenter',
    'modules/account/widgets/agenda/AgendaWidgetModel',
    'modules/account/widgets/agenda/AgendaWidgetView'
], function (AgendaWidgetPresenter, AgendaWidgetModel, AgendaWidgetView) {
    'use strict';
    describe("AgendaWidgetPresenter", function () {

        var sut, view, model;

        beforeEach(function () {
            view = mock(AgendaWidgetView);
            model = mock(AgendaWidgetModel);
            sut = new AgendaWidgetPresenter(model);
        });


        describe('show', function () {
            beforeEach(function () {
                sut.show(view);
            });

            [
                {method: 'onLoadAgenda', modelMethod: 'loadAgendaData', onSuccess: 'onAgendaLoaded', onError: 'showError'},
                {method: 'onAddEvent', modelMethod: 'addEvent', onSuccess: 'onEventAdded', onError: 'showError'}
            ].forEach(function(testCase){
                    describe('view.event.' + testCase.method, function () {
                        exerciseAjaxCallBinding(testCase.method, testCase.modelMethod, testCase.onSuccess, testCase.onError);
                    });

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