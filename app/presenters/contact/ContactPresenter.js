/**
 * Created by joanllenas on 3/31/15
 */

app.registerPresenter(function (container) {

    function ContactPresenter() {
    }

    ContactPresenter.prototype.show = function (view, model) {
        this.view = view;
        this.model = model;
    };

    ContactPresenter.newInstance = function () {
        return Some(new ContactPresenter());
    };

    return ContactPresenter;
});
