/**
 * Created by joanllenas on 03/31/15.
 */

define([
    'shared/BaseView',
    'modules/contact/filters/ContactFilterPresenter',
    'modules/contact/filters/ContactFilterModel'
], function (BaseView, ContactFilterPresenter, ContactFilterModel) {
    'use strict';

    function ContactFilterView($scope, $model, $presenter) {
        BaseView.call(this, $scope, $model, $presenter);
        this.configureEvents();
    }

    ContactFilterView.inherits(BaseView, {});

    ContactFilterView.prototype.configureEvents = function () {
        this.fn.onLoaded = this._onLoaded.bind(this);
    };

    ContactFilterView.prototype._onLoaded = function () {
        this.presenter.loadContactFilters();
    };

    ContactFilterView.prototype.onLoadContactFilters = function (filters) {
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