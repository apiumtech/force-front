/**
 * Created by justin on 5/2/15.
 */
define([
    'app',
    'sideBar/NavItemView'
], function (app, NavItemView) {
    'use strict';

    app.register.controller('NavItemController', [
        '$rootScope', '$scope', '$location',
        NavItemView
    ])
});