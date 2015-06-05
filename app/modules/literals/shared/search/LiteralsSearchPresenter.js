define([
	'modules/literals/shared/LiteralsEventBus'
], function(LiteralsEventBus) {
	'use strict';

	function LiteralsSearchPresenter(literalsEventBus) {
		this.eventBus = literalsEventBus;
	}


	LiteralsSearchPresenter.prototype.show = function (view, model) {
		this.view = view;
		this.model = model;

		view.event.onInit = function() {
			console.log("LiteralsSearchPresenter ready");
		}.bind(this);

		view.event.performSearch = function (searchTerms) {
			this.eventBus.fireLiteralsSearch(searchTerms);
        }.bind(this);
	};


	LiteralsSearchPresenter.newInstance = function (literalsEventBus) {
		literalsEventBus = literalsEventBus || LiteralsEventBus.getInstance();
		return new LiteralsSearchPresenter(literalsEventBus);
	};

	return LiteralsSearchPresenter;
});