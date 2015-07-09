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
							Id: 7,
							Name: "Analisis Oportunidades IN/OUT 07",
							Description: "Imforme que muestra riesgo por bajo uso por cliente",
							IdParent: 4,
							Type: 'report',
							Favorite: true
						},
						{
							Id: 5,
							Name: "Analisis Oportunidades IN/OUT 05",
							Description: "Imforme que muestra riesgo por bajo uso por cliente",
							IdParent: 3,
							Type: 'report',
							Favorite: true
						},
						{
							Id: 11,
							Name: "Analisis Oportunidades IN/OUT 11",
							Description: "Imforme que muestra riesgo por bajo uso por cliente",
							IdParent: 2,
							Type: 'report',
							Favorite: true
						}
					];

					var expectedOutput = [
						{
							Id: 5,
							Name: "Analisis Oportunidades IN/OUT 05",
							Description: "Imforme que muestra riesgo por bajo uso por cliente",
							IdParent: 3,
							Type: 'report',
							Favorite: true
						},
						{
							Id: 7,
							Name: "Analisis Oportunidades IN/OUT 07",
							Description: "Imforme que muestra riesgo por bajo uso por cliente",
							IdParent: 4,
							Type: 'report',
							Favorite: true
						},
						{
							Id: 11,
							Name: "Analisis Oportunidades IN/OUT 11",
							Description: "Imforme que muestra riesgo por bajo uso por cliente",
							IdParent: 2,
							Type: 'report',
							Favorite: true
						}
					];


					var output = sut.decorateServerData(input);
					expect(output).toEqual(expectedOutput);
				});
			});
		});

	});
});