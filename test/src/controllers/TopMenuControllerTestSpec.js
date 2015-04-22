describe("TopMenuController", function(){
    var TopMenuController = app.getController("controllers/TopMenuController");

    it("should call configureView static method on instantiation", function () {
        TopMenuController.configureView = jasmine.createSpy();
        var scope = {};
        var model = {};
        var ctrl = new TopMenuController(scope, model);
        expect(TopMenuController.configureView).toHaveBeenCalledWith(scope, model);
    });
});