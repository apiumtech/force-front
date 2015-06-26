define([
	'modules/saleAnalytics/reports/favouriteReport/FavouriteReportModel'
], function(FavouriteReportModel) {
	'use strict';

	describe('FavouriteReportModel', function() {
		var sut, ajaxService;

		beforeEach(function () {
			ajaxService = {
				rawAjaxRequest: function () {
				}
			};
			sut = new FavouriteReportModel(ajaxService);
		});

		describe('_getReports', function () {

			it('should call decoration method to decorate data from server', function (done) {
				spyOn(sut, 'decorateServerData');
				spyOn(ajaxService, 'rawAjaxRequest').and.returnValue(exerciseFakeOkPromise());
				sut._getReports().then(function () {
					expect(sut.decorateServerData).toHaveBeenCalled();
					done();
				});
			});

		});

		describe('decorateServerData', function () {
			describe('data is empty', function () {
				it("should return data empty error", function () {
					var data = [];
					expect(function () {
						sut.decorateServerData(data);
					}).toThrow(new Error("No data received from server"));
				});
			});

			describe('has value in server response', function () {
				it("should sort report by name", function () {
					var input = [
						{
							id: 7,
							name: "Analisis Oportunidades IN/OUT 07",
							description: "Imforme que muestra riesgo por bajo uso por cliente",
							idParent: 4,
							type: 'report',
							favourite: true
						},
						{
							id: 5,
							name: "Analisis Oportunidades IN/OUT 05",
							description: "Imforme que muestra riesgo por bajo uso por cliente",
							idParent: 3,
							type: 'report',
							favourite: true
						},
						{
							id: 11,
							name: "Analisis Oportunidades IN/OUT 11",
							description: "Imforme que muestra riesgo por bajo uso por cliente",
							idParent: 2,
							type: 'report',
							favourite: true
						}
					];

					var expectedOutput = [
						{
							id: 5,
							name: "Analisis Oportunidades IN/OUT 05",
							description: "Imforme que muestra riesgo por bajo uso por cliente",
							idParent: 3,
							type: 'report',
							favourite: true
						},
						{
							id: 7,
							name: "Analisis Oportunidades IN/OUT 07",
							description: "Imforme que muestra riesgo por bajo uso por cliente",
							idParent: 4,
							type: 'report',
							favourite: true
						},
						{
							id: 11,
							name: "Analisis Oportunidades IN/OUT 11",
							description: "Imforme que muestra riesgo por bajo uso por cliente",
							idParent: 2,
							type: 'report',
							favourite: true
						}
					];


					var output = sut.decorateServerData(input);
					expect(output).toEqual(expectedOutput);
				});
			});
		});

	});
});