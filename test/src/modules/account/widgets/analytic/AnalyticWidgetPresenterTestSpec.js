define([
	'modules/account/widgets/analytic/AnalyticWidgetPresenter',
	'modules/account/widgets/analytic/AnalyticWidgetView',
	'modules/account/widgets/analytic/AnalyticWidgetModel'
], function(AnalyticWidgetPresenter, AnalyticWidgetView, AnalyticWidgetModel) {
	'use strict';

	describe('AnalyticWidgetPresenter', function() {
		var sut, model, view;

		beforeEach(function () {
			model = mock(AnalyticWidgetModel);
			sut = new AnalyticWidgetPresenter(model);
		});

		describe('show', function () {

			beforeEach(function () {
				view = mock(AnalyticWidgetView);
				sut.show(view);
			});

			describe('loadData', function () {
				var accountId;
				beforeEach(function () {
					accountId = 12;
				});
				it("should call loadData method from the model", function () {
					model.loadData.returns(exerciseFakeOkPromise());
					view.event.loadData(accountId);
					expect(model.loadData).toHaveBeenCalledWith(accountId);
				});

				it("should fallback to onLoadDataSuccess on view", function (done) {
					model.loadData.returns(exerciseFakeOkPromise());
					view.event.loadData(accountId);
					expect(view.onLoadDataSuccess).toHaveBeenCalled();
					done();
				});

				it("should fallback to onLoadDataError on view", function (done) {
					model.loadData.returns(exerciseFakeKoPromise());
					view.event.loadData(accountId);
					expect(view.showError).toHaveBeenCalled();
					done();
				});

			});
		});
		
	});
});