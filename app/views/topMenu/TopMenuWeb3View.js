/**
 * Created by joanllenas on 4/27/15.
 */

app.registerView(function(container) {
    var BaseView = container.getView('views/BaseView');


    /**
     * @constructor
     */
    function TopMenuWeb3View($scope) {
        BaseView.call(this, $scope);

        this.configureEvents();
    }


    TopMenuWeb3View.prototype = Object.create(BaseView.prototype, {});


    TopMenuWeb3View.prototype.configureEvents = function () {
        this.fn.getMenuTemplateName = this.getMenuTemplateName.bind(this);
        this.fn.onInit = this.onInit.bind(this);
    };

    TopMenuWeb3View.prototype.onInit = function () {
    };

    TopMenuWeb3View.prototype.getMenuTemplateName = function () {
        return 'topMenuWeb3';
    };

    TopMenuWeb3View.newInstance = function($scope, $model, $presenter, $viewRepAspect, $logErrorAspect) {
        var scope = $scope || {};
        var view = new TopMenuWeb3View(scope);

        return view._injectAspects($viewRepAspect, $logErrorAspect);
    };


    return TopMenuWeb3View;
});