define([
    'modules/literals/global/edit-create/LiteralsEditCreateController',
    'modules/literals/global/edit-create/LiteralsEditCreateView'
], function(LiteralsEditCreateController, LiteralsEditCreateView) {

    var $routeParams;
    var $scope;
    function exerciseCreateController(){
        $routeParams = "route params";
        $scope = mockAngularScope();
        var $injector = {
            get: jasmine.createSpy().and.returnValue("something")
        };
        return new LiteralsEditCreateController($routeParams, $scope, $injector);
    }

    describe("LiteralsEditCreateController", function () {

        it('should call configureView on instantiation', function () {
            spyOn(LiteralsEditCreateController,"configureView");
            exerciseCreateController();
            expect(LiteralsEditCreateController.configureView).toHaveBeenCalledWith($routeParams, $scope);
        });

        it("should view's show method", function () {
            var mockView = {show:jasmine.createSpy()};
            spyOn(LiteralsEditCreateView,"newInstance").and.returnValue(mockView);
            LiteralsEditCreateController.configureView({});
            expect(mockView.show).toHaveBeenCalled();
        });

    });

});
