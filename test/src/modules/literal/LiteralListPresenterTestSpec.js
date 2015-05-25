define([
	'modules/literal/LiteralListPresenter'
], function(LiteralListPresenter) {
	'use strict';
	describe('LiteralListPresenter', function() {

		function exerciseCreatePresenter() {
			return LiteralListPresenter.newInstance();
		}

		it('should reaload literals after successful onDelete liteal', function(){
			var presenter = exerciseCreatePresenter();
			var view = {event:{}, showError: function(){}};
			var model = { deleteLiteral: exerciseFakeOkPromise };
			presenter.show(view, model);
			spyOn(view.event, "getLiteralList");

			view.event.onDelete(1);

			expect(view.event.getLiteralList).toHaveBeenCalled();
		});
	});
});