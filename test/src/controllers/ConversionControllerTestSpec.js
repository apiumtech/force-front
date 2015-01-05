describe("ConversionController", function () {
    var ConversionController = app.getController('controllers/ConversionController');

    it("should call ConversionController.configureView global method", function () {
        var scope = {someScope: true};

        ConversionController.configureView = jasmine.createSpy();
        var ctrl = new ConversionController(scope);
        expect(ConversionController.configureView).toHaveBeenCalledWith(scope);
    });
});