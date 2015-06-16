define([
    'shared/services/ajax/BaseListQueryBuilder',
    'modules/literals/custom/CustomLiteralsQueryBuilder',
    'config'
], function(BaseListQueryBuilder, CustomLiteralsQueryBuilder, config) {
    'use strict';


    function exerciseCreateQueryBuilder() {
        return CustomLiteralsQueryBuilder.newInstance();
    }

    describe('CustomLiteralsQueryBuilder', function() {

        describe('createCurrentQuery', function () {
            it('should have valid defaults', function () {
                var sut = exerciseCreateQueryBuilder();
                var defaults = {
                    skip: 0,
                    limit: config.pageSize,
                    filter: {
                        search: "",
                        implementationCode: null
                    },
                    sort: {},
                    tags: [BaseListQueryBuilder.TAG_TOTAL_COUNT]
                };
                expect(sut.createCurrentQuery()).toEqual(defaults);
            });
        });

        describe('toRequestHeaders', function () {
            it('should convert build result properties to JSON', function () {
                var sut = exerciseCreateQueryBuilder();
                sut.implementationCode = 22;
                var res = sut.build();
                var headers = sut.toRequestHeaders(res);
                expect(JSON.parse(headers.filter)).toEqual({
                    search: "",
                    implementationCode: 22
                });
            });
        });

        describe('resetPageHeuristics', function () {
            describe("and there's a previoius query", function () {
                var sut;
                beforeEach(function () {
                    sut = exerciseCreateQueryBuilder();
                    sut.build();
                    sut.skip = 1000;
                });
                it("should reset page when implementationCode has changed", function () {
                    sut.setImplementationCode(123);
                    spyOn(sut,'resetPaging');
                    sut.build();
                    expect(sut.resetPaging).toHaveBeenCalled();
                });
            });
        });

    });

});