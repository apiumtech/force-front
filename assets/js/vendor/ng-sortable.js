/**
 * Created by justin on 1/23/15.
 */


(function (angular, $, require) {
    'use strict';

    var Signal = require('signals');

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

                $scope.__dragStart = new Signal();
                $scope.__dragStop = new Signal();

                $scope.onDragStart = function (callback) {
                    $scope.__dragStart.add(callback);
                };

                $scope.removeOnDragStart = function (callback) {
                    $scope.__dragStart.remove(callback);
                };

                $scope.fireDragStart = function (event, ui) {
                    $scope.__dragStart.dispatch(event, ui);
                };

                $scope.fireDragStop = function (event, ui) {
                    $scope.__dragStop.dispatch(event, ui);
                };

                $scope.onDragStop = function (callback) {
                    $scope.__dragStop.add(callback);
                };

                $scope.removeOnDragStop = function (callback) {
                    $scope.__dragStop.remove(callback);
                };

                $scope.onDropEnd = function (movedWidget, newIndex) {
                    console.log(movedWidget, newIndex);
                    if ($scope.widgetMoved) {
                        $scope.widgetMoved({
                            $widget: movedWidget,
                            $newIndex: newIndex
                        });
                    }
                };
            }
        ])

        .directive('asSortable', [
            function () {
                return {
                    restrict: 'A',
                    scope: {
                        widgetMoved: "&"
                    },
                    controller: 'ui.sortable.sortableController',
                    link: function (scope, element, attrs) {
                        scope.element = element;

                        $(scope.element).sortable({
                            handle: '[as-sortable-item-handle]',
                            start: scope.fireDragStart,
                            stop: scope.fireDragStop
                        });
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
                $scope.sortableScope = null;
                $scope.element = null;
                $scope.sortableWidget = null;

                $scope.onDragStartHandler = function (event, ui) {
                    if ($scope.sortableWidget !== ui.item.data(movingWidgetKey))
                        return;

                    $scope.onDragStart({
                        $event: event,
                        $ui: ui
                    });
                };

                $scope.onDragStopHandler = function (event, ui) {
                    if ($scope.sortableWidget !== ui.item.data(movingWidgetKey))
                        return;

                    $scope.sortableScope.onDropEnd($scope.sortableWidget, ui.item.index());

                    $scope.onDragStop({
                        $event: event,
                        $ui: ui
                    });
                };
            }
        ])

        .directive('asSortableItemHandle', [
            function () {
                return {
                    require: '^asSortableItem',
                    scope: {
                        onDragStart: "&",
                        onDragStop: "&"
                    },
                    restrict: 'A',
                    controller: 'ui.sortable.sortableItemHandleController',
                    link: function (scope, element, attrs, itemController) {
                        scope.itemScope = itemController.scope;
                        scope.sortableWidget = itemController.scope.sortableWidget;
                        scope.sortableScope = scope.itemScope.sortableScope;
                        scope.element = itemController.scope.element;

                        scope.sortableScope.onDragStart(scope.onDragStartHandler);
                        scope.sortableScope.onDragStop(scope.onDragStopHandler);
                    }
                };
            }
        ])
    ;

}(angular, jQuery, require));