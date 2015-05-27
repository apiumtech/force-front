/**
 * Created by Justin on 4/6/2015.
 */
define([
    'modules/account/filters/datetimeTypeFilter/DatetimeTypeFilterPresenter',
    'shared/services/AccountEventBus',
    'modules/account/filters/datetimeTypeFilter/DatetimeTypeFilterView'
], function (DatetimeTypeFilterPresenter, AccountEventBus, DatetimeTypeFilterView) {
    'use strict';
    describe("DatetimeTypeFilterPresenter", function () {

        var accountEventBus, sut, view, model;

        beforeEach(function () {
            accountEventBus = mock(AccountEventBus, 'AccountEventBus');
            view = mock(DatetimeTypeFilterView, 'DatetimeTypeFilterView');
            model = {};
            sut = DatetimeTypeFilterPresenter.newInstance(accountEventBus);
        });

        describe("show()", function () {
            beforeEach(function () {
                view.event = {};
                sut.show(view, model);
            });

            describe("filterSelectionToggled", function () {
                it("should fire event fireFilterValueChanged from the eventBus", function () {
                    var key = 'key';
                    var value = [{from: new Date(2015, 3, 1), to: new Date(2015, 3, 5)}];
                    view.event.filterSelectionToggled(key, value);
                    expect(accountEventBus.fireFilterValueChanged).toHaveBeenCalledWith(key, value);
                });
            });
        });
    });

});