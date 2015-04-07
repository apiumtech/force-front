/**
 * Created by joanllenas on 3/31/15
 */

app.registerPresenter(function (container) {

    function ContactPresenter() {
    }

    ContactPresenter.prototype.show = function (view, model) {
        this.view = view;
        this.model = model;

        self.event.onFieldsRestoreDefault = function(){
            self.view.onFieldsRestoreDefault();
        }
    };

    ContactPresenter.prototype.loadContacts = function(){
        this.model.loadContacts().then(
            this.view.onLoadContactsComplete.bind(this.view),
            this.view.onLoadContactsError.bind(this.view)
        );
    };

    ContactPresenter.prototype.loadContactFields = function(){
        this.model.loadContactFields();
    };

    ContactPresenter.newInstance = function () {
        return Some(new ContactPresenter());
    };

    return ContactPresenter;
});
