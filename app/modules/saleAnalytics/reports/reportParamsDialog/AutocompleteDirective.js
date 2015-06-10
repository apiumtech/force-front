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
        ajaxService = ajaxService || new AjaxService();


        var linkElement = function (scope, $element, $attr, ctrl) {
            var url = $attr.autocomplete;

            scope.getAutocompleteOption = function (request, response) {
                ajaxService.rawAjaxRequest({
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

            $.ui.autocomplete.prototype.____renderItem = $.ui.autocomplete.prototype._renderItem;

            $.ui.autocomplete.prototype._renderItem = function (ul, item) {
                //$.ui.autocomplete.prototype.____renderItem.call(this, ul, item);

                item.label = item.label.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)(" +
                $.ui.autocomplete.escapeRegex(this.term) +
                ")(?![^<>]*>)(?![^&;]+;)", "gi"), "<span style='background: yellow'>$1</span>");
                return $("<li></li>")
                    .data("item.autocomplete", item)
                    .append("<a>" + item.label + "</a>")
                    .appendTo(ul);
            };

            $($element).autocomplete({
                minLength: 3,
                source: scope.getAutocompleteOption,
                select: function (event, ui) {
                    if (ui.item) ctrl.$setViewValue(ui.item.value);
                }
            });
        };

        return {
            restrict: "EA",
            require: 'ngModel',
            link: linkElement
        };
    }

    app.register.directive('autocomplete', [AutocompleteDirective]);

    return AutocompleteDirective;
});