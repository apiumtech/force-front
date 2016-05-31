define([
  'app'
], function (app) {
  'use strict';

  function FilereadDirective() {
    return {
      scope: {
        fileread: "="
      },
      link: function (scope, element, attributes) {
        element.bind("change", function (evt) {
          scope.fileread(evt.target.files[0]);
        });
      }
    }
  }

  app.register.directive('fileread', [FilereadDirective]);

  return FilereadDirective;
});
