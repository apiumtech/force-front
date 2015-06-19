define([
    'modules/literals/shared/LiteralsEventBus',
    'modules/literals/shared/BaseLiteralsPresenter'
], function(LiteralsEventBus, BaseLiteralsPresenter) {
    'use strict';

    function CustomLiteralsPresenter(literalsEventBus) {
        BaseLiteralsPresenter.call(this, literalsEventBus);
    }

    CustomLiteralsPresenter.inherits(BaseLiteralsPresenter);
    var proto = CustomLiteralsPresenter.prototype;


    proto.show = function (view, model) {
        this.__base__.show.call(this, view, model);

        view.event.onInit = this.onInit.bind(this);
    };

    proto.onInit = function() {
        this.model.setUserImplementationCode();
    };


    CustomLiteralsPresenter.newInstance = function (literalsEventBus) {
        literalsEventBus = literalsEventBus || LiteralsEventBus.getInstance();
        return new CustomLiteralsPresenter(literalsEventBus);
    };

    return CustomLiteralsPresenter;
});