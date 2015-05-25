/**
 * Created by joanllenas on 3/31/15
 */

define([], function(){

    function ContactPresenter() {
    }

    ContactPresenter.prototype.show = function (view, model) {

        view.event.loadContactColumns = function(){
            model.loadContactColumns().then(
                view.onLoadContactColumnsComplete.bind(view),
                function(){/*not implemented*/}
            );
        };

        view.event.onRestoreColumnDefaults = view.event.loadContactColumns.bind(this);

        view.event.loadContacts = function(){
            model.loadContacts().then(
                view.onLoadContactsComplete.bind(view),
                view.onLoadContactsError.bind(view)
            );
        };

    };


    ContactPresenter.newInstance = function () {
        return new ContactPresenter();
    };

    return {newInstance:ContactPresenter.newInstance};
});
