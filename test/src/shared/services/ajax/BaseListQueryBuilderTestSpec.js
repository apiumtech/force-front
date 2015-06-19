define([
    'shared/services/ajax/BaseListQueryBuilder'
    ,'config'
], function (BaseListQueryBuilder, config) {
    'use strict';

    function exerciseCreateQueryBuilder() {
        return new BaseListQueryBuilder();
    }

    describe('BaseListQueryBuilder', function () {


        describe('lastQuery', function() {
            it('should be null on instantiation', function(){
                var sut = exerciseCreateQueryBuilder();
                expect(sut.lastQuery).toBeNull();
            })
        });

        it('should set search terms', function () {
            var sut = exerciseCreateQueryBuilder();
            sut.setSearchTerms("some search");
            expect(sut.searchTerms).toBe("some search");
        });

        describe('createCurrentQuery', function () {
            it('should have valid defaults', function () {
                var sut = exerciseCreateQueryBuilder();
                var defaults = {
                    skip: 0,
                    limit: config.pageSize,
                    filter: {
                        search: ""
                    },
                    sort: {},
                    tags: [BaseListQueryBuilder.TAG_TOTAL_COUNT]
                };
                expect(sut.createCurrentQuery()).toEqual(defaults);
            });
        });

        describe('build', function () {
            it('should contain provided search terms', function () {
                var sut = exerciseCreateQueryBuilder();
                sut.setSearchTerms("some good search");
                var build = sut.build();
                expect(build.filter.search).toBe("some good search");
            });
        });

        describe('toRequestHeaders', function () {
            it('should convert build result properties to JSON', function () {
                var sut = exerciseCreateQueryBuilder();
                sut.searchTerms = "some search";
                sut.sort = {key1:-1};
                sut.tags = ["tag1"];
                var res = sut.build();
                var headers = sut.toRequestHeaders(res);
                expect(JSON.parse(headers.filter)).toEqual({
                    search:"some search"
                });
                expect(JSON.parse(headers.sort)).toEqual({key1:-1});
                expect(JSON.parse(headers.tags)).toEqual(["tag1"]);
            });
        });

        describe('resetPaging', function () {
            it('should set skip property to zero', function () {
                var sut = exerciseCreateQueryBuilder();
                sut.skip = 1000;
                sut.resetPaging();
                expect(sut.skip).toBe(0);
            });
        });

        describe('nextPage', function () {
            it('should increate "skip" value by the "limit" amount', function () {
                var sut = exerciseCreateQueryBuilder();
                sut.skip = 1000;
                sut.limit = 10
                sut.nextPage();
                expect(sut.skip).toBe(1010);
            });
        });

        describe('resetPageHeuristics', function () {
            it('should be called when building', function () {
                var sut = exerciseCreateQueryBuilder();
                spyOn(sut, 'resetPageHeuristics');
                var build = sut.build();
                expect(sut.resetPageHeuristics).toHaveBeenCalledWith(build);
            });
            it("should not reset page when search has changed and there's not a previous query", function () {
                var sut = exerciseCreateQueryBuilder();
                sut.skip = 1000;
                sut.setSearchTerms("some good search");
                spyOn(sut,'resetPaging');
                sut.build();
                expect(sut.resetPaging).not.toHaveBeenCalled();
            });

            describe("with a previoius query", function () {
                var sut;
                beforeEach(function () {
                    sut = exerciseCreateQueryBuilder();
                    sut.build();
                    sut.skip = 1000;
                });
                it("should reset page when search has changed", function () {
                    sut.setSearchTerms("some good search");
                    spyOn(sut,'resetPaging');
                    sut.build();
                    expect(sut.resetPaging).toHaveBeenCalled();
                });
                it("should not reset page when all reset conditions are false", function () {
                    spyOn(sut, "resetPageHeuristicsBuilder").and.returnValue(
                        [false,false,false,false]
                    );
                    spyOn(sut,'resetPaging');
                    sut.build();
                    expect(sut.resetPaging).not.toHaveBeenCalled();
                });
                it("should reset page when one or more conditions are true", function () {
                    spyOn(sut, "resetPageHeuristicsBuilder").and.returnValue(
                        [false,true,false,false]
                    );
                    spyOn(sut,'resetPaging');
                    sut.build();
                    expect(sut.resetPaging).toHaveBeenCalled();
                });
            });
        });


    });

});