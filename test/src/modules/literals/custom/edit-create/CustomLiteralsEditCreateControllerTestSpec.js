define([
    'modules/literals/custom/edit-create/CustomLiteralsEditCreateController',
    'modules/literals/custom/edit-create/CustomLiteralsEditCreateView'
], function(CustomLiteralsEditCreateController, CustomLiteralsEditCreateView) {

    var $routeParams;
    var $scope;
    function exerciseCreateController(){
        $routeParams = "route params";
        $scope = mockAngularScope();
        var $injector = {
            get: jasmine.createSpy().and.returnValue("something")
        };
        return new CustomLiteralsEditCreateController($routeParams, $scope, $injector);
    }

    describe("CustomLiteralsEditCreateController", function () {

        it('should call configureView on instantiation', function () {
            spyOn(CustomLiteralsEditCreateController,"configureView");
            exerciseCreateController();
            expect(CustomLiteralsEditCreateController.configureView).toHaveBeenCalledWith($routeParams, $scope);
        });

        it("should view's show method", function () {
            var mockView = {show:jasmine.createSpy()};
            spyOn(CustomLiteralsEditCreateView,"newInstance").and.returnValue(mockView);
            CustomLiteralsEditCreateController.configureView({});
            expect(mockView.show).toHaveBeenCalled();
        });

    });

});
