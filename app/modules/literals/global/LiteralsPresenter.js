define([
	'modules/literals/shared/LiteralsEventBus'
], function(LiteralsEventBus) {
	'use strict';

	function LiteralsPresenter(literalsEventBus) {
		this.eventBus = literalsEventBus;
	}


	LiteralsPresenter.prototype.show = function (view, model) {
		this.view = view;
		this.model = model;
        var self = this;

        // comes from LiteralsTableView.fireColumnsRequest
        this.eventBus.onColumnsRequest(self.onColumnsRequest.bind(self));
	};


    LiteralsPresenter.prototype.onColumnsRequest = function() {
        console.log(this.model);
        this.model.onColumnsRequest.then(
            this.eventBus.fireColumnsRequestSuccess.bind(this.eventBus),
            this.eventBus.fireColumnsRequestError.bind(this.eventBus)
        );
    };


	LiteralsPresenter.newInstance = function (literalsEventBus) {
		literalsEventBus = literalsEventBus || LiteralsEventBus.getInstance();
		return new LiteralsPresenter(literalsEventBus);
	};

	return LiteralsPresenter;
});