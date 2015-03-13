/**
 * Created by justin on 3/13/15.
 */

describe("ActivityWidgetView", function () {
    var ActivityWidgetView = app.getView("views/accountDetails/ActivityWidgetView");
    var sut, presenter, model, $scope, element;

    beforeEach(function () {
        element = {};
    });

    it("should call presenter's show method on show()", function () {
        var model = {};
        var view = new ActivityWidgetView($scope, model, {show: jasmine.createSpy()});
        view.show();
        expect(view.presenter.show).toHaveBeenCalledWith(view, model);
    });

    it("should call presenter's showError method on showError()", function () {
        var view = new ActivityWidgetView($scope, {}, {showError: jasmine.createSpy()});
        view.showError("some error");
        expect(view.presenter.showError).toHaveBeenCalledWith("some error");
    });

    beforeEach(function () {
        sut = ActivityWidgetView.newInstance($scope, element, model, presenter, false, false).getOrElse(throwInstantiateException(ActivityWidgetView));
    });

    describe("onAccountIdChanged", function () {
        it("should call loadActivityData if accountId is assigned", function () {
            sut.accountId = 1;
            spyOn(sut.fn, 'loadActivityData');
            sut.onAccountIdChanged();
            expect(sut.fn.loadActivityData).toHaveBeenCalledWith(sut.accountId);
        });
        it("should not call loadActivityData if accountId is undefined or null", function () {
            spyOn(sut.fn, 'loadActivityData');
            sut.onAccountIdChanged();
            expect(sut.fn.loadActivityData).not.toHaveBeenCalled();
        });
    });

    describe("onActivityLoaded", function () {
        it("should send sendReloadCompleteSignal to event", function () {
            spyOn(sut.eventChannel, 'sendReloadCompleteSignal');
            sut.onActivityLoaded();
            expect(sut.eventChannel.sendReloadCompleteSignal).toHaveBeenCalledWith();
        });
    });
});