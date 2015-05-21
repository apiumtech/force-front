/**
 * Created by joanllenas on 3/31/15
 */

define([], function(){

    function ContactFilterPresenter() {
    }

    ContactFilterPresenter.prototype.show = function (view, model) {
        this.view = view;
        this.model = model;
    };


    ContactFilterPresenter.prototype.loadContactFilters = function () {
    };


    ContactFilterPresenter.newInstance = function () {
        return new ContactFilterPresenter();
    };

    return ContactFilterPresenter;
});
