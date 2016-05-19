/**
 * Created by justin on 3/20/15.
 */
define([
    'jquery',
    'angular',
    'config',

    'app',
    'shared/AppsAdapter',

    // loading controllers & directives asynchronously
    'asyncModuleLoaderConf',

    // default controllers
    'core/coreModulesLoader',

    // route loader
    'routeConf',

], function ($, angular, config, app, AppsAdapter) {
    'use strict';

    $.migrateMute = true;

    // Polyfill for creating CustomEvents on IE9/10/11
    // code pulled from:
    // https://github.com/d4tocchini/customevent-polyfill
    // https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent#Polyfill
    try {
      new window.CustomEvent("test");
    } catch(e) {
     var CustomEvent = function(event, params) {
          var evt;
          params = params || {
              bubbles: false,
              cancelable: false,
              detail: undefined
          };
          evt = document.createEvent("CustomEvent");
          evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
          return evt;
      };
      CustomEvent.prototype = window.Event.prototype;
      window.CustomEvent = CustomEvent; // expose definition to window
    }
    // End CustomEvent polyfill

    $(document).ready(function () {
        angular.bootstrap(document, [config.appName]);
    });
});
