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

        // comes from LiteralsTableView.fireColumnsRequest
        self.eventBus.onColumnsRequest(self.onColumnsRequest.bind(self));

        // comes from LiteralsTableView.fireLiteralsRequest
        self.eventBus.onLiteralsRequest(self.onLiteralsRequest.bind(self));

        // comes from LiteralsSearchPresenter.fireLiteralsSearch
        self.eventBus.onLiteralsSearch(self.onLiteralsSearch.bind(self));

        // comes from LiteralsTableView.fireLiteralsDeleteRequest
        self.eventBus.onLiteralsDeleteRequest(self.onLiteralsDeleteRequest.bind(self));
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
        self.eventBus.fireLiteralsRequest();
    };

    LiteralsPresenter.prototype.onLiteralsDeleteRequest = function(literalId) {
        var self = this;
        self.model.onLiteralsDeleteRequest(literalId).then(
            self.eventBus.fireLiteralsRequest.bind(self.eventBus),
            function(){
                self.view.showError("Error removing literal");
            }
        );
    };


	LiteralsPresenter.newInstance = function (literalsEventBus) {
		literalsEventBus = literalsEventBus || LiteralsEventBus.getInstance();
		return new LiteralsPresenter(literalsEventBus);
	};

	return LiteralsPresenter;
});