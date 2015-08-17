/**
 * Created by justin on 1/23/15.
 */
define([
    'angular',
    'jquery',
    'jquery_ui'
], function (angular, $) {
    'use strict';

    var movingWidgetKey = "movingWidget";

    angular.module('forcefront.sortable', [])

    /**
     * Sortable section directive & controller
     */
        .controller('ui.sortable.sortableController', ['$scope',
            function ($scope) {
                var self = this;
                self.scope = $scope;
                $scope.element = null;

                $scope.fireDragStart = function (event, ui) {
                    if (!$scope.widgetDragStart) return;

                    $scope.widgetDragStart({
                        $ui: ui,
                        $widget: ui.item.data(movingWidgetKey)
                    });
                };

                $scope.fireOver = function (event, ui) {
                    if (!$scope.widgetHover) return;

                    $scope.widgetHover({
                        $ui: ui,
                        $widget: ui.item.data(movingWidgetKey)
                    });
                };

                $scope.fireDragStop = function (event, ui) {
                    if (!$scope.widgetDropped) return;

                    $scope.widgetDropped({
                        $ui: ui,
                        $widget: ui.item.data(movingWidgetKey)
                    });
                };

                $scope.fireSorted = function (event, ui) {
                    if (!$scope.widgetSorted) return;

                    $scope.widgetSorted({
                        $ui: ui,
                        $widget: ui.item.data(movingWidgetKey)
                    });
                };
            }
        ])

        .directive('asSortable', [
            function () {
                return {
                    restrict: 'A',
                    scope: {
                        widgetDragStart: "&",
                        widgetHover: "&",
                        widgetOut: "&",
                        widgetDropped: "&",
                        widgetSorted: "&"
                    },
                    controller: 'ui.sortable.sortableController',
                    link: function (scope, element, attrs) {
                        scope.element = element;

                        $(scope.element).sortable({
                            connectWith: '[as-sortable]',
                            item: '[as-sortable-item]',
                            handle: '[as-sortable-item-handle]',
                            start: scope.fireDragStart,
                            over: scope.fireOver,
                            stop: scope.fireDragStop,
                            update: scope.fireSorted
                        }).disableSelection();
                    }
                };
            }
        ])

    /**
     * Sortable item directive and controller
     */
        .controller('ui.sortable.sortableItemController', ['$scope',
            function ($scope) {
                this.scope = $scope;

                $scope.sortableScope = null;
                $scope.type = 'item';
            }
        ])
        .directive('asSortableItem', [
            function () {
                return {
                    require: '^asSortable',
                    restrict: 'A',
                    scope: {
                        sortableWidget: "="
                    },
                    controller: 'ui.sortable.sortableItemController',
                    link: function (scope, element, attrs, sortableController) {
                        scope.sortableScope = sortableController.scope;
                        scope.element = element;
                        scope.element.data(movingWidgetKey, scope.sortableWidget);
                    }
                };
            }
        ])


    /**
     * Handler directive and controller
     */
        .controller('ui.sortable.sortableItemHandleController', ['$scope',
            function ($scope) {
                this.scope = $scope;

                $scope.itemScope = null;
                $scope.element = null;
                $scope.sortableWidget = null;
            }
        ])

        .directive('asSortableItemHandle', [
            function () {
                return {
                    require: '^asSortableItem',
                    restrict: 'A',
                    controller: 'ui.sortable.sortableItemHandleController',
                    link: function (scope, element, attrs, itemController) {
                        scope.itemScope = itemController.scope;
                        scope.sortableWidget = itemController.scope.sortableWidget;
                        scope.element = itemController.scope.element;
                    }
                };
            }
        ]);

});