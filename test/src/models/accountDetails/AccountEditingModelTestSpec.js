/**
 * Created by justin on 3/20/15
 */

describe("AccountEditingModel", function () {
    var AccountEditingModel = app.getModel('models/accountDetails/AccountEditingModel');
    var Configuration = app.getService('Configuration');
    var sut, ajaxService, uploadService;

    it("should throw exception if no upload service is being injected", function () {
        uploadService = null;
        ajaxService = {
            rawAjaxRequest: function () {
            }
        };
        expect(function () {
            sut = AccountEditingModel.newInstance(uploadService, ajaxService).getOrElse(throwInstantiateException(AccountEditingModel));
        }).toThrow(new Error("uploadService cannot be null"));
    });

    beforeEach(function () {
        ajaxService = {
            rawAjaxRequest: function () {
            }
        };

        uploadService = {
            upload: function () {
            }
        };
        sut = AccountEditingModel.newInstance(uploadService, ajaxService).getOrElse(throwInstantiateException(AccountEditingModel));
    });

    function exerciseAjaxOk() {
        return {
            then: function (a, b) {
                a();
                return exerciseAjaxOk();
            }
        }
    }

    //region Base class inheritance test
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
            sut.decorateAvailableOwners(result);
            expect(sut.availableOwners).toEqual(result);
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
            expect(sut.availableOwners).toEqual(result);
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
            sut.decorateAvailableEnvironments(result);
            expect(sut.availableEnvironments).toEqual(result);
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
            sut.decorateAvailableEnvironments(result);
            expect(sut.availableEnvironments).toEqual(result);
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
            sut.decorateAvailableAccountTypes(result);
            expect(sut.availableAccountTypes).toEqual(result);
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
            sut.decorateAvailableAccountTypes(result);
            expect(sut.availableAccountTypes).toEqual(result);
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
            sut.decorateAvailableViews(result);
            expect(sut.availableViews).toEqual(result);
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
            sut.decorateAvailableViews(result);
            expect(sut.availableViews).toEqual(result);
        });
    });
    //endregion Base class inheritance test

    describe("uploadFile", function () {
        it("should call upload method from uploadService with correct params", function () {
            spyOn(uploadService, 'upload').and.returnValue(exerciseFakeOkPromise());
            spyOn(sut, 'decorateResponseData');
            var model = {name: "Fake model"};
            sut.uploadFile(model);
            expect(uploadService.upload).toHaveBeenCalled();
            expect(uploadService.upload.calls.mostRecent().args[0].url).toEqual(Configuration.api.uploadFile);
            expect(uploadService.upload.calls.mostRecent().args[0].file).toEqual(model);
            expect(uploadService.upload.calls.mostRecent().args[0].method).toEqual('POST');
        });

        it("should call decorateResponseData to decorate response data", function () {
            spyOn(uploadService, 'upload').and.returnValue(exerciseFakeOkPromise());
            spyOn(sut, 'decorateResponseData');
            var file = {name: 100};
            sut.uploadFile(file);
            expect(sut.decorateResponseData).toHaveBeenCalled();
        });
    });

    describe("createAccount", function () {
        it("should call ajaxRequest with correct params", function () {
            spyOn(ajaxService, 'rawAjaxRequest').and.returnValue(exerciseFakeOkPromise());
            var model = {name: "Fake model"};
            sut.createAccount(model);
            expect(ajaxService.rawAjaxRequest).toHaveBeenCalled();
            expect(ajaxService.rawAjaxRequest.calls.mostRecent().args[0].url).toEqual(Configuration.api.createAccount);
            expect(ajaxService.rawAjaxRequest.calls.mostRecent().args[0].data).toEqual(model);
            expect(ajaxService.rawAjaxRequest.calls.mostRecent().args[0].type).toEqual('post');
        });
    });
});

