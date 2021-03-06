define([
	'modules/literals/shared/LiteralsEventBus'
], function(LiteralsEventBus) {
	'use strict';

	function LiteralsTablePresenter(literalsEventBus) {
		this.eventBus = literalsEventBus;
	}


	LiteralsTablePresenter.prototype.show = function (view, model) {
		this.view = view;
		this.model = model;
		var self = this;

		view.event.onInit = function() {
			self.eventBus.fireColumnsRequest();
		};

        view.event.fireLiteralsRequest = function() {
			self.eventBus.fireLiteralsRequest();
		};

        view.event.fireLiteralsDeleteRequest = function(literalId) {
			self.eventBus.fireLiteralsDeleteRequest(literalId);
		};

        view.event.onDisposing = function () {
            self.eventBus.dispose();
        };


		this.eventBus.onColumnsRequestSuccess(view.onColumnsRequestSuccess.bind(view));
		this.eventBus.onColumnsRequestError(view.onColumnsRequestError.bind(view));

        this.eventBus.onLiteralsRequest(view.onLiteralsRequest.bind(view));
        this.eventBus.onLiteralsRequestSuccess(view.onLiteralsRequestSuccess.bind(view));
		this.eventBus.onLiteralsRequestError(view.onLiteralsRequestError.bind(view));

        this.eventBus.onLiteralsSearch(view.clearTable.bind(view));
	};


	LiteralsTablePresenter.newInstance = function (literalsEventBus) {
		literalsEventBus = literalsEventBus || LiteralsEventBus.getInstance();
		return new LiteralsTablePresenter(literalsEventBus);
	};

	return LiteralsTablePresenter;
});