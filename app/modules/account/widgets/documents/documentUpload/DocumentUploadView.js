define([
    'app',
    'shared/BaseView',
    'config',
    'modules/account/widgets/documents/documentUpload/DocumentUploadPresenter',
    'shared/services/ModalDialogAdapter',
    'shared/services/fileService/FileService'
], function (app, BaseView, config, DocumentUploadPresenter, ModalDialogAdapter, FileService) {
    'use strict';

    function DocumentUploadView(documentUploadPresenter, modalDialogAdapter, fileService) {
        //@autowired
        this.documentUploadPresenter = documentUploadPresenter || DocumentUploadPresenter._diResolve();
        this.modalDialogAdapter = modalDialogAdapter || ModalDialogAdapter._diResolve();
        this.fileService = fileService || FileService._diResolve();

        BaseView.call(this, {}, null, this.documentUploadPresenter);
        this.uploadedFiles = 0;
        this.uploadCompleted = false;
        this.uploading = false;
        this.modalInstance = null;
    }

    DocumentUploadView.inherits(BaseView, {
        filesList: {
            get: function () {
                return this.$scope.filesList || (this.$scope.filesList = []);
            },
            set: function (value) {
                this.$scope.filesList = value;
            }
        },
        files: {
            get: function () {
                return this.$scope.files;
            },
            set: function (value) {
                this.$scope.files = value;
            }
        },
        presenter: {
            get: function () {
                return this.documentUploadPresenter;
            },
            set: function () {
                return this.documentUploadPresenter;
            }
        },
        uploadedFiles: {
            get: function () {
                return this._scope.uploadedFiles;
            },
            set: function (value) {
                this._scope.uploadedFiles = value;
            }
        },
        uploadCompleted: {
            get: function () {
                return this.$scope.uploadCompleted;
            },
            set: function (value) {
                this.$scope.uploadCompleted = value;
            }
        },
        uploading: {
            get: function () {
                return this.$scope.uploading;
            },
            set: function (value) {
                this.$scope.uploading = value;
            }
        },
        progress: {
            get: function () {
                return this.$scope.progress;
            },
            set: function (value) {
                this.$scope.progress = value;
            }
        },
        error: {
            get: function () {
                return this.$scope.error;
            },
            set: function (value) {
                this.$scope.error = value;
            }
        },
        showErrorMsg: {
            get: function () {
                return this.$scope.showErrorMsg;
            },
            set: function (value) {
                this.$scope.showErrorMsg = value;
            }
        },
        uploadStatus: {
            get: function () {
                return this.$scope.uploadStatus;
            },
            set: function (value) {
                this.$scope.uploadStatus = value;
            }
        },
        filesCount: {
            get: function () {
                return this.$scope.filesCount;
            },
            set: function (value) {
                this.$scope.filesCount = value;
            }
        }
    });

    DocumentUploadView.prototype.show = function () {
        this.__base__.show.call(this);
        this.configureEvents();
    };

    DocumentUploadView.prototype.configureEvents = function () {
        var self = this;

        self.fn.close = function () {
            self.modalInstance.close(self.uploadStatus);
        };

        self.fn.dropFile = function (files, event) {
            var i = self.filesList.length || 0;

            files.forEach(function (file) {
                var fileItem = {
                    id: i++,
                    fileStream: file,
                    name: file.name,
                    isEditingName: false,
                    extract: false,
                    isArchivedFile: self.isArchivedFile(file),
                    isOverSized: self.isOverSized(file)
                };
                self.filesList.push(fileItem);
            });
        };

        self.fn.startUpload = function () {
            self.uploading = true;
            var files = self.filesList;
            self.uploadedFiles = 0;
            self.uploadCompleted = false;
            self.filesCount = self.filesList.length;
            for (var i = 0; i < files.length; i++) {
                self.event.onUploadFile(files[i]);
            }
        };

        self.fn.editName = function (record) {
            record.__name = record.name;
            record.isEditingName = true;
        };

        self.fn.saveRecordName = function (record) {
            var fileOriginalExtension = self.fileService.getFileExtension(record.__name);
            var currentFileExtension = self.fileService.getFileExtension(record.name);
            if (!currentFileExtension)
                record.name += '.' + fileOriginalExtension;
            record.isEditingName = false;
            delete record.__name;
        };

        self.fn.cancelEditing = function (record) {
            record.name = record.__name;
            record.isEditingName = false;
            delete record.__name;
        };

        self.fn.removeFromList = function (record) {
            self.modalDialogAdapter.confirm("Delete file", "Are you sure to remove this file?",
                self.handleDeleteRecord.bind(self, record), doNothing, "Yes, please delete it", "Cancel");
        };

        self.fn.toggleExtract = function (record) {
            if (!record.isArchivedFile)
                throw new Error("Trying to extract some thing that cannot be extracted :P");
            record.extract = !record.extract;
        };

        self.fn.hideErrorMessage = function () {
            self.error = false;
            self.showErrorMsg = false;
            self.uploadCompleted = false; // to show new list
        };

        self.fn.checkOversizeError = function () {
            var filtered = self.filesList.filter(function (file) {
                return file.isOverSized;
            });

            return filtered.length > 0;
        };
    };

    DocumentUploadView.prototype.handleDeleteRecord = function (record) {
        var self = this;
        self.filesList = self.filesList.filter(function (file) {
            return file.id != record.id;
        });
    };

    DocumentUploadView.prototype.onUploadFileSuccess = function (response) {
        var self = this;
        self.uploadedFiles++;
        self.progress = (self.uploadedFiles / self.filesCount) * 100;

        // remove uploaded file from filesList
        self.filesList = self.filesList.filter(function (file) {
            return file.id !== response.config.fields.fileId
        });

        self.checkUploadProcess();
    };

    DocumentUploadView.prototype.checkUploadProcess = function () {
        var self = this;
        self.uploadCompleted = self.uploadedFiles == self.filesCount;

        if (!self.uploadCompleted) {
            return;
        }

        self.uploading = false;
        self.uploadStatus = "success";

        if (self.error) {
            self.showErrorMsg = true;
        }
    };

    DocumentUploadView.prototype.onUploadFileError = function (error) {
        var self = this;
        self.error = true;
        self.uploadedFiles++;

        self.checkUploadProcess();
    };

    DocumentUploadView.prototype.isOverSized = function (file) {
        var allowance = config.maxSizeUploadAllowed * Math.pow(1024, 2);

        return file.size > allowance;
    };

    DocumentUploadView.prototype.isArchivedFile = function (file) {
        return /.(zip|rar|tar|7z)$/.test(file.type);
    };

    return DocumentUploadView;
});