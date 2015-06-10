define([
    'modules/literals/shared/LiteralsSharedService'
], function(LiteralsSharedService) {
    'use strict';

    function exerciseCreateService(){
        return LiteralsSharedService.newInstance();
    }

    describe('LiteralsSharedService', function() {
        [
            'getLanguageList',
            'getLiteralTypeList',
            'getDeviceTypeList',
            'getImplementationList'
        ].forEach(function(methodName){
            it('should define ' + methodName, function(){
                var sut = exerciseCreateService();
                expect(sut,methodName).toBeDefined();
            });
        });
    });
});