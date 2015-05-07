/**
 * Created by kevin on 10/22/14.
 */

app.registerPresenter(function (container) {

    function LiteralPresenter() {
    }

    LiteralPresenter.prototype.show = function (view, model) {

        view.event.onInit = function () {
            view.model.getLiteralById( view.routeParams.literalId ).then(view.showForm.bind(view), view.showError.bind(view));
        };

        view.event.onCancel = function(){
          window.history.back();
        };

        view.event.onSave = function(){
          view.model.updateOrCreateLiteral( view.data.literal).then( function(){ debugger; window.history.back(); }, view.showError.bind(view));;
        };

    };

    LiteralPresenter.newInstance = function () {
        return Some(new LiteralPresenter());
    };

    return {newInstance: LiteralPresenter.newInstance};
});

