/**
 * Created by Justin on 6/24/2015.
 */
define([
    'di'
], function (di) {
    'use strict';

    function load(name, req, done, config) {
        var resource, plugin;

        name = name.split(':');
        resource = name[name.length - 2];


        function asyncLoad(name, req, done) {
            req([name], function (value) {
                console.log("loaded using di plugin: ", value);
                done(value);
            });
        }

        asyncLoad(resource, req, done);
    }

    function write(/*pluginName, name, write*/) {
        //write("define('"+name+extension+"', function() {");
        //write("done(Handlebars.templates['"+name+extension+"']);});");
    }

    return {
        load: load,
        write: write
    };
});