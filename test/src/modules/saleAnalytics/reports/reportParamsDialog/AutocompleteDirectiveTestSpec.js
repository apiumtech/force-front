define([
    'shared/components/AutocompleteDirective',
    'shared/services/ajax/FakeAjaxService',
    'shared/services/ajax/AjaxService',
    'angular',
    'jquery',
    'jquery_ui'
], function (AutocompleteDirective, FakeAjaxService, AjaxService, angular, $) {
    'use strict';

    describe('AutocompleteDirective', function () {
        var $scope, ajaxService, fakeAjaxService;

        beforeEach(function () {
            inject(function ($rootScope) {
                $scope = $rootScope.$new();
            });
            fakeAjaxService = mock(FakeAjaxService);
            ajaxService = mock(AjaxService);
        });

        describe('construct', function () {
            it("should return restrict to EA and a linker function", function () {
                var directive = new AutocompleteDirective(fakeAjaxService, ajaxService);
                expect(directive.restrict).toEqual("EA");
            });
        });

        describe('linker method', function () {
            var element = angular.element("<div />");
            var directive;
            var sourceFunc;
            beforeEach(function () {
                spyOn($.fn, 'autocomplete').and.callFake(function (obj) {
                    sourceFunc = obj.source;
                    return obj.source;
                });
                directive = new AutocompleteDirective(ajaxService);
                directive.link($scope, element, {autocomplete: ""});
            });
            it('should link the element to auto complete jquery ui', function () {
                expect($.fn.autocomplete).toHaveBeenCalled();
            });
            describe('source method', function () {
                it('should define the source method', function () {
                    expect(sourceFunc).not.toBeUndefined();
                    expect(typeof sourceFunc === 'function').toBeTruthy();
                });

                describe('calling source method', function () {
                    var request = {},
                        response = sinon.spy();
                    var fakeResponse;
                    beforeEach(function () {
                        fakeResponse = [{}, {}, {}];
                        fakeAjaxService.rawAjaxRequest.returns(exerciseFakeOkPromiseWithArg(fakeResponse));
                    });
                    //TODO: enable this when fakeAjaxService can be removed completely
                    xit("should call ajaxService's rawAjaxRequest method", function () {
                        sourceFunc(request, response);
                        expect(fakeAjaxService.rawAjaxRequest).toHaveBeenCalled();
                    });
                    //TODO: enable this when fakeAjaxService can be removed completely
                    xit("should call response method after ajaxRequest success", function () {
                        sourceFunc(request, response);
                        expect(response).toHaveBeenCalledWith(fakeResponse);
                    });
                });
            });
        });
    });
});