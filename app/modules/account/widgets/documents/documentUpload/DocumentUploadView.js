define([
    'shared/BaseView',
    'modules/account/widgets/documents/documentUpload/DocumentUploadPresenter'
], function (BaseView, DocumentUploadPresenter) {
    'use strict';

    function DocumentUploadView($scope, $upload, modalInstance, presenter) {
        presenter = presenter || new DocumentUploadPresenter();
        this.modalInstance = modalInstance;
        BaseView.call(this, $scope, null, presenter);
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
        }
    });

    DocumentUploadView.prototype.show = function () {
        this.__base__.show.call(this);
        this.configureEvents();
    };

    DocumentUploadView.prototype.configureEvents = function () {
        var self = this;

        self.fn.close = function () {
            self.modalInstance.dismiss();
        };

        self.fn.dropFile = function (files, event) {
            files.forEach(function (file) {
                self.filesList.push(file);
            });

            self.onFileChanged();
        };
    };

    DocumentUploadView.prototype.onFileChanged = function () {
        var self = this;
        console.log(self.filesList);
    };

    return DocumentUploadView;
});