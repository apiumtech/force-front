/**
 * Created by joanllenas on 4/21/15.
 */

app.registerPresenter(function(container) {

    function TopMenuPresenter() {}

    TopMenuPresenter.prototype.show = function(view, model) {
        this.view = view;
        this.model = model;
    };

    TopMenuPresenter.newInstance = function() {
        return Some(new TopMenuPresenter());
    };

    return {
        newInstance: TopMenuPresenter.newInstance
    };
});
