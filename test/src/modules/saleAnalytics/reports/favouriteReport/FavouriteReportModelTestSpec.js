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
				it("should decorate the data into tree", function () {
					var input = [
						{
							id: 1,
							name: 'Folder',
							type: 'folder',
							idParent: -1
						},
						{
							id: 2,
							name: 'Folder',
							type: 'folder',
							idParent: -1
						},
						{
							id: 3,
							name: 'Folder',
							type: 'folder',
							idParent: 1
						},
						{
							id: 4,
							name: 'Folder',
							type: 'folder',
							idParent: 3
						},
						{
							id: 5,
							name: "Analisis Oportunidades IN/OUT 5",
							description: "Imforme que muestra riesgo por bajo uso por cliente",
							idParent: 3,
							type: 'report'
						},
						{
							id: 6,
							name: "Analisis Oportunidades IN/OUT 6",
							description: "Imforme que muestra riesgo por bajo uso por cliente",
							idParent: 4,
							type: 'report'
						},
						{
							id: 7,
							name: "Analisis Oportunidades IN/OUT 7",
							description: "Imforme que muestra riesgo por bajo uso por cliente",
							idParent: 4,
							type: 'report'
						},
						{
							id: 8,
							name: "Analisis Oportunidades IN/OUT 8",
							description: "Imforme que muestra riesgo por bajo uso por cliente",
							idParent: 4,
							type: 'report'
						},
						{
							id: 9,
							name: "Analisis Oportunidades IN/OUT 9",
							description: "Imforme que muestra riesgo por bajo uso por cliente",
							idParent: 4,
							type: 'report'
						},
						{
							id: 10,
							name: "Analisis Oportunidades IN/OUT 10",
							description: "Imforme que muestra riesgo por bajo uso por cliente",
							idParent: 2,
							type: 'report'
						},
						{
							id: 11,
							name: "Analisis Oportunidades IN/OUT 11",
							description: "Imforme que muestra riesgo por bajo uso por cliente",
							idParent: 2,
							type: 'report'
						}
					];

					var expectedOutput = [
						{
							id: 5,
							name: "Analisis Oportunidades IN/OUT 5",
							description: "Imforme que muestra riesgo por bajo uso por cliente",
							idParent: 3,
							type: 'report'
						},
						{
							id: 6,
							name: "Analisis Oportunidades IN/OUT 6",
							description: "Imforme que muestra riesgo por bajo uso por cliente",
							idParent: 4,
							type: 'report'
						},
						{
							id: 7,
							name: "Analisis Oportunidades IN/OUT 7",
							description: "Imforme que muestra riesgo por bajo uso por cliente",
							idParent: 4,
							type: 'report'
						},
						{
							id: 8,
							name: "Analisis Oportunidades IN/OUT 8",
							description: "Imforme que muestra riesgo por bajo uso por cliente",
							idParent: 4,
							type: 'report'
						},
						{
							id: 9,
							name: "Analisis Oportunidades IN/OUT 9",
							description: "Imforme que muestra riesgo por bajo uso por cliente",
							idParent: 4,
							type: 'report'
						},
						{
							id: 10,
							name: "Analisis Oportunidades IN/OUT 10",
							description: "Imforme que muestra riesgo por bajo uso por cliente",
							idParent: 2,
							type: 'report'
						},
						{
							id: 11,
							name: "Analisis Oportunidades IN/OUT 11",
							description: "Imforme que muestra riesgo por bajo uso por cliente",
							idParent: 2,
							type: 'report'
						}
					];


					var output = sut.decorateServerData(input);
					expect(output).toEqual(expectedOutput);
				});
			});
		});

	});
});