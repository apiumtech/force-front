/**
 * Created by justin on 5/2/15.
 */
define([
    'app',
    'sideBar/NavGroupView'
], function (app, NavGroupView) {
    'use strict';

    app.register.controller('NavGroupController', [
        '$scope', '$element',
        NavGroupView
    ])
});