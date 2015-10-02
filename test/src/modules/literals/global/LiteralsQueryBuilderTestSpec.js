define([
    'shared/services/ajax/BaseListQueryBuilder',
    'modules/literals/global/LiteralsQueryBuilder',
    'config'
], function(BaseListQueryBuilder, LiteralsQueryBuilder, config) {
    'use strict';

    function exerciseCreateQueryBuilder() {
        return LiteralsQueryBuilder.newInstance();
    }

    describe('LiteralsQueryBuilder', function() {

        describe('createCurrentQuery', function () {
            it('should have valid defaults', function () {
                var sut = exerciseCreateQueryBuilder();
                var defaults = {
                    skip: 0,
                    limit: config.pageSize,
                    filter: {
                        search: "",
                        literalTypeId: "",
                        platformIds: []
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
                sut.literalTypeId = 3;
                sut.platformIds = ["id1", "id2", "id3"];
                var res = sut.build();
                var headers = sut.toRequestHeaders(res);
                expect(JSON.parse(headers.filter)).toEqual({
                    search: "",
                    literalTypeId: 3,
                    platformIds:["id1", "id2", "id3"]
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
                it("should reset page when literalId has changed", function () {
                    sut.setLiteralTypeId(123);
                    spyOn(sut,'resetPaging');
                    sut.build();
                    expect(sut.resetPaging).toHaveBeenCalled();
                });
            });
        });

    });

});