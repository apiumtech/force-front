/**
 * Created by joanllenas on 03/31/15.
 */

app.registerController(function (container) {
    var ContactFilterView = container.getView("views/contact/ContactFilterView");

    function ContactFilterController($scope) {
        ContactFilterController.configureView($scope);
    }

    ContactFilterController.configureView = function ($scope) {
        var view = ContactFilterView.newInstance($scope);
        view.show();
    };

    return ContactFilterController;
});
