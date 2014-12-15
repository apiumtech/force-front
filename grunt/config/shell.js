/**
 * Created by kevin on 12/15/14.
 */
module.exports = function (grunt) {
    'use strict';

    return {
        config: {
            command: 'if cd force-design; then git pull; else git clone https://github.com/apiumtech/force-design.git force-design; fi'
        }
    };
};