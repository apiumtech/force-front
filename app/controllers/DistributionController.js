app.registerController(function (container) {
    var DistributionView = container.getView("views/DistributionView");

    function DistributionController($scope) {
        DistributionController.configureView($scope);
    }

    DistributionController.configureView = function ($scope) {
        this.view = DistributionView.newInstance($scope).getOrElse(throwInstantiateException(DistributionView));
        this.view.show();
    };

    return DistributionController;
});
