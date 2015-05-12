
app.registerController(function (container) {
    var ConversionView = container.getView("views/ConversionView");

    function ConversionController($scope) {
        ConversionController.configureView($scope);
    }

    ConversionController.configureView = function ($scope) {
        this.view = ConversionView.newInstance($scope);
        this.view.show();
    };

    return ConversionController;
});