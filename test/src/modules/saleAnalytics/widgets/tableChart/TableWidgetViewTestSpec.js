/**
 * Created by justin on 12/22/14.
 */
define([
    'angular',
    'modules/saleAnalytics/widgets/tableChart/TableWidgetView',
    'modules/saleAnalytics/widgets/tableChart/TableWidgetPresenter'
], function (angular, TableWidgetView, TableWidgetPresenter) {
    'use strict';

    describe("TableWidgetView", function () {

        var sut, scope, element, presenter;

        var fakeResponseData = {
            data: {
                widgetType: "table",
                params: {
                    columns: ["fake1", "fake2", "fake3"],
                    data: [
                        ["row1-1", "row1-2", "row1-3"],
                        ["row2-1", "row2-2", "row2-3"],
                        ["row3-1", "row3-2", "row3-3"],
                        ["row4-1", "row4-2", "row4-3"]
                    ]

                }
            }
        };

        beforeEach(inject(function(_$rootScope_){
            scope = _$rootScope_.$new();
            element = angular.element('<div />');
            presenter = mock(TableWidgetPresenter);
            sut = new TableWidgetView(scope, element, presenter);
        }));



        describe('onReloadCommandReceived', function () {
            it("should invoke the method onReloading", function () {
                sut.event.onReloading = jasmine.createSpy();

                sut.onReloadCommandReceived();
                expect(sut.event.onReloading).toHaveBeenCalled();
            });
        });

    });

});
