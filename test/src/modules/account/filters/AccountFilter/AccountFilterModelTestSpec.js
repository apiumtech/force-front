/**
 * Created by justin on 3/4/15
 */

define([
    'modules/account/filters/AccountFilter/AccountFilterModel',
    'config'
], function (AccountFilterModel, Configuration) {
    'use strict';
    describe("AccountFilterModel", function () {

        var sut, ajaxService;

        beforeEach(function () {
            ajaxService = {
                rawAjaxRequest: function () {
                }
            };
            sut = AccountFilterModel.newInstance(ajaxService);
        });

        function exerciseAjaxOk() {
            return {
                then: function (a, b) {
                    a();
                    return exerciseAjaxOk();
                }
            }
        }

        describe("getAvailableOwners", function () {
            function exerciseTest(query) {
                spyOn(ajaxService, 'rawAjaxRequest').and.returnValue(exerciseAjaxOk());
                spyOn(sut, 'decorateAvailableOwners');
                sut.getAvailableOwners(query);
            }

            [{
                message: "no query defined",
                query: null,
                correctUrl: Configuration.api.getAvailableOwners
            }, {
                message: "has query",
                query: "apiumtech",
                correctUrl: Configuration.api.getAvailableOwners + "?query=apiumtech"
            }].forEach(function (test) {
                    describe(test.message, function () {
                        it("should call ajaxService with correct params", function () {
                            exerciseTest(test.query);
                            expect(ajaxService.rawAjaxRequest).toHaveBeenCalled();
                            expect(ajaxService.rawAjaxRequest.calls.mostRecent().args[0].url).toEqual(test.correctUrl);
                            expect(ajaxService.rawAjaxRequest.calls.mostRecent().args[0].type).toEqual('get');
                        });
                    });
                });

            it("should call decorateAvailableOwners", function () {
                exerciseTest();
                expect(sut.decorateAvailableOwners).toHaveBeenCalled();
            });
        });

        describe("decorateAvailableOwners", function () {
            it("should init 'availableOwners' property if not initialized", function () {
                sut.availableOwners = null;
                var result = [{
                    id: 1,
                    name: "user1"
                }, {
                    id: 2,
                    name: "user2"
                }];
                var expected = [{
                    id: 1,
                    name: "user1",
                    selected: false
                }, {
                    id: 2,
                    name: "user2",
                    selected: false
                }];
                sut.decorateAvailableOwners(result);
                expect(sut.availableOwners).toEqual(expected);
            });

            it("should merge 'availableOwners' property if initialized", function () {
                sut.availableOwners = [{
                    id: 1,
                    name: "user1",
                    selected: false
                }, {
                    id: 2,
                    name: "user2",
                    selected: true
                }];
                var result = [{
                    id: 2,
                    name: "user2"
                }];
                var expected = [{
                    id: 2,
                    name: "user2",
                    selected: true
                }];
                sut.decorateAvailableOwners(result);
                expect(sut.availableOwners).toEqual(expected);
            });
        });

        describe("getAvailableEnvironments", function () {
            function exerciseTest(query) {
                spyOn(ajaxService, 'rawAjaxRequest').and.returnValue(exerciseAjaxOk());
                spyOn(sut, 'decorateAvailableEnvironments');
                sut.getAvailableEnvironments(query);
            }

            [{
                message: "no query defined",
                query: null,
                correctUrl: Configuration.api.getAvailableEnvironments
            }, {
                message: "has query",
                query: "apiumtech",
                correctUrl: Configuration.api.getAvailableEnvironments + "?query=apiumtech"
            }].forEach(function (test) {
                    describe(test.message, function () {
                        it("should call ajaxService with correct params: " + test.correctUrl, function () {
                            exerciseTest(test.query);
                            expect(ajaxService.rawAjaxRequest).toHaveBeenCalled();
                            expect(ajaxService.rawAjaxRequest.calls.mostRecent().args[0].url).toEqual(test.correctUrl);
                            expect(ajaxService.rawAjaxRequest.calls.mostRecent().args[0].type).toEqual('get');
                        });
                    });
                });

            it("should call decorateAvailableEnvironments", function () {
                exerciseTest();
                expect(sut.decorateAvailableEnvironments).toHaveBeenCalled();
            });
        });

        describe("decorateAvailableEnvironments", function () {
            it("should init 'availableEnvironments' property if not initialized", function () {
                sut.availableEnvironments = null;
                var result = [{
                    id: 1,
                    name: "environment1"
                }, {
                    id: 2,
                    name: "environment2"
                }];
                var expected = [{
                    id: 1,
                    name: "environment1",
                    selected: false
                }, {
                    id: 2,
                    name: "environment2",
                    selected: false
                }];
                sut.decorateAvailableEnvironments(result);
                expect(sut.availableEnvironments).toEqual(expected);
            });

            it("should merge 'availableEnvironments' property if initialized", function () {
                sut.availableEnvironments = [{
                    id: 1,
                    name: "environment1",
                    selected: false
                }, {
                    id: 2,
                    name: "environment2",
                    selected: true
                }];
                var result = [{
                    id: 2,
                    name: "environment2"
                }];
                var expected = [{
                    id: 2,
                    name: "environment2",
                    selected: true
                }];
                sut.decorateAvailableEnvironments(result);
                expect(sut.availableEnvironments).toEqual(expected);
            });
        });

        describe("getAvailableAccountTypes", function () {
            function exerciseTest(query) {
                spyOn(ajaxService, 'rawAjaxRequest').and.returnValue(exerciseAjaxOk());
                spyOn(sut, 'decorateAvailableAccountTypes');
                sut.getAvailableAccountTypes(query);
            }

            [{
                message: "no query defined",
                query: null,
                correctUrl: Configuration.api.getAvailableAccountTypes
            }, {
                message: "has query",
                query: "apiumtech",
                correctUrl: Configuration.api.getAvailableAccountTypes + "?query=apiumtech"
            }].forEach(function (test) {
                    describe(test.message, function () {
                        it("should call ajaxService with correct params", function () {
                            exerciseTest(test.query);
                            expect(ajaxService.rawAjaxRequest).toHaveBeenCalled();
                            expect(ajaxService.rawAjaxRequest.calls.mostRecent().args[0].url).toEqual(test.correctUrl);
                            expect(ajaxService.rawAjaxRequest.calls.mostRecent().args[0].type).toEqual('get');
                        });
                    });
                });

            it("should call decorateAvailableAccountTypes", function () {
                exerciseTest();
                expect(sut.decorateAvailableAccountTypes).toHaveBeenCalled();
            });
        });

        describe("decorateAvailableAccountTypes", function () {
            it("should init 'availableAccountTypes' property if not initialized", function () {
                sut.availableAccountTypes = null;
                var result = [{
                    id: 1,
                    name: "user1"
                }, {
                    id: 2,
                    name: "user2"
                }];
                var expected = [{
                    id: 1,
                    name: "user1",
                    selected: false
                }, {
                    id: 2,
                    name: "user2",
                    selected: false
                }];
                sut.decorateAvailableAccountTypes(result);
                expect(sut.availableAccountTypes).toEqual(expected);
            });

            it("should merge 'availableAccountTypes' property if initialized", function () {
                sut.availableAccountTypes = [{
                    id: 1,
                    name: "user1",
                    selected: false
                }, {
                    id: 2,
                    name: "user2",
                    selected: true
                }];
                var result = [{
                    id: 2,
                    name: "user2"
                }];
                var expected = [{
                    id: 2,
                    name: "user2",
                    selected: true
                }];
                sut.decorateAvailableAccountTypes(result);
                expect(sut.availableAccountTypes).toEqual(expected);
            });
        });

        describe("getAvailableViews", function () {
            function exerciseTest(query) {
                spyOn(ajaxService, 'rawAjaxRequest').and.returnValue(exerciseAjaxOk());
                spyOn(sut, 'decorateAvailableViews');
                sut.getAvailableViews(query);
            }

            [{
                message: "no query defined",
                query: null,
                correctUrl: Configuration.api.getAvailableViews
            }, {
                message: "has query",
                query: "apiumtech",
                correctUrl: Configuration.api.getAvailableViews + "?query=apiumtech"
            }].forEach(function (test) {
                    describe(test.message, function () {
                        it("should call ajaxService with correct params", function () {
                            exerciseTest(test.query);
                            expect(ajaxService.rawAjaxRequest).toHaveBeenCalled();
                            expect(ajaxService.rawAjaxRequest.calls.mostRecent().args[0].url).toEqual(test.correctUrl);
                            expect(ajaxService.rawAjaxRequest.calls.mostRecent().args[0].type).toEqual('get');
                        });
                    });
                });

            it("should call decorateAvailableViews", function () {
                exerciseTest();
                expect(sut.decorateAvailableViews).toHaveBeenCalled();
            });
        });

        describe("decorateAvailableViews", function () {
            it("should init 'availableViews' property if not initialized", function () {
                sut.availableViews = null;
                var result = [{
                    id: 1,
                    name: "user1"
                }, {
                    id: 2,
                    name: "user2"
                }];
                var expected = [{
                    id: 1,
                    name: "user1",
                    selected: false
                }, {
                    id: 2,
                    name: "user2",
                    selected: false
                }];
                sut.decorateAvailableViews(result);
                expect(sut.availableViews).toEqual(expected);
            });

            it("should merge 'availableViews' property if initialized", function () {
                sut.availableViews = [{
                    id: 1,
                    name: "user1",
                    selected: false
                }, {
                    id: 2,
                    name: "user2",
                    selected: true
                }];
                var result = [{
                    id: 2,
                    name: "user2"
                }];
                var expected = [{
                    id: 2,
                    name: "user2",
                    selected: true
                }];
                sut.decorateAvailableViews(result);
                expect(sut.availableViews).toEqual(expected);
            });
        });
    });

});

