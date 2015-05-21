/**
 * Created by justin on 3/9/15.
 */
define([
    'modules/account/widgets/activity/ActivityWidgetModel',
    'config'
], function(ActivityWidgetModel, Configuration){
    'use strict';
    describe("ActivityWidgetModel", function () {

        var sut, ajaxService;

        beforeEach(function () {
            ajaxService = {
                rawAjaxRequest: function () {
                }
            };

            sut = ActivityWidgetModel.newInstance(ajaxService);
        });

        describe("loadActivity", function () {
            [{
                id: 100,
                expectUrl: Configuration.api.getActivity + '/100'
            }, {
                id: 1001,
                pageIndex: 5,
                expectUrl: Configuration.api.getActivity + '/1001?pageIndex=5'
            }].forEach(function (test) {
                    it("should call ajaxRequest with correct params", function () {
                        spyOn(ajaxService, 'rawAjaxRequest').and.returnValue(exerciseFakeOkPromise());
                        var id = test.id;
                        var pageIndex = test.pageIndex;
                        sut.loadActivity(id, pageIndex);
                        expect(ajaxService.rawAjaxRequest).toHaveBeenCalled();
                        expect(ajaxService.rawAjaxRequest.calls.mostRecent().args[0].url).toEqual(test.expectUrl);
                        expect(ajaxService.rawAjaxRequest.calls.mostRecent().args[0].type).toEqual('get');
                    });
                });

            it("should call decorateAccountDetailData to decorate response data", function () {
                spyOn(ajaxService, 'rawAjaxRequest').and.returnValue(exerciseFakeOkPromise());
                spyOn(sut, 'decorateActivityData');
                var id = 100;
                sut.loadActivity(id);
                expect(sut.decorateActivityData).toHaveBeenCalled();
            });
        });

        describe("toggleFollow", function () {
            it("should call rawAjaxRequest with correct url", function () {
                var toFollow = 10;
                spyOn(ajaxService, 'rawAjaxRequest');
                sut.toggleFollow(toFollow);
                expect(ajaxService.rawAjaxRequest).toHaveBeenCalled();
                expect(ajaxService.rawAjaxRequest.calls.mostRecent().args[0].url).toEqual(Configuration.api.toggleFollowActivity + "/" + 10);
                expect(ajaxService.rawAjaxRequest.calls.mostRecent().args[0].type).toEqual('post');
            });
        });
    });
});