/**
 * Created by justin on 12/22/14.
 */
define([
    'modules/saleAnalytics/widgets/WidgetBaseView'
], function (WidgetBaseView) {
    'use strict';
    describe("WidgetBaseView", function () {

        var sut, scope, presenter;



        beforeEach(inject(function (_$rootScope_) {
            presenter = {
                show: jasmine.createSpy()
            };
            scope = _$rootScope_.$new();
            sut = new WidgetBaseView(scope, {}, {}, presenter);
            sut.event.onReloadWidgetStart = jasmine.createSpy();
        }));

        describe("on show()", function () {
            it("should call show() on parent class", function () {
                spyOn(sut, '__show');
                sut.show();
                expect(sut.__show).toHaveBeenCalled();
            });
        });

        describe('onReloadWidgetSuccess', function () {
            beforeEach(function () {
                WidgetBaseView.prototype.___onReloadWidgetSuccess = WidgetBaseView.prototype.onReloadWidgetSuccess;
                WidgetBaseView.prototype.onReloadWidgetSuccess = function () {
                }
            });
            afterEach(function () {
                WidgetBaseView.prototype.onReloadWidgetSuccess = WidgetBaseView.prototype.___onReloadWidgetSuccess;
            });

            describe('After invoked', function () {
                it("should invoke the method _onReloadWidgetSuccess", function () {
                    var newSut = new WidgetBaseView(scope, {}, {}, presenter);
                    newSut._onReloadWidgetSuccess = jasmine.createSpy();

                    newSut.onReloadWidgetSuccess();
                    expect(newSut._onReloadWidgetSuccess).toHaveBeenCalled();
                });
            });
        });

        describe('onReloadCommandReceived', function () {
            it("should invoke the method onReloading", function () {
                sut.event.onReloading = jasmine.createSpy();

                sut.onReloadCommandReceived();
                expect(sut.event.onReloading).toHaveBeenCalled();
            });
        });
    });
});
