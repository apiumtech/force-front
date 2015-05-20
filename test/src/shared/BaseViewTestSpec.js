/**
 * Created by xavi on 12/19/14.
 */
define([
    'shared/BaseView'
], function (BaseView) {
    'use strict';
    describe("BaseView", function () {

        it("should call presenter's show method on show()", function () {
            var model = {};
            var view = new BaseView({}, model, {show: jasmine.createSpy()});
            view.show();
            expect(view.presenter.show).toHaveBeenCalledWith(view, model);
        });

        it("should call presenter's showError method on showError()", function () {
            var view = new BaseView({}, {}, {showError: jasmine.createSpy()});
            view.showError("some error");
            expect(view.presenter.showError).toHaveBeenCalledWith("some error");
        });
    });
});