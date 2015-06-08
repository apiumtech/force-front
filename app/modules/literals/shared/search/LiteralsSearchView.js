define([
    'shared/BaseView',
    'modules/literals/shared/search/LiteralsSearchPresenter',
    'modules/literals/shared/search/LiteralsSearchModel'
], function (BaseView, LiteralsSearchPresenter, LiteralsSearchModel) {
    'use strict';

    function LiteralsSearchView($scope, $model, $presenter) {
        BaseView.call(this, $scope, $model, $presenter);
        this.searchDelay = 2000;
        this.performSearchTimeout = null;
        this.configureEvents();
    }

    LiteralsSearchView.inherits(BaseView, {});
    var proto = LiteralsSearchView.prototype;

    proto.configureEvents = function () {
        var self = this;
        this.fn.onSearchTextFilterChanged = this.performSearch.bind(this);
        this.event.onInit = function () {};
        this.event.performSearch = function () {};
    };

    proto.performSearch = function (searchTerms) {
        clearTimeout(this.performSearchTimeout);
        this.performSearchTimeout = setTimeout(function () {
            this.event.performSearch(searchTerms);
        }.bind(this), this.searchDelay);
    };


    LiteralsSearchView.newInstance = function (namedParams) {
        var scope = namedParams.scope || {};
        var model = namedParams.model || LiteralsSearchModel.newInstance();
        var presenter = namedParams.presenter || LiteralsSearchPresenter.newInstance();
        var view = new LiteralsSearchView(scope, model, presenter);

        return view._injectAspects(namedParams.viewRepAspect, namedParams.logErrorAspect);
    };

    return LiteralsSearchView;
});