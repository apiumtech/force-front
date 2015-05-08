
/**
 * Created by kevin on 10/22/14.
 */

app.registerView(function (container) {

    var LiteralPresenter = container.getPresenter('presenters/literal/LiteralPresenter');
    var LiteralModel = container.getModel('models/literal/LiteralModel');

    // TODO: WTF!!!!
    var ViewRepaintAspect = container.getService('aspects/ViewRepaintAspect');
    var LogErrorAspect = container.getService('aspects/LogErrorAspect');

    function LiteralView($routeParams, $scope, $model, $presenter) {
        this.data = {};
        this.event = {};
        this.fn = {};

        this.$scope = $scope;

        $scope.data = this.data;
        $scope.event = this.event;
        $scope.fn = this.fn;

        this.model = $model;
        this.presenter = $presenter;
        this.routeParams = $routeParams;
    }

    LiteralView.prototype.show = function () {
        this.presenter.show(this);
    };

    LiteralView.prototype.showForm = function( literal ){
      this.data.literal = literal;
      this.data.languages = data[0].LanguageValues.reduce( function( languages, language ){

        // TODO: That code is not crossbrowser
        if( languages.indexOf( language.Key ) === -1 ){
          languages.push( language.Key );
        }
        return languages;
      }, [] );

      this.fn.isNew = function(){
        return literal.Id != null;
      };
    };

    LiteralView.prototype.showError = function( err ){
      debugger;
    };


    LiteralView.newInstance = function ($routeParams, $scope, $model, $presenter, $viewRepAspect, $logErrorAspect) {
        var scope = $scope || {};
        var routeParams = $routeParams;
        var model = $model || LiteralModel.newInstance().getOrElse(throwException("LiteralModel could not be instantiated!!"));
        var presenter = $presenter || LiteralPresenter.newInstance().getOrElse(throwException("LiteralPresenter could not be instantiated!!"));

        var view = new LiteralView(routeParams, scope, model, presenter);

        if ($viewRepAspect !== false) {
            ($viewRepAspect || ViewRepaintAspect).weave(view);
        }

        if ($logErrorAspect !== false) {
            ($logErrorAspect || LogErrorAspect).weave(view);
        }

        return Some(view);
    };

    return {newInstance: LiteralView.newInstance};
});
