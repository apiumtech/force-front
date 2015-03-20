/**
 * Created by justin on 3/20/15.
 */
describe("AccountCreateView", function () {
    var AccountCreateView = app.getView('views/accountDetails/AccountCreateView');

    var sut, model, presenter, scope, modalInstance;

    beforeEach(function () {
        model = {};
        presenter = {
            show: function () {
            }
        };
        scope = {
            $modal: {}
        };
        modalInstance = {
            close: function () {
            },
            dismiss: function () {
            }
        };
        sut = AccountCreateView.newInstance(scope, modalInstance, model, presenter, false, false).getOrElse(throwInstantiateException(AccountCreateView));
    });

    describe("show()", function () {
        it("should call show from presenter", function () {
            spyOn(sut.presenter, 'show');
            sut.show();
            expect(sut.presenter.show).toHaveBeenCalledWith(sut, model);
        });
        it("should call configureEvents from view", function () {
            spyOn(sut, 'configureEvents');
            sut.show();
            expect(sut.configureEvents).toHaveBeenCalled();
        });
    });

    describe("onAccountSaved", function () {
        it("should close the modal", function () {
            spyOn(modalInstance, 'close');
            sut.onAccountSaved();
            expect(modalInstance.close).toHaveBeenCalled();
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
            sut.fn.closeDialog();
            expect(sut.modalDialogAdapter.confirm).toHaveBeenCalled();
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
});