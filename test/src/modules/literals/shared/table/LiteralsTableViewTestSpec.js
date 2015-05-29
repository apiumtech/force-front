define([
	'modules/literals/shared/table/LiteralsTableView'
], function(LiteralsTableView) {
	'use strict';

	function exerciseCreateView(namedParams){
        namedParams = namedParams || {};
		return LiteralsTableView.newInstance({
			scope: namedParams.scope,
			presenter: namedParams.presenter,
			compile: namedParams.compile,
            dataTableService: namedParams.dataTableService,
			viewRepAspect:false, logErrorAspect:false
		});
	}

	describe('LiteralsTableView', function() {

		describe('configureEvents', function() {
			it('should be called on instantiation', function() {
				spyOn(LiteralsTableView.prototype, 'configureEvents').and.callThrough();
				var sut = exerciseCreateView();
				expect(sut.configureEvents).toHaveBeenCalled();
				expect(sut.event.onInit).toBeDefined();
			});
		});

        describe('onColumnsRequestSuccess', function(){
            it('should fireLiteralsRequest', function(){
                var sut = exerciseCreateView();
                spyOn(sut.dataTableService, "createDatatable");
                spyOn(sut.event, "fireLiteralsRequest");
                sut.onColumnsRequestSuccess({data:[]})
                expect(sut.event.fireLiteralsRequest).toHaveBeenCalled();
            });
            it("should call dataTableService's createDatatable", function(){
                var sut = exerciseCreateView();
                spyOn(sut.dataTableService, "createDatatable");
                sut.onColumnsRequestSuccess({data:[]})
                expect(sut.dataTableService.createDatatable).toHaveBeenCalled();
            });
        });

        describe('onColumnsRequestError', function(){
            it('should set currentError', function(){
                var sut = exerciseCreateView();
                sut.onColumnsRequestError("some error");
                expect(sut.data.currentError).toBe("some error");
            });
        });


        describe('onLiteralsRequestSuccess', function(){
            it("should call table's draw", function(){
                var sut = exerciseCreateView();
                sut.table = {draw:jasmine.createSpy()};
                sut.onLiteralsRequestSuccess({data:[1,2,3]})
                expect(sut.table.draw).toHaveBeenCalled();
            });
            it('should append retrieved literals', function(){
                var sut = exerciseCreateView();
                sut.table = {draw:function(){}};
                sut.literals = sut.literals.concat(["a","b","c"]);
                sut.onLiteralsRequestSuccess({data:[1,2,3]});
                expect(sut.literals).toEqual(["a","b","c",1,2,3]);
            });
        });

        describe('onLiteralsRequestError', function(){
            it('should set currentError', function(){
                var sut = exerciseCreateView();
                sut.onLiteralsRequestError("some error");
                expect(sut.data.currentError).toBe("some error");
            });
        });

	});
});