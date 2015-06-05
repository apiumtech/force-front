define([
	'modules/literals/shared/search/LiteralsSearchView'
], function(LiteralsSearchView) {
	'use strict';

    function exerciseCreateView(namedParams) {
        namedParams = namedParams || {};
        return LiteralsSearchView.newInstance({
            scope: namedParams.scope,
            presenter: namedParams.presenter,
            compile: namedParams.compile,
            dataTableService: namedParams.dataTableService,
            viewRepAspect: false, logErrorAspect: false
        });
    }

    describe('LiteralsSearchView', function() {

		it('should configureEvents on instantiation', function(){
            spyOn(LiteralsSearchView.prototype, "configureEvents");
			var sut = exerciseCreateView();
            expect(sut.configureEvents).toHaveBeenCalled();
		});

        it('shoud perform a delayed search', function (done) {
            var sut = exerciseCreateView();
            spyOn(sut.event, "performSearch");
            sut.searchDelay = 1;
            sut.performSearch("search terms");
            setTimeout(function(){
                expect(sut.event.performSearch).toHaveBeenCalledWith("search terms");
                done();
            }, sut.searchDelay+10 );
        });

        it('shoud perform only one delayed search (the last one) within a given search delay range', function (done) {
            var sut = exerciseCreateView();
            spyOn(sut.event, "performSearch");
            sut.searchDelay = 10;
            sut.performSearch("search terms 1");
            sut.performSearch("search terms 2");
            sut.performSearch("search terms 3");
            setTimeout(function(){
                expect(sut.event.performSearch.calls.count()).toBe(1);
                expect(sut.event.performSearch).toHaveBeenCalledWith("search terms 3");
                done();
            }, sut.searchDelay+10 );
        });


	});
});