/**
 * Created by joanllenas on 3/31/15
 */

app.registerPresenter(function (container) {

    function ContactFilterPresenter() {
    }

    ContactFilterPresenter.prototype.show = function (view, model) {
        this.view = view;
        this.model = model;
    };

    ContactFilterPresenter.newInstance = function () {
        return Some(new ContactFilterPresenter());
    };

    return ContactFilterPresenter;
});
