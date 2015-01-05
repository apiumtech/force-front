describe("ConversionController", function () {
    var ConversionController = app.getController('controllers/ConversionController');

    var scope = {someScope: true};

    it("should call ConversionController.configureView global method", function () {
        ConversionController.configureView = jasmine.createSpy();
        var ctrl = new ConversionController(scope);
        expect(ConversionController.configureView).toHaveBeenCalledWith(scope);
    });
});