define([
    'shared/BaseView',
    'modules/account/addContact/AddContactView',
    'modules/account/addContact/AddContactPresenter',
    'shared/services/notification/NotificationService'
], function (BaseView, AddContactView, AddContactPresenter, NotificationService) {
    'use strict';

    describe('AddContactView Test', function () {
        var sut, notificationService, $locationService, presenter;
        beforeEach(function () {
            inject(function ($location) {
                $locationService = $location;
            });
            notificationService = mock(NotificationService);
            presenter = mock(AddContactPresenter);
            sut = new AddContactView(presenter, $locationService, notificationService);
            sut.event = {};
            sut.fn = {};
        });
        describe("show", function () {
            beforeEach(function () {
                sinon.stub(BaseView.prototype, 'show');
                sinon.stub(AddContactView.prototype, 'configureEvents');
            });
            afterEach(function () {
                BaseView.prototype.show.restore();
                AddContactView.prototype.configureEvents.restore();
            });

            beforeEach(function () {
                sut.show();
            });
            it("should call BaseView show method", function () {
                expect(BaseView.prototype.show).toHaveBeenCalled();
            });
            it("should call configureEvents method", function () {
                expect(AddContactView.prototype.configureEvents).toHaveBeenCalled();
            });
        });

        describe('configureEvents', function () {
            beforeEach(function () {
                sut.configureEvents();
            });


            describe('fn.pageInitialized', function () {
                beforeEach(function () {
                    sut.accountId = 123;
                    sut.event.getAccountData = sinon.stub();
                    sut.fn.pageInitialized();
                });
                it("should fire getAccountData event", function () {
                    expect(sut.event.getAccountData).toHaveBeenCalledWith(123);
                });
            });

            describe('fn.saveContact', function () {
                beforeEach(function () {
                    sut.accountId = 123;
                    sut.contactData = {
                        "this": "is the contact data"
                    };
                    sut.event.onSaveContact = sinon.stub();
                    sut.fn.saveContact();
                });

                it("should fire onSaveContact event", function () {
                    expect(sut.event.onSaveContact).toHaveBeenCalledWith(123, {
                        "this": "is the contact data"
                    });
                });

            });

        });

        describe('onAccountDataLoaded', function () {
            beforeEach(function () {
                var data = {
                    "account": "data"
                };
                sut.accountData = undefined;
                sut.fn.startNewForm = sinon.stub();
                sut.onAccountDataLoaded(data);
            });

            it("should initialize a new form by calling fn.startNewForm", function () {
                expect(sut.fn.startNewForm).toHaveBeenCalled();
            });

            it("should assign the returned data to accountData", function () {
                expect(sut.accountData).toEqual({
                    "account": "data"
                });
            });

        });

        describe('onSaveContactSuccess', function () {
            var response;
            beforeEach(function () {
                response = {};
                sut.accountId = 3;
                sut.fn.startNewForm = sinon.stub();
                sut.fn.goBack = sinon.stub();
            });

            it("should send the notification to the previous page", function () {
                sut.onSaveContactSuccess(response);
                expect(notificationService.pushMessage).toHaveBeenCalledWith('contact_from_account_3', response);
            });

            describe('continueAfterSaved is true', function () {
                it("should restart the current form by calling fn.startNewForm", function () {
                    sut.continueAfterSaved = true;
                    sut.onSaveContactSuccess(response);
                    expect(sut.fn.startNewForm).toHaveBeenCalled();
                });
            });

            describe('continueAfterSaved is false', function () {
                it("should restart the current form by calling fn.startNewForm", function () {
                    sut.continueAfterSaved = false;
                    sut.onSaveContactSuccess(response);
                    expect(sut.fn.startNewForm).not.toHaveBeenCalled();
                    expect(sut.fn.goBack).toHaveBeenCalled();
                });
            });
        });

        ///////

        describe("fn.selectFile", function () {
            it("should call selectFile", function () {
                sut.configureEvents();
                spyOn(sut, 'onFilesChanged');
                sut.fn.selectFile();
                expect(sut.onFilesChanged).toHaveBeenCalled();
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
                expect(sut.imagesToUpload).toEqual(fileList.length);
            });

            it("should assign the file uploaded to 0", function () {
                sut.onFilesChanged(fileList);
                expect(sut.imagesUploaded).toEqual(0);
            });

            it("should turn on the loading indicator", function () {
                sut.onFilesChanged(fileList);
                expect(sut.isUploading).toEqual(true);
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

                sut.contactData = {};
            });

            it("should increase imagesUploaded", function () {
                sut.imagesUploaded = 2;
                sut.onUploadComplete({imageUrl: "fakeUrl"});
                expect(sut.imagesUploaded).toEqual(3);
            });

            it("should assign image url to the account", function () {
                sut.imagesUploaded = 2;
                sut.onUploadComplete({imageUrl: "fakeUrl"});
                expect(sut.contactData.ImageUrl).toEqual("fakeUrl");
            });

            it("should turn off loading indicator if all images are uploaded", function () {
                sut.imagesUploaded = 2;
                sut.imagesToUpload = 3;
                sut.isUploading = true;
                sut.onUploadComplete({imageUrl: "fakeUrl"});
                expect(sut.isUploading).toEqual(false);
            });
        });

    });
});