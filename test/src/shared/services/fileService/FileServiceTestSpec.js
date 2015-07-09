define([
    'shared/services/fileService/FileService'
], function (FileService) {
    'use strict';

    describe('FileService Test', function () {
        var sut;
        beforeEach(function () {
            sut = new FileService();
        });

        describe("getFileExtension", function () {
            describe("no file extension", function () {
                it("should return empty", function () {
                    expect(sut.getFileExtension('filenamewithoutextension')).toEqual('');
                });
            });
            [{
                fileName: "fakeFile.html",
                expected: "html"
            }, {
                fileName: "fakeFile.jpg",
                expected: "jpg"
            }, {
                fileName: "fakeFile.pdf",
                expected: "pdf"
            }, {
                fileName: "fakeFile.txt",
                expected: "txt"
            }].forEach(function (item) {
                    describe("with file name: " + item.fileName, function () {
                        it("should return correct extension " + item.expected, function () {
                            var actual = sut.getFileExtension(item.fileName);
                            expect(actual).toEqual(item.expected);
                        });
                    });
                });
        });
    });
});