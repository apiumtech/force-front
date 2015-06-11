define([
    'app',
    'jquery',
    'shared/components/countrySelector/CountriesList',
    'selectToAutocomplete'
], function (app, $, CountriesList) {
    'use strict';

    function CountrySelectorDirective($timeout) {
        return {
            restrict: "A",
            templateUrl: 'app/shared/components/countrySelector/countrySelector.html',
            scope: true,
            link: function ($scope, $element, $attr) {
                if (!$($element).is("select"))
                    throw new Error("Cannot applied component to non-select control");

                $scope.countries = CountriesList;

                $timeout(function () {
                    $($element).selectToAutocomplete();
                    $("input[country-selector]").attr('placeholder', $attr.placeholder);
                }, 0);
            }
        }
    }

    app.register.directive('countrySelector', ['$timeout', CountrySelectorDirective]);

    return CountrySelectorDirective;
});