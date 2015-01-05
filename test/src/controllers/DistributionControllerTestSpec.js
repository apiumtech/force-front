describe("DistributionController", function () {
    var DistributionController = app.getController('controllers/DistributionController');

    it("should call DistributionController.configureView global method", function () {
        var scope = {someScope: true};

        DistributionController.configureView = jasmine.createSpy();
        var ctrl = new DistributionController(scope);
        expect(DistributionController.configureView).toHaveBeenCalledWith(scope);
    });
});