define([
    'modules/literals/shared/edit-create/BaseLiteralsEditCreateView'
], function (BaseLiteralsEditCreateView) {
    'use strict';

    var $scope, $model, $presenter, $routeParams, $window;
    function exerciseCreateView(){
        return new BaseLiteralsEditCreateView($scope, $model, $presenter, $routeParams, $window);
    }

    describe("BaseLiteralsEditCreateView", function(){

        it('configureProperties should throw', function () {
            expect(exerciseCreateView).toThrow();
        });

        describe('on instantiation', function () {
            beforeEach(function(){
                spyOn(BaseLiteralsEditCreateView.prototype, "configureProperties");// avoid throwing
                spyOn(BaseLiteralsEditCreateView.prototype, "configureEvents").and.callThrough();
            });
            it('should have data.isLoading set to false', function () {
                var sut = exerciseCreateView();
                expect(sut.data.isLoading).toBe(false);
            });
            it('should have data.currentError set to null', function () {
                var sut = exerciseCreateView();
                expect(sut.data.currentError).toBe(null);
            });
            it('should call configureProperties', function () {
                var sut = exerciseCreateView();
                expect(sut.configureProperties).toHaveBeenCalled();
            });
            it('should call configureEvents', function () {
                var sut = exerciseCreateView();
                expect(sut.configureEvents).toHaveBeenCalled();
            });
        });

        describe('onCancel', function () {
            it('should call _goBack', function(){
                spyOn(BaseLiteralsEditCreateView.prototype, "configureProperties");// avoid throwing
                var sut = exerciseCreateView();
                spyOn(sut, "_goBack");
                sut.onCancel();
                expect(sut._goBack).toHaveBeenCalled();
            })
        });

        describe('isValid', function () {
            it('should call $validation checkValid', function(){
                spyOn(BaseLiteralsEditCreateView.prototype, "configureProperties");// avoid throwing
                var isValid;
                $scope = {
                    $validation: {
                        checkValid: function(){
                            return isValid;
                        }
                    }
                };
                var sut = exerciseCreateView();


                isValid = true;
                expect(sut.isValid()).toBe(true);
                isValid = false;
                expect(sut.isValid()).toBe(false);
            })
        });

        describe('_goBack', function () {
            it("should go back in window's history", function(){
                spyOn(BaseLiteralsEditCreateView.prototype, "configureProperties");// avoid throwing
                $window = {
                    history: {
                        go: jasmine.createSpy()
                    }
                };
                var sut = exerciseCreateView();
                sut._goBack();
                expect($window.history.go).toHaveBeenCalledWith(-1);
            });
        });

        describe('isNew', function(){
           it("should call events's isNew", function () {
               spyOn(BaseLiteralsEditCreateView.prototype, "configureProperties");// avoid throwing
               var sut = exerciseCreateView();
               spyOn(sut.event, "isNew").and.returnValue(true);
               sut.data.literal = "some literal";
               var isNew = sut.isNew();
               expect(sut.event.isNew).toHaveBeenCalledWith("some literal");
               expect(isNew).toBe(true);
           });
        });

        describe("showError", function () {
            beforeEach(function(){
                spyOn(BaseLiteralsEditCreateView.prototype, "configureProperties");// avoid throwing
            });
            it("should set data.isLoading to false", function () {
                var sut = exerciseCreateView();
                sut.data.isLoading = true;
                sut.showError();
                expect(sut.data.isLoading).toBe(false);
            });
        });
    });

});
