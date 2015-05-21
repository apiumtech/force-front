/**
 * Created by joanllenas on 03/31/15.
 */

define([], function(){
    var BaseView = container.getView("views/BaseView");
    var ContactFilterPresenter = container.getPresenter('presenters/contact/ContactFilterPresenter');
    var ContactFilterModel = container.getModel('models/contact/ContactFilterModel');

    function ContactFilterView($scope, $model, $presenter) {
        BaseView.call(this, $scope, $model, $presenter);
        this.configureEvents();
    }

    ContactFilterView.prototype = Object.create(BaseView.prototype, {});

    ContactFilterView.prototype.configureEvents = function () {
        this.fn.onLoaded = this._onLoaded.bind(this);
    };

    ContactFilterView.prototype._onLoaded = function(){
        this.presenter.loadContactFilters();
    };

    ContactFilterView.prototype.onLoadContactFilters = function(filters){
        this.data.filters = filters;
    };

    ContactFilterView.newInstance = function ($scope, $model, $presenter, $viewRepAspect, $logErrorAspect) {

        var scope = $scope || {};
        var model = $model || ContactFilterModel.newInstance();
        var presenter = $presenter || ContactFilterPresenter.newInstance();
        var view = new ContactFilterView(scope, model, presenter);

        return view._injectAspects($viewRepAspect, $logErrorAspect);
    };

    return ContactFilterView;
});