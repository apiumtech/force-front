define([
], function() {
	'use strict';

	function BaseLiteralsPresenter(literalsEventBus) {
		this.eventBus = literalsEventBus;
	}

    var proto = BaseLiteralsPresenter.prototype;

	proto.show = function (view, model) {
        var self = this;
		self.view = view;
		self.model = model;

        view.event.nextPage = self.nextPage.bind(self);

        view.event.onDisposing = function () {
            self.eventBus.dispose();
        };

        // comes from LiteralsTableView.fireColumnsRequest
        self.eventBus.onColumnsRequest(self.onColumnsRequest.bind(self));

        // comes from LiteralsTableView.fireLiteralsRequest
        self.eventBus.onLiteralsRequest(self.onLiteralsRequest.bind(self));

        self.eventBus.onLiteralsRequestSuccess(view.onLiteralsRequestSuccess.bind(view));

        // comes from LiteralsSearchPresenter.fireLiteralsSearch
        self.eventBus.onLiteralsSearch(self.onLiteralsSearch.bind(self));

        // comes from LiteralsTableView.fireLiteralsDeleteRequest
        self.eventBus.onLiteralsDeleteRequest(self.onLiteralsDeleteRequest.bind(self));
	};


    proto.onColumnsRequest = function() {
        var self = this;
        self.model.onColumnsRequest().then(
            self.eventBus.fireColumnsRequestSuccess.bind(self.eventBus),
            self.eventBus.fireColumnsRequestError.bind(self.eventBus)
        );
    };

    proto.onLiteralsRequest = function() {
        var self = this;
        self.view.onLiteralsRequest();
        self.model.onLiteralsRequest().then(
            self.eventBus.fireLiteralsRequestSuccess.bind(self.eventBus),
            self.eventBus.fireLiteralsRequestError.bind(self.eventBus)
        );
    };

    proto.onLiteralsSearch = function(searchTerms) {
        var self = this;
        self.model.setSearchTerms(searchTerms);
        self.eventBus.fireLiteralsRequest();
    };

    proto.onLiteralsDeleteRequest = function(literalId) {
        var self = this;
        self.view.resetScrollState();
        self.model.onLiteralsDeleteRequest(literalId).then(
            self.eventBus.fireLiteralsRequest.bind(self.eventBus),
            function(){
                self.view.showError("Error removing literal");
            }
        );
    };

    proto.nextPage = function() {
        var self = this;
        self.model.nextPage();
        self.eventBus.fireLiteralsRequest();
    };

	return BaseLiteralsPresenter;
});