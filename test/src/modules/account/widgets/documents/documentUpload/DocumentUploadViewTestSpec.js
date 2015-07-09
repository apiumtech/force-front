define([
    'config',
    'modules/account/widgets/documents/documentUpload/DocumentUploadView',
    'shared/services/ModalDialogAdapter',
    'shared/services/fileService/FileService',
    'modules/account/widgets/documents/documentUpload/DocumentUploadPresenter'
], function (config, DocumentUploadView, ModalDialogAdapter, FileService, DocumentUploadPresenter) {
    'use strict';

    describe('DocumentUploadView', function () {

        var sut, presenter, modalInstance, modalDialogAdapter, fileService;
        beforeEach(function () {
            modalInstance = {
                dismiss: sinon.stub(),
                close: sinon.stub()
            };
            presenter = mock(DocumentUploadPresenter);
            modalDialogAdapter = mock(ModalDialogAdapter);
            fileService = mock(FileService);
            sut = new DocumentUploadView(presenter, modalDialogAdapter, fileService);
            sut.modalInstance = modalInstance;
        });

        describe('inherits from baseView', function () {
            it("should call presenter's show method on show()", function () {
                var view = new DocumentUploadView(presenter);
                view.show();
                expect(presenter.show).toHaveBeenCalled();
            });
            it("should call configureEvents method on show()", function () {
                var view = new DocumentUploadView(presenter);
                sinon.stub(view, 'configureEvents');
                view.show();
                expect(view.configureEvents).toHaveBeenCalled();
            });
        });

        describe('configureEvents', function () {
            beforeEach(function () {
                sut.configureEvents();
            });

            describe('fn.close', function () {
                it('should dismiss the modalInstance', function () {
                    sut.fn.close();
                    expect(modalInstance.close).toHaveBeenCalledWith(sut.uploadStatus);
                });
            });

            describe('fn.startUpload', function () {
                beforeEach(function () {
                    sut.filesList = ['file1', 'file2', 'file3'];
                    sut.event.onUploadFile = jasmine.createSpy(); //  sinon.stub();
                    sut.uploadedFiles = 10;
                    sut.uploadCompleted = true;
                    sut.fn.startUpload();
                });
                it("should fire event 'onUploadFile' with times of the files list's length", function () {
                    expect(sut.event.onUploadFile).toHaveBeenCalledWith('file1');
                    expect(sut.event.onUploadFile).toHaveBeenCalledWith('file2');
                    expect(sut.event.onUploadFile).toHaveBeenCalledWith('file3');
                    expect(sut.event.onUploadFile.calls.count()).toEqual(3);
                    expect(sut.event.onUploadFile.calls.count()).not.toEqual(5);
                });

                it("should re-initialize uploadedFiles to 0", function () {
                    expect(sut.uploadedFiles).toEqual(0);
                });

                it("should set uploadCompleted to false", function () {
                    expect(sut.uploadCompleted).toEqual(false);
                });
            });

            describe('fn.dropFile', function () {

                var file = {
                    lastModified: new Date().getTime(),
                    size: 204800,
                    name: "some_test_document.pdf"
                };
                beforeEach(function () {
                    sut.filesList = [];
                    sinon.stub(sut, 'isOverSized').returns(false);
                    sinon.stub(sut, 'isArchivedFile').returns(false);
                });

                it("should call isOverSized to determine the file size is exceeded", function () {
                    sut.fn.dropFile([file]);
                    expect(sut.isOverSized).toHaveBeenCalled();
                });


                it("should call isArchivedFile to determine the file size is exceeded", function () {
                    sut.fn.dropFile([file]);
                    expect(sut.isArchivedFile).toHaveBeenCalled();
                });

                it("should transform the files into correct contract", function () {
                    var expected = {
                        id: 0,
                        fileStream: file,
                        name: file.name,
                        isEditingName: false,
                        isArchivedFile: false,
                        extract: false,
                        isOverSized: false
                    };

                    sut.fn.dropFile([file]);
                    expect(sut.filesList[0]).toEqual(expected);
                });
                it("should pushed the input files list into filesList", function () {
                    sut.fn.dropFile([file, file, file]);
                    expect(sut.filesList.length).toEqual(3);
                });
            });

            describe('fn.editName', function () {
                var record;
                beforeEach(function () {
                    record = {
                        isEditingName: false,
                        name: "original"
                    };
                    sut.fn.editName(record);
                });
                it("should turn isEditingName to true", function () {
                    expect(record.isEditingName).toBeTruthy();
                });
                it('should backup the original name', function () {
                    expect(record.__name).toEqual("original");
                });
            });

            describe('fn.saveRecordName', function () {
                var record;
                beforeEach(function () {
                    fileService.getFileExtension.withArgs('abcd.png').returns('png');
                    fileService.getFileExtension.withArgs('original').returns('');
                    record = {
                        isEditingName: true,
                        name: "original",
                        __name: "abcd.png"
                    };
                    sut.fn.saveRecordName(record);
                });
                afterEach(function () {
                    fileService.getFileExtension.restore();
                });

                it("should call getFileExtension from service to get file extension", function () {
                    expect(fileService.getFileExtension).toHaveBeenCalledWith("abcd.png");
                });

                describe("new name doesn't contain extension", function () {
                    it("should store old extension to new name", function () {
                        expect(record.name).toEqual('original.png');
                    });
                });

                it("should turn isEditingName to false", function () {
                    expect(record.isEditingName).toBeFalsy();
                });
                it("should delete __name from record", function () {
                    expect(record.__name).toBeUndefined();
                });
            });

            describe('fn.cancelEditing', function () {
                var record;
                beforeEach(function () {
                    record = {
                        isEditingName: false,
                        name: "original",
                        __name: "abcd"
                    };
                    sut.fn.cancelEditing(record);
                });
                it("should turn isEditingName to false", function () {
                    expect(record.isEditingName).toBeFalsy();
                });
                it("should revert to original name", function () {
                    expect(record.name).toEqual("abcd");
                });
                it("should delete __name from record", function () {
                    expect(record.__name).toBeUndefined();
                });
            });

        });

        describe('onUploadFileSuccess', function () {
            var fakeResponse;
            beforeEach(function () {
                fakeResponse = {
                    config: {
                        fields: {
                            fileId: 10
                        }
                    }
                };
                sut.filesList = [{id: 10}, {id: 11}, {id: 12}, {id: 13}, {id: 14}];
                sut.filesCount = 5;
            });
            it("should increase uploadFiles by 1", function () {
                sut.uploadedFiles = 3;
                sut.onUploadFileSuccess(fakeResponse);
                expect(sut.uploadedFiles).toEqual(4);
            });
            it("should remove the uploaded file from filesList", function () {
                sut.onUploadFileSuccess(fakeResponse);
                expect(sut.filesList).toEqual([{id: 11}, {id: 12}, {id: 13}, {id: 14}]);
            });

            describe('uploadedFiles are equal filesList length', function () {
                it("should set uploadCompleted to true", function () {
                    sut.uploadedFiles = 4;
                    sut.onUploadFileSuccess(fakeResponse);
                    expect(sut.uploadedFiles).toEqual(5);
                    expect(sut.uploadCompleted).toBeTruthy();
                });
            });
        });

        describe('isOverSized', function () {
            var file, allowance;
            beforeEach(function () {
                allowance = config.maxSizeUploadAllowed;
                file = {
                    lastModified: new Date().getTime(),
                    size: 2048 * 1024 * 1024
                };
            });
            afterEach(function () {
                config.maxSizeUploadAllowed = allowance;
            });

            it("should be true if file size is larger than allowance", function () {
                config.maxSizeUploadAllowed = 20;
                expect(sut.isOverSized(file)).toBeTruthy();
            });
            it("should be false if file size is smaller than allowance", function () {
                config.maxSizeUploadAllowed = 4000;
                expect(sut.isOverSized(file)).toBeFalsy();
            });
        });

        describe('isArchivedFile', function () {
            it("should be true if file archived file", function () {
                var file = {
                    type: "application/zip"
                };

                expect(sut.isArchivedFile(file)).toBeTruthy();
            });

            it("should be false if file is not archived file", function () {
                var file = {
                    type: "application/pdf"
                };

                expect(sut.isArchivedFile(file)).toBeFalsy();
            });
        });

        describe('handleDeleteRecord', function () {

            it("should delete record from filesList", function () {
                var record = {
                    id: 2,
                    file: {"this": "is the file"},
                    name: "fileName",
                    size: 232228
                };
                sut.filesList = [
                    {
                        id: 1,
                        file: {"this": "file1"},
                        name: "fileName1",
                        size: 23534
                    },
                    {
                        id: 2,
                        file: {"this": "is the file"},
                        name: "fileName",
                        size: 232228
                    },
                    {
                        id: 3,
                        file: {"this": "file3"},
                        name: "fileName3",
                        size: 327562
                    }
                ];

                var expectedFilesList = [
                    {
                        id: 1,
                        file: {"this": "file1"},
                        name: "fileName1",
                        size: 23534
                    },
                    {
                        id: 3,
                        file: {"this": "file3"},
                        name: "fileName3",
                        size: 327562
                    }
                ];
                sut.handleDeleteRecord(record);
                expect(sut.filesList).toEqual(expectedFilesList);
            });

        });

    });
});