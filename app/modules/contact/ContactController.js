/**
 * Created by joanllenas on 03/31/15.
 */

app.registerController(function (container) {
    var ContactView = container.getView("views/contact/ContactView");

    function ContactController($scope) {
        ContactController.configureView($scope);
    }

    ContactController.configureView = function ($scope) {
        var view = ContactView.newInstance($scope);
        view.show();
    };

    return ContactController;
});