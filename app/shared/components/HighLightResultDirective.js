/**
 * Created by justin on 4/18/15.
 */
define([
    'app'
], function (app) {
    'use strict';

    function HighLightResultDirective() {
        return {
            link: function (scope, element, attrs) {

                if (!attrs.highlightClass) {
                    attrs.highlightClass = 'highlighted-result';
                }

                var replacer = function (match, item) {
                    return '<span class="' + attrs.highlightClass + '">' + match + '</span>';
                };

                scope.$watch('keywords', function () {
                    if (!scope.keywords || scope.keywords == '') {
                        element.html(scope.highLightResult);
                        return false;
                    }

                    var regex = new RegExp("((" + scope.keywords + ")+)", 'gi');
                    console.log("REGEX", regex);

                    // Find the words
                    var html = scope.highLightResult.replace(regex, replacer);
                    element.html(html);
                });
            },
            replace: false,
            scope: {
                highLightResult: '=',
                keywords: '='
            }
        };
    }

    app.register.directive('highLightResult', [HighLightResultDirective]);

    return HighLightResultDirective;
});