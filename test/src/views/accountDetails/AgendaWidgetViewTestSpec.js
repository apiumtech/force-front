/**
 * Created by justin on 3/18/15.
 */

describe("AgendaWidgetView", function () {
    var AgendaWidgetView = app.getView("views/accountDetails/AgendaWidgetView");
    var sut, presenter, model, $scope, element;

    beforeEach(function () {
        element = {};
        model = {};
    });

    describe("baseview inheritance", function () {
        it("should call presenter's show method on show()", function () {
            var view = new AgendaWidgetView($scope, element, model, {show: jasmine.createSpy()});
            view.show();
            expect(view.presenter.show).toHaveBeenCalledWith(view, model);
        });

        it("should call presenter's showError method on showError()", function () {
            var view = new AgendaWidgetView($scope, element, model, {showError: jasmine.createSpy()});
            view.showError("some error");
            expect(view.presenter.showError).toHaveBeenCalledWith("some error");
        });
    });

    beforeEach(function () {
        sut = AgendaWidgetView.newInstance($scope, element, model, presenter, false).getOrElse(throwInstantiateException(AgendaWidgetView));
        sut.configureEvents();
    });

    describe("onAccountIdChanged", function () {
        it("should call sendReloadCommand if accountId is assigned", function () {
            sut.accountId = 1;
            spyOn(sut.eventChannel, 'sendReloadCommand');
            sut.onAccountIdChanged();
            expect(sut.eventChannel.sendReloadCommand).toHaveBeenCalled();
        });

        it("should not call sendReloadCommand if accountId is undefined or null", function () {
            spyOn(sut.eventChannel, 'sendReloadCommand');
            sut.onAccountIdChanged();
            expect(sut.eventChannel.sendReloadCommand).not.toHaveBeenCalled();
        });
    });

    describe("onAgendaLoaded", function () {
        it("should send sendReloadCompleteCommand to event", function () {
            spyOn(sut.eventChannel, 'sendReloadCompleteCommand');
            sut.onAgendaLoaded([]);
            expect(sut.eventChannel.sendReloadCompleteCommand).toHaveBeenCalledWith();
        });
    });

    describe("loadAgendaData", function () {
        beforeEach(function () {
            sut.event.onLoadAgenda = jasmine.createSpy();

            sut.nextPage = false;
        });

        it("should fire event onLoadActivity", function () {
            sut.accountId = 1;
            sut.loadAgendaData();
            expect(sut.event.onLoadAgenda).toHaveBeenCalledWith(sut.accountId);
        });
    });

    describe("onReloadCommandReceived", function () {
        it("should call loadAgendaData method", function () {
            spyOn(sut, 'loadAgendaData');
            sut.onReloadCommandReceived();
            expect(sut.loadAgendaData).toHaveBeenCalledWith();
        });
    });
});