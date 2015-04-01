/**
 * Created by joanllenas on 03/31/15.
 */

app.registerView(function (container) {
    var BaseView = container.getView("views/BaseView");
    var ContactFilterPresenter = container.getPresenter('presenters/contact/ContactFilterPresenter');
    var ContactFilterModel = container.getModel('models/contact/ContactFilterModel');

    function ContactFilterView($scope, $model, $presenter) {
        BaseView.call(this, $scope, $model, $presenter);
    }

    ContactFilterView.prototype = Object.create(BaseView.prototype, {});

    ContactFilterView.prototype.configureEvents = function () {
        var self = this;
    };

    ContactFilterView.newInstance = function ($scope, $model, $presenter, $viewRepAspect, $logErrorAspect) {

        var scope = $scope || {};
        var model = $model || ContactFilterModel.newInstance().getOrElse(throwInstantiateException(ContactFilterModel));
        var presenter = $presenter || ContactFilterPresenter.newInstance().getOrElse(throwInstantiateException(ContactFilterPresenter));
        var view = new ContactFilterView(scope, model, presenter);

        return view._injectAspects($viewRepAspect, $logErrorAspect);
    };

    return ContactFilterView;
});