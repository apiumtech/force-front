define([
	'modules/literals/shared/LiteralsEventBus'
], function(LiteralsEventBus) {
	'use strict';

	function LiteralsPresenter(literalsEventBus) {
		this.eventBus = literalsEventBus;
	}


	LiteralsPresenter.prototype.show = function (view, model) {
        var self = this;
		self.view = view;
		self.model = model;

        view.event.onInit = function() {
            console.log("LiteralsPresenter ready");
        };

        // comes from LiteralsTableView.fireColumnsRequest
        self.eventBus.onColumnsRequest(self.onColumnsRequest.bind(self));

        // comes from LiteralsTableView.fireLiteralsRequest
        self.eventBus.onLiteralsRequest(self.onLiteralsRequest.bind(self));

        // comes from LiteralsSearchPresenter.fireLiteralsSearch
        self.eventBus.onLiteralsSearch(self.onLiteralsSearch.bind(self));
	};


    LiteralsPresenter.prototype.onColumnsRequest = function() {
        var self = this;
        self.model.onColumnsRequest().then(
            self.eventBus.fireColumnsRequestSuccess.bind(self.eventBus),
            self.eventBus.fireColumnsRequestError.bind(self.eventBus)
        );
    };

    LiteralsPresenter.prototype.onLiteralsRequest = function() {
        var self = this;
        self.model.onLiteralsRequest().then(
            self.eventBus.fireLiteralsRequestSuccess.bind(self.eventBus),
            self.eventBus.fireLiteralsRequestError.bind(self.eventBus)
        );
    };

    LiteralsPresenter.prototype.onLiteralsSearch = function(searchTerms) {
        var self = this;
        self.model.setSearchTerms(searchTerms);
        self.onLiteralsRequest();
    };


	LiteralsPresenter.newInstance = function (literalsEventBus) {
		literalsEventBus = literalsEventBus || LiteralsEventBus.getInstance();
		return new LiteralsPresenter(literalsEventBus);
	};

	return LiteralsPresenter;
});