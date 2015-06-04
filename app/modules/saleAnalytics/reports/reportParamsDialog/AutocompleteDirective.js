/**
 * Created by apium on 6/4/15.
 */
define([
    'app',
    'shared/services/ajax/FakeAjaxService',
    'jquery',
    'jquery_ui'
], function (app, AjaxService, $) {
    'use strict';

    function AutocompleteDirective(ajaxService) {
        this.ajaxService = ajaxService || new AjaxService();
        var self = this;

        self.linkElement = function (scope, $element, $attr) {
            var url = $attr.autocomplete;

            scope.getAutocompleteOption = function (request, response) {
                self.ajaxService.rawAjaxRequest({
                    result: [{
                        id: 1,
                        label: "param1",
                        value: "param1"
                    }, {
                        id: 2,
                        label: "param2",
                        value: "param2"
                    }, {
                        id: 3,
                        label: "param3",
                        value: "param3"
                    }, {
                        id: 4,
                        label: "param4",
                        value: "param4"
                    }]
                }).then(function (data) {
                    response(data);
                });
            };

            $($element).autocomplete({
                minLength: 3,
                source: scope.getAutocompleteOption,
                select: function (event, ui) {
                    console.log(ui.item ?
                    "Selected: " + ui.item.value + " aka " + ui.item.id :
                    "Nothing selected, input was " + this.value);
                }
            });
        };

        return {
            restrict: "EA",
            link: self.linkElement
        };
    }

    app.register.directive('autocomplete', [AutocompleteDirective]);

    return AutocompleteDirective;
});