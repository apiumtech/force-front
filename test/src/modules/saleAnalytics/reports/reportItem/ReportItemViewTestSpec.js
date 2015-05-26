define([
	'modules/saleAnalytics/reports/reportItem/ReportItemView',
	'modules/saleAnalytics/reports/reportItem/ReportItemPresenter'
], function(ReportItemView, ReportItemPresenter) {
	'use strict';

	describe('ReportItemView', function() {
		describe("construct", function () {
			it("should call configureEvents", function(){
				spyOn(ReportItemView.prototype, 'configureEvents').and.callThrough();
				var scope = {},
					element = {},
					presenter = jasmineMock(ReportItemPresenter);
				var sut = new ReportItemView(scope, element, presenter);
				expect(ReportItemView.prototype.configureEvents).toHaveBeenCalled();
			})
		});
		
	});
});