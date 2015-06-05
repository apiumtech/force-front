define([
	'modules/account/widgets/analytic/AnalyticWidgetView',
	'modules/account/widgets/analytic/AnalyticWidgetPresenter',
	'shared/services/bus/AccountDetailWidgetEventBus',
	'shared/services/GoogleChartService'
], function(AnalyticWidgetView, AnalyticWidgetPresenter, AccountDetailWidgetEventBus, GoogleChartService) {
	'use strict';

	describe('AnalyticWidgetView', function() {

		var sut, scope, element, presenter, eventBus, googleChartSrv;
		beforeEach(function () {
			inject(function($rootScope){
				scope = $rootScope.$new();
			});
			presenter = mock(AnalyticWidgetPresenter);
			eventBus = mock(AccountDetailWidgetEventBus);
			googleChartSrv = mock(GoogleChartService);
			element = angular.element("<div />");
			sut = new AnalyticWidgetView(scope, element, presenter, eventBus, googleChartSrv);
			scope.accountId = 12;
		});

		describe('construct', function () {
			beforeEach(function () {
				sinon.stub(AnalyticWidgetView.prototype, 'configureEvents');
			});
			afterEach(function () {
				AnalyticWidgetView.prototype.configureEvents.restore();
			});
			it("should call configureEvents", function () {
				new AnalyticWidgetView(scope, element, presenter, eventBus);
				expect(AnalyticWidgetView.prototype.configureEvents).toHaveBeenCalled();
			});
		});

		describe('configureEvents', function () {

			beforeEach(function () {
				sut.configureEvents();
			});

			it("should bind self.onReloadCommandReceived to eventBus's onReloadCommandReceived", function () {
				spyOn(sut.eventBus, 'onReloadCommandReceived').and.callFake(function (callback) {
				});
				sinon.stub(sut, 'onReloadCommandReceived');
				sut.eventBus.onReloadCommandReceived();
				expect(sut.eventBus.onReloadCommandReceived).toHaveBeenCalled();
				//TODO: Test this
				//expect(sut.onReloadCommandReceived).toHaveBeenCalled();
			});

			describe("watch accountId", function () {
				it("should call eventBus's sendReloadCommand if accountId is not null", function () {
					scope.accountId = null;
					scope.$digest();
					scope.accountId = 10;
					scope.$digest();
					expect(sut.eventBus.sendReloadCommand).toHaveBeenCalled();
				});
				it("should not call eventBus's sendReloadCommand if accountId is null", function () {
					scope.accountId = null;
					scope.$digest();
					scope.accountId = null;
					scope.$digest();
					expect(sut.eventBus.sendReloadCommand).not.toHaveBeenCalled();
				});
			});

			describe('on $destroy', function () {
				beforeEach(function () {
					scope.$destroy();
				});
				it("should call eventBus's unsubscribeReloadCommand on destroy", function () {
					expect(sut.eventBus.unsubscribeReloadCommand).toHaveBeenCalled();
				});
				it("should call eventBus's unsubscribeReloadCompleteCommand on destroy", function () {
					expect(sut.eventBus.unsubscribeReloadCompleteCommand).toHaveBeenCalled();
				});
			});

		});

		describe('onReloadCommandReceived', function () {
			it("should call loadData function", function () {
				sinon.stub(sut, 'loadData');
				sut.onReloadCommandReceived();
				expect(sut.loadData).toHaveBeenCalled();
			});
		});

		describe('loadData', function () {
			it("should call loadData event from presenter", function () {
				sut.event = {
					loadData: sinon.stub()
				};
				sut.loadData();
				expect(sut.event.loadData).toHaveBeenCalledWith(12);
			});
		});

	});
});