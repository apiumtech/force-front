define([
	'modules/account/widgets/analytic/AnalyticWidgetView',
	'modules/account/widgets/analytic/AnalyticWidgetPresenter',
	'shared/services/bus/AccountDetailWidgetEventBus',
	'shared/services/GoogleChartService',
	'angular'
], function(AnalyticWidgetView, AnalyticWidgetPresenter, AccountDetailWidgetEventBus, GoogleChartService, angular) {
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

		describe('onWindowResize', function () {
			beforeEach(function () {
				sinon.stub(sut, 'paintChart');
			});
			describe('sut.info is defined', function () {
				it("should call paintChart() to repaint the pie chart", function () {
					sut.info = {
						"activity_index":{
							data: {},
							chartData: [[]]
						}
					};
					sut.onWindowResize();
					expect(sut.paintChart).toHaveBeenCalled();
				});
			});

			describe('sut.info is not defined', function () {
				it("should not call paintChart()", function () {
					sut.info = undefined;
					sut.onWindowResize();
					expect(sut.paintChart).not.toHaveBeenCalled();
				});
			});

		});

		describe('onAccountIDUpdated', function () {
			describe('sut.accountId is defined', function () {
				it("should call evenBus reload command", function () {
					sut.onAccountIDUpdated();
					expect(sut.eventBus.sendReloadCommand).toHaveBeenCalled();
				});
			});

			describe('sut.accountId is not defined', function () {
				it("should not call evenBus reload command", function () {
					sut.accountId = undefined;
					sut.onAccountIDUpdated();
					expect(sut.eventBus.sendReloadCommand).not.toHaveBeenCalled();
				});
			});
		});

		describe('onLoadDataSuccess', function () {
			beforeEach(function () {
				sinon.stub(sut, 'decorateData');
				sut.onLoadDataSuccess();
			});
			it("should call eventBus' sendReloadCompleteCommand", function () {
				expect(sut.eventBus.sendReloadCompleteCommand).toHaveBeenCalled();
			});
			it("should call decorateData method", function () {
				expect(sut.decorateData).toHaveBeenCalled();
			});
		});

		describe('decorateData', function () {
			var data;
			beforeEach(function () {
				sinon.stub(sut, "paintChart");
				sut.info = undefined;
				data = {
					"a": 123,
					"b": "abcd"
				};
				sut.decorateData(data);
			});
			it("should assign the data from model to info", function () {
				expect(sut.info).toEqual(data);
			});

			it("should call paintChart", function () {
				expect(sut.paintChart).toHaveBeenCalled();
			});
		});

		describe('paintChart', function () {
			describe("chart information has been provided", function () {

				var options, chartElement;
				beforeEach(function () {
					sut.info = {
						activity_index: {
							chartData: [['a', 1], ['b', 2]]
						}
					};
					options = {
						'my': "options"
					};

					chartElement = angular.element("<div />");
				});

				describe("chart and chartData haven't been created", function () {

					beforeEach(function () {
						sut.chart = undefined;
						sut.chartData = undefined;
						sut.paintChart(chartElement);
					});

					it("should create a chartData using chartService", function () {
						expect(sut.chartService.arrayToDataTable).toHaveBeenCalledWith([['a', 1], ['b', 2]]);
						var actual = sut.chartService.arrayToDataTable(sut.info.activity_index.chartData);
						expect(sut.chartData).toEqual(actual);
					});

					it("should create a pie chart using chartService and chartElement", function () {
						expect(sut.chartService.createChart).toHaveBeenCalledWith(chartElement, 'pie');
						var actual = sut.chartService.createChart(chartElement, 'pie');
						expect(sut.chart).toEqual(actual);
					});

				});

				describe("chart and chartData have been created", function () {

					beforeEach(function () {
						sut.chart = {'mock': "chart"};
						sut.chartData = {"mock": "data"};
						sut.paintChart(chartElement, options);
					});

					it("should keep the original chart data without creating a new one", function () {
						expect(sut.chartService.arrayToDataTable).not.toHaveBeenCalled();
						var newData = sut.chartService.arrayToDataTable(sut.info.activity_index.chartData);
						expect(sut.chartData).not.toEqual(newData);
						expect(sut.chartData).toEqual({'mock': "data"});
					});

					it("should keep the original chart without creating a new one", function () {
						expect(sut.chartService.createChart).not.toHaveBeenCalled();
						var newChart = sut.chartService.createChart(chartElement, 'pie');
						expect(sut.chart).not.toEqual(newChart);
						expect(sut.chart).toEqual({'mock': "chart"});
					});

				});

				it("should draw a chart using chart and chartData", function () {
					sut.paintChart(chartElement, options);
					expect(sut.chartService.drawChart).toHaveBeenCalledWith(sut.chart, sut.chartData, options);
				});

			});
		});

	});
});