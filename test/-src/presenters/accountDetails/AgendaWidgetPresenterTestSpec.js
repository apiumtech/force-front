/**
 * Created by justin on 3/18/15.
 */
describe("AgendaWidgetPresenter", function () {
    var AgendaWidgetPresenter = app.getPresenter('presenters/accountDetails/AgendaWidgetPresenter');
    var sut, view, model;

    beforeEach(function () {
        sut = AgendaWidgetPresenter.newInstance();
        view = {event: {}};
        model = {};
    });

    describe("show()", function () {
        [
            {
                viewEvent: "onLoadAgenda", test: onLoadAgendaTest
            }
        ].forEach(function (testCase) {
                var viewEvent = testCase.viewEvent,
                    test = testCase.test;

                describe("when event '" + viewEvent + "' fired", function () {
                    beforeEach(function () {
                        sut.show(view, model);
                    });
                    test();
                });
            });

        function onLoadAgendaTest() {
            var modelMethod = "loadAgendaData";
            var onSuccess = "onAgendaLoaded";
            var onError = "showError";
            exerciseAjaxCallBinding("onLoadAgenda", modelMethod, onSuccess, onError);
        }

        function exerciseAjaxCallBinding(viewEvent, modelMethod, onSuccess, onError) {
            beforeEach(function () {
                model[modelMethod] = function () {
                };
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