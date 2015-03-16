/**
 * Created by justin on 3/13/15.
 */

describe("ActivityWidgetView", function () {
    var ActivityWidgetView = app.getView("views/accountDetails/ActivityWidgetView");
    var sut, presenter, model, $scope, element;

    beforeEach(function () {
        element = {};
        model = {};
    });

    describe("baseview inheritance", function () {
        it("should call presenter's show method on show()", function () {
            var view = new ActivityWidgetView($scope, element, model, {show: jasmine.createSpy()});
            view.show();
            expect(view.presenter.show).toHaveBeenCalledWith(view, model);
        });

        it("should call presenter's showError method on showError()", function () {
            var view = new ActivityWidgetView($scope, element, model, {showError: jasmine.createSpy()});
            view.showError("some error");
            expect(view.presenter.showError).toHaveBeenCalledWith("some error");
        });
    });

    beforeEach(function () {
        sut = ActivityWidgetView.newInstance($scope, element, model, presenter, false).getOrElse(throwInstantiateException(ActivityWidgetView));
        sut.configureEvents();
    });

    describe("onAccountIdChanged", function () {
        it("should call loadActivityData if accountId is assigned", function () {
            sut.accountId = 1;
            spyOn(sut.eventChannel, 'sendReloadSignal');
            sut.onAccountIdChanged();
            expect(sut.eventChannel.sendReloadSignal).toHaveBeenCalled();
        });
        it("should assign nextPage if accountId is assigned", function () {
            sut.accountId = 1;
            spyOn(sut.eventChannel, 'sendReloadSignal');
            sut.onAccountIdChanged();
            expect(sut.nextPage).toEqual(true);
        });
        it("should not call loadActivityData if accountId is undefined or null", function () {
            spyOn(sut.eventChannel, 'sendReloadSignal');
            sut.onAccountIdChanged();
            expect(sut.eventChannel.sendReloadSignal).not.toHaveBeenCalled();
        });
    });

    describe("onActivityLoaded", function () {
        it("should send sendReloadCompleteSignal to event", function () {
            spyOn(sut.eventChannel, 'sendReloadCompleteSignal');
            sut.onActivityLoaded([]);
            expect(sut.eventChannel.sendReloadCompleteSignal).toHaveBeenCalledWith();
        });

        it("should assign isLastPage if data is empty list", function () {
            sut.isLastPage = false;
            spyOn(sut.eventChannel, 'sendReloadCompleteSignal');
            sut.onActivityLoaded([]);
            expect(sut.isLastPage).toBeTruthy();
        });

        it("should keep isLastPage false if data is not empty", function () {
            sut.isLastPage = false;
            spyOn(sut.eventChannel, 'sendReloadCompleteSignal');
            sut.onActivityLoaded([{}, {}]);
            expect(sut.isLastPage).toBeFalsy();
        });
    });

    describe("loadActivityData", function () {
        beforeEach(function () {
            sut.event = {
                onLoadActivity: jasmine.createSpy()
            };

            sut.nextPage = false;
        });

        it("should fire event onLoadActivity", function () {
            sut.accountId = 1;
            sut.currentPage = 1;
            sut.loadActivityData();
            expect(sut.event.onLoadActivity).toHaveBeenCalledWith(sut.accountId, sut.currentPage);
        });

        it("should move to nextPage if nextPage is true", function () {
            sut.accountId = 1;
            sut.currentPage = 1;
            sut.nextPage = true;
            sut.loadActivityData();
            expect(sut.currentPage).toEqual(2);
        });

        it("should switch nextPage to false", function () {
            sut.accountId = 1;
            sut.currentPage = 1;
            sut.nextPage = true;
            sut.loadActivityData();
            expect(sut.nextPage).toBeFalsy();
        });
    });

    describe("onReloadCommandReceived", function () {
        it("should call loadActivityData method", function () {
            spyOn(sut, 'loadActivityData');
            sut.onReloadCommandReceived();
            expect(sut.loadActivityData).toHaveBeenCalledWith();
        });
    });


});