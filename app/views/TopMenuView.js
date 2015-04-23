/**
 * Created by joanllenas on 4/21/15.
 */

app.registerView(function(container) {
    var BaseView = container.getView('views/BaseView');
    var TopMenuModel = container.getModel('models/TopMenuModel');
    var TopMenuPresenter = container.getPresenter('presenters/TopMenuPresenter');

    function TopMenuView($scope, $model, $presenter, $window) {
        BaseView.call(this, $scope, $model, $presenter);
        this.$window = $window;

        this.web3Urls = [
            "localhost",
            "127.0.0.1",
            "54.171.216.35"
        ];

        this.configureEvents();
    }

    TopMenuView.WEB3_TEMPLATE_NAME = 'topMenuWeb3';
    TopMenuView.WEB2_TEMPLATE_NAME = 'topMenuWeb2';

    TopMenuView.prototype = Object.create(BaseView.prototype, {});

    TopMenuView.prototype.configureEvents = function () {
        this.fn.getMenuTemplateName = this.getMenuTemplateName.bind(this);
        this.fn.onInit = this.onInit.bind(this);
    };

    TopMenuView.prototype.onInit = function () {
        this.inWeb3() ? this.onInitWeb3() : this.onInitWeb2();
    };

    TopMenuView.prototype.onInitWeb3 = function () {
    };

    TopMenuView.prototype.onInitWeb2 = function () {
    };

    TopMenuView.prototype.getMenuTemplateName = function () {
        return this.inWeb3() ? TopMenuView.WEB3_TEMPLATE_NAME : TopMenuView.WEB2_TEMPLATE_NAME;
    };

    TopMenuView.prototype.inWeb3 = function () {
        var self = this;
        var shouldBeWeb3 = this.web3Urls.filter(function(item){
                var found = self.$window.location.href.indexOf(item) > -1;
                return found;
            }).length > 0;
        return shouldBeWeb3;
    };

    TopMenuView.newInstance = function($scope, $model, $presenter, $window, $viewRepAspect, $logErrorAspect) {
        var scope = $scope || {};
        var model = $model || TopMenuModel.newInstance().getOrElse(throwInstantiateException(TopMenuModel));
        var presenter = $presenter || TopMenuPresenter.newInstance().getOrElse(throwInstantiateException(TopMenuPresenter));
        var view = new TopMenuView(scope, model, presenter, $window);

        return view._injectAspects(!!$viewRepAspect, !!$logErrorAspect);
    };

    return TopMenuView;
});
