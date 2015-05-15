describe('LiteralService', function() {
    var LiteralService = app.getView('services/LiteralService');

    function exerciseCreateService() {
        return LiteralService.newInstance();
    }

    function mockGetLanguageList(serv) {
        var languageListStub = [
                {Name:"es-es"},
                {Name:"en-us"}
            ];
        spyOn(serv,"getLanguageList").and.returnValue(
            exerciseFakeOkPromiseWithArg(languageListStub)
        );
    }


    it('should merge languages with literal languages', function(done){
        var serv = exerciseCreateService();
        mockGetLanguageList(serv);

        var literal = {};
        literal.LanguageValues = [
            {Key: "es-es", Value:"castellano"}
        ];

        serv._mergeLanguagesWithLiteral(literal).then(
            function(mergedLiteral){
                expect(mergedLiteral.LanguageValues.length).toBe(2);
                expect(mergedLiteral.LanguageValues[0].Key).toBe("es-es");
                expect(mergedLiteral.LanguageValues[1].Key).toBe("en-us");
                done();
            }
        );
    });


    it('should create an empty literal with all languages', function(done){
        var serv = exerciseCreateService();
        mockGetLanguageList(serv);

        serv.getNullLiteral().then(
            function(mergedLiteral){
                expect(mergedLiteral.LanguageValues.length).toBe(2);
                expect(mergedLiteral.LanguageValues[0].Key).toBe("es-es");
                done();
            }
        );
    });

});