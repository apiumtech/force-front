/**
 * Created by apium on 6/4/15.
 */
define([
    'app',
    'shared/services/ajax/AjaxService',
    'config',
    'jquery',
    'jquery_ui',

], function (app, AjaxService, Configuration, $) {
    'use strict';

    function AutocompleteDirective(ajaxService) {
        ajaxService = ajaxService || new AjaxService();

        var linkElement = function (scope, $element, $attr, ctrl) {
            var url = $attr.autocomplete;

            scope.getAutocompleteOption = function (request, response) {
                var maxRowCount = 25;
                var entity = "users";
                var rurl = url.format(request.term, maxRowCount, entity);
                var params = {
                    url: rurl,
                    type: 'get',
                    dataType: 'json',
                    contentType: 'application/json',
                    accept: 'application/json'
                };

                ajaxService.rawAjaxRequest(params).then(function (data) {
                    var dataAdapter = function(item){
                        return {
                            id: item.Id,
                            label: item.Name,
                            value: item.Id
                        };
                    };
                    response(
                        data.map(dataAdapter)
                    );
                    request = "";
                });
            };

            $.ui.autocomplete.prototype.____renderItem = $.ui.autocomplete.prototype._renderItem;

            $.ui.autocomplete.prototype._renderItem = function (ul, item) {

                //$.ui.autocomplete.prototype.____renderItem.call(this, ul, item);
                item.label = item.label.replace(
                    new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + $.ui.autocomplete.escapeRegex(this.term) + ")(?![^<>]*>)(?![^&;]+;)", "gi"),
                   "<span style='background: yellow'>$1</span>"
                );

                return $("<li></li>")
                    .data("item.autocomplete", item)
                    .append("<a>" + item.label + "</a>")
                    .appendTo(ul);
            };

            $($element).autocomplete({
                minLength: 3,
                source: scope.getAutocompleteOption,
                select: function (event, ui) {
                    if (ui.item) {
                        ctrl.$setViewValue(ui.item);
                    }
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