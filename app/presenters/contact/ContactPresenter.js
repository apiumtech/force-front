/**
 * Created by joanllenas on 3/31/15
 */

app.registerPresenter(function (container) {

    function ContactPresenter() {
    }

    ContactPresenter.prototype.show = function (view, model) {
        this.view = view;
        this.model = model;

        view.event.onRestoreColumnDefaults = this.loadContactColumns.bind(this);
    };

    ContactPresenter.prototype.loadContacts = function(){
        var self = this;
        this.model.loadContacts().then(
            self.view.onLoadContactsComplete.bind(self.view),
            self.view.onLoadContactsError.bind(self.view)
        );
    };

    ContactPresenter.prototype.loadContactColumns = function(){
        var self = this;
        this.model.loadContactColumns().then(
            self.view.onLoadContactColumnsComplete.bind(self.view),
            function(){/*not implemented*/}
        );
    };

    ContactPresenter.newInstance = function () {
        return Some(new ContactPresenter());
    };

    return ContactPresenter;
});
