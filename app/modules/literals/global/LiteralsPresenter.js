define([
	'modules/literals/shared/LiteralsEventBus',
	'modules/literals/shared/BaseLiteralsPresenter'
], function(LiteralsEventBus, BaseLiteralsPresenter) {
	'use strict';

	function LiteralsPresenter(literalsEventBus) {
        BaseLiteralsPresenter.call(this, literalsEventBus);
	}

    LiteralsPresenter.inherits(BaseLiteralsPresenter);
    var proto = LiteralsPresenter.prototype;

	proto.show = function (view, model) {
        this.__base__.show.call(this, view, model);
	};


	LiteralsPresenter.newInstance = function (literalsEventBus) {
		literalsEventBus = literalsEventBus || LiteralsEventBus.getInstance();
		return new LiteralsPresenter(literalsEventBus);
	};

	return LiteralsPresenter;
});