define([
    'shared/components/AutocompleteDirective',
    'shared/services/ajax/AjaxService',
    'angular',
    'jquery',
    'jquery_ui'
], function (AutocompleteDirective, AjaxService, angular, $) {
    'use strict';

    describe('AutocompleteDirective', function () {
        var $scope, ajaxService;

        beforeEach(function () {
            inject(function ($rootScope) {
                $scope = $rootScope.$new();
            });
            ajaxService = mock(AjaxService);
        });

        describe('construct', function () {
            it("should return restrict to EA and a linker function", function () {
                var directive = new AutocompleteDirective(ajaxService);
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
                        fakeResponse = [{Id:1,Name:"A name"}, {Id:2,Name:"B name"}, {Id:3,Name:"C name"}];
                        ajaxService.rawAjaxRequest.returns(exerciseFakeOkPromiseWithArg(fakeResponse));
                    });
                    it("should call ajaxService's rawAjaxRequest method", function () {
                        sourceFunc(request, response);
                        expect(ajaxService.rawAjaxRequest).toHaveBeenCalled();
                    });
                    it("should call response method after ajaxRequest success", function () {
                        var adaptedFakeResponse = [
                            {id:1,label:"A name", value:"A name"},
                            {id:2,label:"B name", value:"B name"},
                            {id:3,label:"C name", value:"C name"}
                        ];
                        sourceFunc(request, response);
                        expect(response).toHaveBeenCalledWith(adaptedFakeResponse);
                    });
                });
            });
        });
    });
});