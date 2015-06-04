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

        view.event.onInit = function() {
            console.log("LiteralsPresenter ready");
        };

        // comes from LiteralsTableView.fireColumnsRequest
        this.eventBus.onColumnsRequest(this.onColumnsRequest.bind(this));

        // comes from LiteralsTableView.fireLiteralsRequest
        this.eventBus.onLiteralsRequest(this.onLiteralsRequest.bind(this));
	};


    LiteralsPresenter.prototype.onColumnsRequest = function() {
        this.model.onColumnsRequest().then(
            this.eventBus.fireColumnsRequestSuccess.bind(this.eventBus),
            this.eventBus.fireColumnsRequestError.bind(this.eventBus)
        );
    };

    LiteralsPresenter.prototype.onLiteralsRequest = function() {
        this.model.onLiteralsRequest().then(
            this.eventBus.fireLiteralsRequestSuccess.bind(this.eventBus),
            this.eventBus.fireLiteralsRequestError.bind(this.eventBus)
        );
    };


	LiteralsPresenter.newInstance = function (literalsEventBus) {
		literalsEventBus = literalsEventBus || LiteralsEventBus.getInstance();
		return new LiteralsPresenter(literalsEventBus);
	};

	return LiteralsPresenter;
});