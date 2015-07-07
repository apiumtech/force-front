define([
	'modules/saleAnalytics/filters/userFilter/UserFilterModel',
	'shared/services/ajax/AuthAjaxService',
	'shared/services/StorageService',
	'q'
], function(UserFilterModel, AuthAjaxService, StorageService, Q) {
	'use strict';

	describe('UserFilterModel', function() {
		var sut;

		var ajaxService = mock(AuthAjaxService),

			storageService = mock(StorageService);

		var deferredObject = {
			promise: function () {
			},
			reject: function () {
			},
			resolve: function () {
			}
		};

		beforeEach(function () {
			sut = new UserFilterModel(ajaxService, storageService);
			spyOn(sut, 'defer').and.returnValue(deferredObject);
		});

		describe("_getUsers", function () {
			beforeEach(function () {
			});

			it("should call defer to get defer object", function () {
				spyOn(ajaxService, 'rawAjaxRequest').and.returnValue(exerciseFakePromise());
				sut._getUsers();
				expect(sut.defer).toHaveBeenCalled();
			});

			describe("service return success", function () {
				var returnData = {
					data: []
				};

				function fakePromise() {
					return {
						then: function (a, b) {
							a(returnData);
							return fakePromise();
						}
					};
				}

				var fakeReturnData = [
					{
						emptyObject: true
					}
				];

				it("should call decorateData to format data", function () {
					spyOn(ajaxService, 'rawAjaxRequest').and.returnValue(fakePromise());
					spyOn(sut, 'decorateData').and.returnValue(fakeReturnData);
					spyOn(deferredObject, 'resolve');
					sut._getUsers();
					expect(sut.decorateData).toHaveBeenCalledWith(returnData);
				});

				it("should resolve the defer with data from server response", function () {
					spyOn(ajaxService, 'rawAjaxRequest').and.returnValue(fakePromise());
					spyOn(sut, 'decorateData').and.returnValue(fakeReturnData);
					spyOn(deferredObject, 'resolve');
					sut._getUsers();
					expect(deferredObject.resolve).toHaveBeenCalledWith(fakeReturnData);
				});

			});

			describe("service return error", function () {
				var error = new Error("test error");

				function fakePromise() {
					return {
						then: function (a, b) {
							b(error);
							return fakePromise();
						}
					};
				}

				it("should reject the defer with error", function () {
					spyOn(ajaxService, 'rawAjaxRequest').and.returnValue(fakePromise());
					spyOn(deferredObject, 'reject');
					sut._getUsers();
					expect(deferredObject.reject).toHaveBeenCalledWith(error);
				});
			});

			it("should return the promise deferred", function () {
				spyOn(ajaxService, 'rawAjaxRequest').and.returnValue(exerciseFakePromise());
				var promise = sut._getUsers();
				expect(promise).toEqual(deferredObject.promise);
			});
		});

		describe("getUsers", function () {
			beforeEach(function () {
				sinon.stub(Q, 'fcall');
			});

			afterEach(function () {
				Q.fcall.restore();
			});

			it("should call fcall from Q lib", function () {
				sut.getUsers();
				expect(Q.fcall).toHaveBeenCalled();
			});

			// TODO: research how to test this
			//it("should call _getUsers method", function () {
			//	spyOn(sut, "_getUsers");
			//	Q.fcall = function (method) {
			//		return method;
			//	};
            //
			//	sut.getUsers()();
            //
			//	expect(sut._getUsers).toHaveBeenCalled();
			//});
		});

		describe("addQuery", function () {
			it("should add correct query", function () {
				sut.addQuery(1);
				var expected = 1;
				var actual = sut.currentQuery;
				expect(actual).toEqual(expected);
			});
		});

		describe('decorateData', function () {
			describe('data is empty', function () {
				it("should return data empty error", function () {
					var data = [];
					expect(function () {
						sut.decorateData(data);
					}).toThrow(new Error("No data received from server"));
				});
			});

			describe('has value in server response', function () {
				it("should decorate the data into tree", function () {
					var input = [
						{
							"Id": 1,
							"Name": "A",
							"ParentId": -1
						},
						{
							"Id": 2,
							"Name": "B",
							"ParentId": -1
						},
						{
							"Id": 3,
							"Name": "C",
							"ParentId": -1
						},
						{
							"Id": 4,
							"Name": "D",
							"ParentId": -1
						},
						{
							"Id": 5,
							"Name": "Child of A",
							"ParentId": 1
						},
						{
							"Id": 6,
							"Name": "Child of B 1",
							"ParentId": 2
						},
						{
							"Id": 7,
							"Name": "Child of B 2",
							"ParentId": 2
						},
						{
							"Id": 8,
							"Name": "Child of D 1",
							"ParentId": 4
						},
						{
							"Id": 9,
							"Name": "Child of D 2",
							"ParentId": 4
						},
						{
							"Id": 10,
							"Name": "Child of Child of D 2",
							"ParentId": 9
						},
						{
							"Id": 11,
							"Name": "Child of Child of Child of D 2",
							"ParentId": 10
						}];

					var expected = [
						{
							"Id": 1,
							"Name": 'A',
							"ParentId": -1,
							"children": [
								{
									"Id": 5,
									"Name": "Child of A",
									"ParentId": 1
								}
							]
						},
						{
							"Id": 2,
							"Name": "B",
							"ParentId": -1,
							children: [
								{
									"Id": 6,
									"Name": "Child of B 1",
									"ParentId": 2
								},
								{
									"Id": 7,
									"Name": "Child of B 2",
									"ParentId": 2
								}
							]
						},
						{
							"Id": 3,
							"Name": "C",
							"ParentId": -1
						},
						{
							"Id": 4,
							"Name": "D",
							"ParentId": -1,
							children: [
								{
									"Id": 8,
									"Name": "Child of D 1",
									"ParentId": 4
								},
								{
									"Id": 9,
									"Name": "Child of D 2",
									"ParentId": 4,
									children: [
										{
											"Id": 10,
											"Name": "Child of Child of D 2",
											"ParentId": 9,
											children: [
												{
													"Id": 11,
													"Name": "Child of Child of Child of D 2",
													"ParentId": 10
												}
											]
										}
									]
								}
							]
						}
					];
					spyOn(sut.arrayHelper, 'makeTree').and.callThrough();
					var output = sut.decorateData(input);
					expect(sut.arrayHelper.makeTree).toHaveBeenCalledWith(input, 'ParentId', 'Id', 'children', -1);
					expect(output).toEqual(expected);
				});
			});
		});

		describe("getFilteredData", function () {

			describe('data is empty or invalid array', function () {
				[null, undefined, [], {length: 10}].forEach(function (data) {
					it("should throw data empty exception", function () {
						expect(function () {
							sut.getFilteredData(data);
						}).toThrow(new Error('Invalid data passed'));
					});
				})
			});

			describe('currentUserFilterGroup is invalid', function () {
				var data = [{
					"data": "data"
				}];
				[null, undefined, 'somethingElse'].forEach(function (filter) {
					it("should throw currentUserFilterGroup is invalid exception", function () {
						expect(function () {
							sut.getFilteredData(data, filter);
						}).toThrow(new Error('Invalid filterGroup passed'));
					});
				})
			});

			describe('searchQuery is empty', function () {
				var data = [{
					"data": "data"
				}];
				var filter = 'Hierarqhy';
				it("should return the same data without touching it", function () {
					var actual = sut.getFilteredData(data, filter);
					expect(actual).toEqual(data);
				});
			});

			describe('currentUserFilterGroup is "Environment" or "Team"', function () {
				beforeEach(function () {
					// Arrange
					var data = [{
						"data": 'data'
					}];
					Object.keys(Object.getPrototypeOf(sut)).filter(function (methodName) {
						return methodName.match(/^(getFilteredDataFor)+/);
					}).forEach(function (method) {
						spyOn(sut, method);
					});
				});

				[{
					query: 'Environment', expectedCallMethod: 'getFilteredDataForEnvironment'
				}, {
					query: 'Hierarqhy', expectedCallMethod: 'getFilteredDataForHierarqhy'
				}].forEach(function (testCase) {
						it("should call proper function base on currentUserFilterGroup", function () {
							var data = [{
								data: "data"
							}];
							var searchQuery = "what ever";
							// action
							sut.getFilteredData(data, testCase.query, searchQuery);

							// Assert
							expect(sut[testCase.expectedCallMethod]).toHaveBeenCalledWith(data, searchQuery);
						})
					});
			});

		});

		describe('getFilteredDataForEnvironment', function () {
			it("should return filtered data base on searchQuery", function () {
				var searchQuery = "o";
				var input = [
					{
						"Id": 1,
						"Name": "Antonio",
						"ParentId": -1,
						"isEnvironment": true,
						"checked": false,
						"children": [{
							"Id": 3,
							"Name": "Beck",
							"ParentId": 1,
							"isEnvironment": false,
							"checked": false
						}, {
							"Id": 4,
							"Name": "Victoria",
							"ParentId": 1,
							"isEnvironment": false,
							"checked": false
						}]
					},
					{
						"Id": 2,
						"Name": "Kevin",
						"ParentId": -1,
						"isEnvironment": true,
						"checked": false,
						"children": [{
							"Id": 5,
							"Name": "Thomas",
							"ParentId": 2,
							"isEnvironment": false,
							"checked": false
						}, {
							"Id": 6,
							"Name": "Cindy",
							"ParentId": 2,
							"isEnvironment": false,
							"checked": false
						}]
					}
				];
				var output = [
					{
						"Id": 1,
						"Name": "Antonio",
						"ParentId": -1,
						"isEnvironment": true,
						"checked": false,
						"children": [{
							"Id": 4,
							"Name": "Victoria",
							"ParentId": 1,
							"isEnvironment": false,
							"checked": false
						}]
					},
					{
						"Id": 2,
						"Name": "Kevin",
						"ParentId": -1,
						"checked": false,
						"isEnvironment": true,
						"children": [{
							"Id": 5,
							"Name": "Thomas",
							"ParentId": 2,
							"isEnvironment": false,
							"checked": false
						}]
					}
				];
				spyOn(sut.arrayHelper, 'queryTree').and.callThrough();
				var filteredData = sut.getFilteredDataForEnvironment(input, searchQuery);
				expect(sut.arrayHelper.queryTree).toHaveBeenCalledWith(input, "children", "Name", searchQuery, "Id", true, "ParentId", "Id", -1);
				expect(filteredData).toEqual(output);
			});
		});

		describe('getFilteredDataForHierarqhy', function () {
			it("should return filtered data base on searchQuery", function () {
				var searchQuery = "o";
				var input = [
					{
						"Id": 1,
						"Name": "Antonio",
						"ParentId": -1,
						"checked": false,
						"children": [{
							"Id": 3,
							"Name": "Beck",
							"ParentId": 1,
							"checked": false
						}, {
							"Id": 4,
							"Name": "Victoria",
							"ParentId": 1,
							"checked": false,
							"children": [
								{
									"Id": 41,
									"Name": "Hank",
									"ParentId": 4,
									"checked": false
								},
								{
									"Id": 42,
									"Name": "John",
									"ParentId": 4,
									"checked": false
								}
							]
						}]
					},
					{
						"Id": 2,
						"Name": "Kevin",
						"ParentId": -1,
						"checked": false,
						"children": [{
							"Id": 5,
							"Name": "Thomas",
							"ParentId": 2,
							"checked": false
						}, {
							"Id": 6,
							"Name": "Cindy",
							"ParentId": 2,
							"checked": false,
							"children": [
								{
									"Id": 61,
									"Name": "Alex",
									"ParentId": 6,
									"checked": false,
									"children": [
										{
											"Id": 611,
											"Name": "Tom",
											"ParentId": 61,
											"checked": false
										}
									]
								}
							]
						}]
					}
				];
				var expectedOutput = [
					{
						"Id": 1,
						"Name": "Antonio",
						"ParentId": -1,
						"checked": false,
						"children": [{
							"Id": 4,
							"Name": "Victoria",
							"ParentId": 1,
							"checked": false,
							"children": [
								{
									"Id": 42,
									"Name": "John",
									"ParentId": 4,
									"checked": false
								}
							]
						}]
					},
					{
						"Id": 2,
						"Name": "Kevin",
						"ParentId": -1,
						"checked": false,
						"children": [{
							"Id": 5,
							"Name": "Thomas",
							"ParentId": 2,
							"checked": false
						}, {
							"Id": 6,
							"Name": "Cindy",
							"ParentId": 2,
							"checked": false,
							"children": [
								{
									"Id": 61,
									"Name": "Alex",
									"ParentId": 6,
									"checked": false,
									"children": [
										{
											"Id": 611,
											"Name": "Tom",
											"ParentId": 61,
											"checked": false
										}
									]
								}
							]
						}]
					}
				];
				spyOn(sut.arrayHelper, 'queryTree').and.callThrough();
				var filteredData = sut.getFilteredDataForHierarqhy(input, searchQuery);
				expect(sut.arrayHelper.queryTree).toHaveBeenCalledWith(input, "children", "Name", searchQuery, "Id", true, "ParentId", "Id", -1);
				expect(filteredData).toEqual(expectedOutput);
			});
		});
	});
});