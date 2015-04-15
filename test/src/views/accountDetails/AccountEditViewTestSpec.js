/**
 * Created by justin on 3/20/15.
 */
describe("AccountEditView", function () {
    var AccountEditView = app.getView('views/accountDetails/AccountEditView');

    var sut, model, presenter, scope;
    beforeEach(function () {
        model = {};
        presenter = {
            show: function () {
            },
            showError: function () {
            }
        };
        scope = {
            $modal: {},
            $injector: {
                get: function () {
                    return {};
                }
            },
            $validation: {
                checkValid: function () {
                }
            }
        };
        sut = AccountEditView.newInstance(scope, model, presenter, false, false).getOrElse(throwInstantiateException(AccountEditView));
    });

    describe("BaseView inheritance test", function () {
        it("should call presenter's show method on show()", function () {
            spyOn(presenter, 'show');
            spyOn(sut, 'configureEvents');
            spyOn(sut, 'initAdditionalData');
            sut.show();
            expect(presenter.show).toHaveBeenCalledWith(sut, model);
        });

        it("should call presenter's showError method on showError()", function () {
            spyOn(presenter, 'showError');
            sut.showError("some error");
            expect(sut.presenter.showError).toHaveBeenCalledWith("some error");
        });
    });

    describe("show()", function () {
        beforeEach(function () {
            spyOn(sut, 'configureEvents');
            spyOn(sut, 'initAdditionalData');
            sut.show();
        });
        it("should call configureEvents from view", function () {
            expect(sut.configureEvents).toHaveBeenCalled();
        });
        it("should call initAdditionalData from view", function () {
            expect(sut.initAdditionalData).toHaveBeenCalled();
        });
    });

    describe("initAdditionalData()", function () {
        var events = ["onLoadAccountType", "onLoadEnvironments", "onLoadAccount"];
        beforeEach(function () {
            events.forEach(function (event) {
                sut.event[event] = jasmine.createSpy();
            });
        });

        events.forEach(function (test) {
            it("should fire event '" + test + "' ", function () {
                sut.initAdditionalData();
                expect(sut.event[test]).toHaveBeenCalled();
            });
        });
    });

    describe("uploadFile", function () {
        it("should fire onUploadFile event", function () {
            var file = {
                filename: "fakefile"
            };
            sut.event.onUploadFile = jasmine.createSpy();
            sut.uploadFile(file);
            expect(sut.event.onUploadFile).toHaveBeenCalledWith(file);
        });
    });

    describe("onFilesChanged", function () {
        var fileList;
        beforeEach(function () {
            fileList = [{
                file: "fake1"
            }, {
                file: "fake2"
            }, {
                file: "fake3"
            }];
            spyOn(sut, 'uploadFile');
        });

        it("should assign the file list length to imagesToUpload", function () {
            sut.onFilesChanged(fileList);
            expect(sut.data.imagesToUpload).toEqual(fileList.length);
        });

        it("should assign the file uploaded to 0", function () {
            sut.onFilesChanged(fileList);
            expect(sut.data.imagesUploaded).toEqual(0);
        });

        it("should turn on the loading indicator", function () {
            sut.onFilesChanged(fileList);
            expect(sut.data.isUploading).toEqual(true);
        });

        it("should call uploadFile for all of files in filesList", function () {
            sut.onFilesChanged(fileList);
            expect(sut.uploadFile).toHaveBeenCalled();
            expect(sut.uploadFile.calls.count()).toEqual(fileList.length);
        });
    });

    describe("onUploadComplete", function () {
        var fileList;
        beforeEach(function () {
            fileList = [{
                file: "fake1"
            }, {
                file: "fake2"
            }, {
                file: "fake3"
            }];

            sut.accountData = {};
        });

        it("should increase imagesUploaded", function () {
            sut.data.imagesUploaded = 2;
            sut.onUploadComplete({imageUrl: "fakeUrl"});
            expect(sut.data.imagesUploaded).toEqual(3);
        });

        it("should assign image url to the account", function () {
            sut.data.imagesUploaded = 2;
            sut.onUploadComplete({imageUrl: "fakeUrl"});
            expect(sut.accountData.imgUrl).toEqual("fakeUrl");
        });

        it("should turn off loading indicator if all images are uploaded", function () {
            sut.data.imagesUploaded = 2;
            sut.data.imagesToUpload = 3;
            sut.data.isUploading = true;
            sut.onUploadComplete({imageUrl: "fakeUrl"});
            expect(sut.data.isUploading).toEqual(false);
        });
    });

    describe("fn.closeDialog", function () {
        it("should confirm before closing", function () {
            sut.configureEvents();
            spyOn(sut.modalDialogAdapter, 'confirm');
            sut.fn.closeDialog(false);
            expect(sut.modalDialogAdapter.confirm).toHaveBeenCalled();
        });
        it("should go back to previous page", function () {
            sut.configureEvents();
            spyOn(sut, 'goBackToPreviousPage');
            sut.fn.closeDialog(true);
            expect(sut.goBackToPreviousPage).toHaveBeenCalled();
        });
    });

    describe("fn.saveAccount", function () {
        beforeEach(function () {
            sut.event.onSubmitEditAccount = jasmine.createSpy();
        });

        it("should turn loading indicator on", function () {
            sut.configureEvents();
            sut.fn.saveAccount();
            expect(sut.data.isPosting).toBeTruthy();

        });
        it("should fire event onSubmitEditAccount", function () {
            sut.configureEvents();
            sut.fn.saveAccount();
            expect(sut.event.onSubmitEditAccount).toHaveBeenCalledWith(sut.accountId, sut.accountData);
        });
    });

    describe("fn.selectFile", function () {
        it("should call selectFile", function () {
            sut.configureEvents();
            spyOn(sut, 'onFilesChanged');
            sut.fn.selectFile();
            expect(sut.onFilesChanged).toHaveBeenCalled();
        });
    });

    describe("fn.isValid", function () {
        it("should call isValid from validationService", function () {
            sut.configureEvents();
            spyOn(scope.$validation, 'checkValid');
            sut.fn.isValid();
            expect(scope.$validation.checkValid).toHaveBeenCalled();
        });
    });

    it("should close any loading indicator on showError()", function () {
        spyOn(presenter, 'showError');
        sut.showError("some error");
        expect(sut.data.isPosting).toBeFalsy();
    });

    describe("onAccountUpdated", function () {
        it("should turn loading indicator of", function () {
            spyOn(sut, 'goBackToPreviousPage');
            sut.onAccountUpdated();
            expect(sut.data.isPosting).toBeFalsy();

        });
        it("should go back to previous page", function () {
            spyOn(sut, 'goBackToPreviousPage');
            sut.onAccountUpdated();
            expect(sut.goBackToPreviousPage).toHaveBeenCalled();
        });
    });

    describe("onAvailableAccountTypeLoaded", function () {
        it("should assign data to available account types", function () {
            var data = [];
            sut.onAvailableAccountTypeLoaded(data);
            expect(sut.data.availableAccountTypes).toEqual(data);
        });
    });

    describe("onEnvironmentsLoaded", function () {
        it("should assign data to availableEnvironments", function () {
            var data = [];
            sut.onEnvironmentsLoaded(data);
            expect(sut.data.availableEnvironments).toEqual(data);
        });
    });

    describe("onAccountLoaded", function () {
        it("should assign data to accountData", function () {
            var data = [];
            sut.onAccountLoaded(data);
            expect(sut.accountData).toEqual(data);
        });
    });
});