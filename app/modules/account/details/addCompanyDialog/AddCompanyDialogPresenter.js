define([
	'modules/account/details/addCompanyDialog/AddCompanyDialogModel'
], function(AddCompanyDialogModel) {
	'use strict';

	function AddCompanyDialogPresenter(model) {
		this.model = model || new AddCompanyDialogModel();
	}

	AddCompanyDialogPresenter.prototype.show = function(view){
		var self = this;
		self.view = view;

		view.event = view.event || {};

		view.event.onGetCompanyTypes = function(callback){
			self.model.getCompanyTypes()
				.then(callback, view.showError.bind(view));
		};
	};

	return AddCompanyDialogPresenter;
});