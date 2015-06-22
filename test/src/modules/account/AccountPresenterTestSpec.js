/**
 * Created by justin on 3/4/15
 */
define([
    'modules/account/AccountPresenter'
], function (AccountPresenter) {

    'use strict';

    describe("AccountPresenter", function () {

        var sut, view, model;

        beforeEach(function () {
            view = {
                event: {},
                fn: {}
            };
            model = {};
            sut = AccountPresenter.newInstance();
        });

    });

});