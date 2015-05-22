define([
    'modules/literal/LiteralService'
], function (LiteralService) {
    'use strict';


    describe('LiteralService', function () {
        function exerciseCreateService() {
            return LiteralService.newInstance();
        }

        function mockGetLanguageList(serv) {
            var languageListStub = [
                {Name: "es-es"},
                {Name: "ca-es"},
                {Name: "en-us"},
            ];
            spyOn(serv, "getLanguageList").and.returnValue(
                exerciseFakeOkPromiseWithArg(languageListStub)
            );
        }


        it('should merge language list with literal languages', function (done) {
            var serv = exerciseCreateService();
            mockGetLanguageList(serv);

            var literal = {};
            literal.LanguageValues = [
                {Key: "es-es", Value: "castellano"}
            ];

            serv._mergeLanguagesWithLiteral(literal).then(
                function (mergedLiteral) {
                    expect(mergedLiteral.LanguageValues.length).toBe(3);
                    expect(mergedLiteral.LanguageValues[0].Key).toBe("es-es");
                    expect(mergedLiteral.LanguageValues[2].Key).toBe("en-us");
                    done();
                }
            );
        });


        it('should create an empty literal with the language list', function (done) {
            var serv = exerciseCreateService();
            mockGetLanguageList(serv);

            serv.getNullLiteral().then(
                function (mergedLiteral) {
                    expect(mergedLiteral.LanguageValues.length).toBe(3);
                    expect(mergedLiteral.LanguageValues[0].Key).toBe("es-es");
                    expect(mergedLiteral.LanguageValues[2].Key).toBe("en-us");
                    done();
                }
            );
        });


        it('should add missing langs from the language list on getLiteralById', function (done) {
            var serv = exerciseCreateService();
            mockGetLanguageList(serv);

            var literal = {
                DeviceCategories: [],
                DeviceTypes: [],
                Id: "abcd",
                Key: "hola",
                LanguageValues: [
                    {Key: "es-es", Value: "hola"},
                    {Key: "ca-es", Value: "hola"}
                ],
                LiteralType: null,
                OldKey: ""
            };
            spyOn(serv.ajaxService, "rawAjaxRequest").and.returnValue(
                exerciseFakeOkPromiseWithArg(literal)
            );

            serv.getLiteralById(12345).then(
                function (mergedLiteral) {
                    expect(mergedLiteral.LanguageValues.length).toBe(3);
                    expect(mergedLiteral.LanguageValues[0].Key).toBe("es-es");
                    expect(mergedLiteral.LanguageValues[2].Key).toBe("en-us");
                    done();
                }
            );
        });

    });
});